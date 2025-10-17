const { app, BrowserWindow, ipcMain, dialog, shell, Menu } = require('electron');
const path = require('path');
const fs = require('fs');

let mainWindow;
let splashWindow;

function createWindow() {
    // 启动闪屏（避免主窗口加载前白屏）
    splashWindow = new BrowserWindow({
        width: 360,
        height: 240,
        frame: false,
        alwaysOnTop: true,
        resizable: false,
        movable: true,
        show: true,
        transparent: false,
        backgroundColor: '#ffffff'
    });
    const splashHtml = `<!doctype html><html><head><meta charset="utf-8"/><title>Loading</title>
    <style>
    html,body{height:100%;margin:0}
    body{display:flex;align-items:center;justify-content:center;background:#fff;font-family:Arial,"PingFang SC","Microsoft YaHei",sans-serif}
    .wrap{display:flex;flex-direction:column;align-items:center;gap:12px}
    .spinner{width:40px;height:40px;border:3px solid #1677ff33;border-top-color:#1677ff;border-radius:50%;animation:spin .8s linear infinite}
    @keyframes spin{to{transform:rotate(360deg)}}
    .label{color:#1677ff;font-size:14px}
    </style></head><body><div class="wrap"><div class="spinner"></div><div class="label">正在启动...</div></div></body></html>`;
    splashWindow.loadURL('data:text/html;charset=utf-8,' + encodeURIComponent(splashHtml));

    // 主窗口（初始不显示）
    mainWindow = new BrowserWindow({
        width: 1280,
        height: 800,
        show: false,
        backgroundColor: '#ffffff',
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
            nodeIntegration: false,
            sandbox: true,
            // 开发场景加载本地 file:// 资源以避免 CORS 限制
            webSecurity: false
        }
    });

    // 加载页面
    const indexPath = path.join(__dirname, 'jsonl_viewer.html');
    mainWindow.loadFile(indexPath);

    // 页面加载完成后再显示主窗口并关闭闪屏
    mainWindow.webContents.on('did-finish-load', () => {
        if (mainWindow && !mainWindow.isDestroyed()) {
            mainWindow.show();
            mainWindow.focus();
        }
        if (splashWindow && !splashWindow.isDestroyed()) {
            splashWindow.close();
            splashWindow = null;
        }
    });
    // 兜底：加载失败也关闭闪屏并展示主窗
    mainWindow.webContents.on('did-fail-load', () => {
        if (mainWindow && !mainWindow.isDestroyed()) mainWindow.show();
        if (splashWindow && !splashWindow.isDestroyed()) { splashWindow.close(); splashWindow = null; }
    });

    mainWindow.on('closed', () => {
        mainWindow = null;
        if (splashWindow && !splashWindow.isDestroyed()) {
            splashWindow.close();
            splashWindow = null;
        }
    });
}

app.whenReady().then(() => {
    // 设置中文菜单
    try { createMenu(); } catch { }
    createWindow();
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});

// 应用菜单（中文）
function createMenu() {
    const template = [];

    if (process.platform === 'darwin') {
        template.push({
            label: app.name,
            submenu: [
                { role: 'about', label: '关于' },
                { type: 'separator' },
                { role: 'services', label: '服务' },
                { type: 'separator' },
                { role: 'hide', label: '隐藏' },
                { role: 'hideOthers', label: '隐藏其他' },
                { role: 'unhide', label: '显示全部' },
                { type: 'separator' },
                { role: 'quit', label: '退出' },
            ],
        });
    }

    template.push(
        {
            label: '文件',
            submenu: [
                { label: '新建窗口', click: () => { createWindow(); } },
                { type: 'separator' },
                process.platform === 'darwin' ? { role: 'close', label: '关闭窗口' } : { role: 'quit', label: '退出' },
            ],
        },
        {
            label: '编辑',
            submenu: [
                { role: 'undo', label: '撤销' },
                { role: 'redo', label: '重做' },
                { type: 'separator' },
                { role: 'cut', label: '剪切' },
                { role: 'copy', label: '复制' },
                { role: 'paste', label: '粘贴' },
                { role: 'selectAll', label: '全选' },
            ],
        },
        {
            label: '视图',
            submenu: [
                { role: 'reload', label: '重新加载' },
                { role: 'forceReload', label: '强制重载' },
                { role: 'toggleDevTools', label: '切换开发者工具' },
                { type: 'separator' },
                { role: 'resetZoom', label: '重置缩放' },
                { role: 'zoomIn', label: '放大' },
                { role: 'zoomOut', label: '缩小' },
                { type: 'separator' },
                { role: 'togglefullscreen', label: '切换全屏' },
            ],
        },
        {
            label: '窗口',
            submenu: [
                { role: 'minimize', label: '最小化' },
                { role: 'close', label: '关闭' },
            ],
        },
        {
            label: '帮助',
            submenu: [
                { label: '关于', click: () => { try { app.showAboutPanel(); } catch { } } },
            ],
        },
    );

    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);
}

// 选择文件/文件夹
ipcMain.handle('fs:showOpenDialog', async (event, options) => {
    const result = await dialog.showOpenDialog(mainWindow, {
        properties: ['openFile', 'openDirectory', 'multiSelections'],
        ...options
    });
    if (result.canceled) return [];
    return result.filePaths || [];
});

// 删除路径（支持文件/文件夹）
ipcMain.handle('fs:deletePaths', async (event, { paths = [], recursive = true, force = true } = {}) => {
    if (!Array.isArray(paths) || paths.length === 0) return { ok: true, deleted: [], failed: [] };
    const deleted = [];
    const failed = [];
    for (const p of paths) {
        try {
            const stat = fs.existsSync(p) ? fs.lstatSync(p) : null;
            if (!stat) { failed.push({ path: p, error: 'not_exists' }); continue; }
            if (stat.isDirectory()) {
                fs.rmSync(p, { recursive, force });
            } else {
                fs.rmSync(p, { force });
            }
            deleted.push(p);
        } catch (e) {
            failed.push({ path: p, error: e && e.message ? e.message : String(e) });
        }
    }
    return { ok: failed.length === 0, deleted, failed };
});

// 在系统中显示路径
ipcMain.handle('fs:revealInFolder', async (event, p) => {
    try {
        if (p && fs.existsSync(p)) {
            shell.showItemInFolder(p);
            return true;
        }
        return false;
    } catch {
        return false;
    }
});

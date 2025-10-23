const https = require('https');
const fs = require('fs');
const path = require('path');

const libsDir = path.join(__dirname, 'libs');

// 使用与jsonl_viewer.html相同的CDN链接，命令行node download-libs.js执行
const resources = [
    {
        url: 'https://unpkg.com/antd@5.27.2/dist/reset.css',
        filename: 'reset.css'
    },
    {
        url: 'https://cdn.jsdelivr.net/npm/react@18.2.0/umd/react.production.min.js',
        filename: 'react.production.min.js'
    },
    {
        url: 'https://cdn.jsdelivr.net/npm/react-dom@18.2.0/umd/react-dom.production.min.js',
        filename: 'react-dom.production.min.js'
    },
    {
        url: 'https://cdn.jsdelivr.net/npm/dayjs@1.11.13/dayjs.min.js',
        filename: 'dayjs.min.js'
    },
    {
        url: 'https://cdn.jsdelivr.net/npm/dayjs@1.11.13/locale/zh-cn.js',
        filename: 'zh-cn.js'
    },
    {
        url: 'https://cdn.jsdelivr.net/npm/dayjs@1.11.13/plugin/customParseFormat.js',
        filename: 'customParseFormat.js'
    },
    {
        url: 'https://cdn.jsdelivr.net/npm/antd@5.27.2/dist/antd.min.js',
        filename: 'antd.min.js'
    },
    {
        url: 'https://cdn.jsdelivr.net/npm/antd@5.27.2/dist/antd-with-locales.min.js',
        filename: 'antd-with-locales.min.js'
    },
    {
        url: 'https://cdn.jsdelivr.net/npm/@babel/standalone/babel.min.js',
        filename: 'babel.min.js'
    },
    {
        url: 'https://cdn.jsdelivr.net/npm/echarts@5.4.3/dist/echarts.min.js',
        filename: 'echarts.min.js'
    }
];

function downloadFile(url, filename) {
    return new Promise((resolve, reject) => {
        const filePath = path.join(libsDir, filename);
        const file = fs.createWriteStream(filePath);

        console.log(`正在下载: ${filename}`);

        const request = https.get(url, (response) => {
            if (response.statusCode !== 200) {
                reject(new Error(`下载失败: ${response.statusCode}`));
                return;
            }

            response.pipe(file);

            file.on('finish', () => {
                file.close();
                const stats = fs.statSync(filePath);
                console.log(`✓ ${filename} (${(stats.size / 1024).toFixed(1)}KB)`);
                resolve();
            });

            file.on('error', (err) => {
                fs.unlink(filePath, () => { });
                reject(err);
            });
        });

        request.on('error', (err) => {
            reject(err);
        });

        request.setTimeout(30000, () => {
            request.destroy();
            reject(new Error('下载超时'));
        });
    });
}

async function downloadAll() {
    console.log('开始下载本地资源文件...\n');

    let successCount = 0;
    let totalSize = 0;

    for (const resource of resources) {
        try {
            await downloadFile(resource.url, resource.filename);
            const stats = fs.statSync(path.join(libsDir, resource.filename));
            totalSize += stats.size;
            successCount++;
        } catch (error) {
            console.error(`✗ 下载失败 ${resource.filename}:`, error.message);
        }
    }

    console.log(`\n下载完成! 成功: ${successCount}/${resources.length}, 总大小: ${(totalSize / 1024).toFixed(1)}KB`);

    if (successCount === resources.length) {
        console.log('所有文件下载成功，可以切换到本地资源模式!');
    } else {
        console.log('部分文件下载失败，建议检查网络连接后重试');
    }
}

downloadAll().catch(console.error);

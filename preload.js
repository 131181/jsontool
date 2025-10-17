const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('desktopFs', {
    pickPaths: async (options) => ipcRenderer.invoke('fs:showOpenDialog', options),
    deletePaths: async ({ paths, recursive = true, force = true } = {}) => ipcRenderer.invoke('fs:deletePaths', { paths, recursive, force }),
    revealInFolder: async (p) => ipcRenderer.invoke('fs:revealInFolder', p)
});

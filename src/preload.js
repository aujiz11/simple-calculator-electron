const { contextBridge, ipcRenderer } = require('electron');

// Expose protected methods that allow renderer process to use IPC
// without exposing the entire IPC API surface
contextBridge.exposeInMainWorld(
  'electronAPI', 
  {
    window: {
      minimize: () => ipcRenderer.send('minimize-window'),
      close: () => ipcRenderer.send('close-window'),
    },
    
    versions: {
      node: () => process.versions.node,
      chrome: () => process.versions.chrome,
      electron: () => process.versions.electron,
    },
  }
);
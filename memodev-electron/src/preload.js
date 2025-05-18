const { contextBridge, ipcRenderer, shell } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    sendMessage: (channel, data) => {
        // Liste blanche des canaux autorisés
        let validChannels = ['buttonClicked', 'toMain'];
        if (validChannels.includes(channel)) {
            ipcRenderer.send(channel, data);
        }
    },
    onMessage: (channel, func) => {
        let validChannels = ['messageFromMain', 'fromMain'];
        if (validChannels.includes(channel)) {
            // Récupération des données du processus principal
            ipcRenderer.on(channel, (event, ...args) => func(...args));
        }
    }
});

// Exposer des API sécurisées au renderer process
contextBridge.exposeInMainWorld('electron', {
  openExternal: (url) => {
    shell.openExternal(url);
  }
});
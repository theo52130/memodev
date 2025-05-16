const { app, BrowserWindow, session } = require('electron');
const path = require('path');
const { ipcMain } = require('electron');

let mainWindow; // Déclaré globalement pour être accessible dans tout le fichier

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
            nodeIntegration: false
        }
    });

    // Configuration de la CSP
    session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
        callback({
            responseHeaders: {
                ...details.responseHeaders,
                'Content-Security-Policy': ["default-src 'self'; script-src 'self'"]
            }
        });
    });

    // Chemin modifié pour pointer vers le fichier dans src/app/
    mainWindow.loadFile(path.join(__dirname, 'app', 'index.html'));

    // Ouvrir les DevTools en développement (optionnel)
    // mainWindow.webContents.openDevTools();

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow();
    }
});

// Ajoutez un gestionnaire pour l'événement 'buttonClicked'
ipcMain.on('buttonClicked', (event, arg) => {
    console.log(`Reçu du renderer: ${arg}`);
    event.sender.send('messageFromMain', 'Message reçu avec succès!');
});
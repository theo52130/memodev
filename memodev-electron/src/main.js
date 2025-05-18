const { app, BrowserWindow, session, shell } = require('electron');
const path = require('path');
const { ipcMain } = require('electron');

let mainWindow; // Déclaré globalement pour être accessible dans tout le fichier

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1100,
        height: 750,
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

// Lorsqu'une nouvelle fenêtre est créée
app.on('web-contents-created', (event, contents) => {
    // Intercepter les événements d'ouverture de nouvelles fenêtres
    contents.on('will-navigate', (event, navigationUrl) => {
        // Si l'URL n'est pas locale, l'ouvrir dans le navigateur externe
        if (!navigationUrl.startsWith('file://')) {
            event.preventDefault();
            shell.openExternal(navigationUrl);
        }
    });
    
    // Intercepter les liens qui ouvrent une nouvelle fenêtre
    contents.setWindowOpenHandler(({ url }) => {
        // Si l'URL n'est pas locale, l'ouvrir dans le navigateur externe
        if (!url.startsWith('file://')) {
            shell.openExternal(url);
            return { action: 'deny' };
        }
        return { action: 'allow' };
    });
});

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
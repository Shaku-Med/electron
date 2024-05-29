// main.js

const { app, BrowserWindow, Menu, dialog } = require('electron');
const path = require('node:path');

const createWindow = () => {
    // Create the browser window.
    const mainWindow = new BrowserWindow({
        width: 1200,
        height: 600,
        icon: 'favicon.ico',
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
            enableRemoteModule: false,
        },
        autoHideMenuBar: true,
        fullscreen: true,
        // darkTheme: false
        // backgroundColor: '#ffffff', // Sets a default background color
    });

    // Load the index.html of the app.
    mainWindow.loadFile('index.html');

    // Build the menu from the template
    const menu = Menu.buildFromTemplate(menuTemplate(mainWindow));
    Menu.setApplicationMenu(menu);
};

const menuTemplate = (mainWindow) => [{
        label: 'File',
        submenu: [{
                label: 'Open',
                accelerator: 'CmdOrCtrl+O',
                click: () => {
                    dialog.showOpenDialog({
                        properties: ['openFile', 'openDirectory']
                    });
                }
            },
            { type: 'separator' },
            {
                label: 'Exit',
                accelerator: 'CmdOrCtrl+Q',
                click: () => app.quit()
            }
        ]
    },
    {
        label: 'View',
        submenu: [
            { role: 'reload' },
            { role: 'forcereload' },
            { type: 'separator' },
            { role: 'resetzoom' },
            { role: 'zoomin' },
            { role: 'zoomout' },
            { type: 'separator' },
            { role: 'togglefullscreen' }
        ]
    },
    {
        label: 'Help',
        submenu: [{
                label: `Version ${app.getVersion()}`,
                enabled: false
            },
            {
                label: 'About',
                click: () => {
                    dialog.showMessageBox({
                        type: 'info',
                        title: 'About',
                        message: `This is an example Electron application.\n\nVersion: ${app.getVersion()}`,
                    });
                }
            }
        ]
    }
];

// This method will be called when Electron has finished initialization and is ready to create browser windows.
app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

// Quit when all windows are closed, except on macOS.
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});
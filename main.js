// Modules to control application life and create native browser window
const {app, BrowserWindow, Tray, Menu, ipcMain} = require('electron');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow = null;
let loadingWindow = null;
let tray = null;

function updateTray() {
  const icon = `${__dirname}/resources/assets/icon/tray.jpg`;
  if(tray === null) {
    tray = new Tray(icon);
  }
  const contextMenu = Menu.buildFromTemplate([
    {label: 'Item1', type: 'radio'},
    {label: 'Item2', type: 'radio'},
    {label: 'Item3', type: 'radio', checked: true},
    {label: 'Item4', type: 'radio'}
  ]);
  tray.setToolTip('This is my application.');
  tray.setContextMenu(contextMenu);
}
let flashInterval = null;
let flashCount = 0;
function trayFlash(flash = true) {
  const icons = [`${__dirname}/resources/assets/icon/tray.jpg`, `${__dirname}/resources/assets/icon/tray-transparent.png`];
  if(tray === null) {
    tray = new Tray(icons[0]);
  }
  if (flash) {
    if (!flashInterval) {
      flashInterval = setInterval(() => {
        flashCount += 1;
        tray.setImage(icons[(flashCount) % 2]);
      }, 400);
    }
  } else {
    if (flashInterval) {
      clearInterval(flashInterval);
      flashInterval = null;
    }
    if(tray){
      tray.setImage(icons[0]);
    }
  }
}
function createLoadingWindow() {
  loadingWindow = new BrowserWindow(Object.assign({
    width: 580,
    height: 200,
    frame: false,
    show: false
  }, {parent: mainWindow}));

  loadingWindow.loadURL(`${__dirname}/resources/loading.html`);

  loadingWindow.on('closed', () => {
    loadingWindow = null
  });
  loadingWindow.webContents.on('did-finish-load', () => {
    loadingWindow.show();
  });
}

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    show: false,
    width: 1024,
    height: 728
  });
  // and load the index.html of the app.
  // mainWindow.loadFile('index.html')
  if (process.env.NODE_ENV === 'production') {
    mainWindow.loadURL(`file://${__dirname}/dist/index.html`);
  } else {
    // Open the DevTools.
    mainWindow.webContents.openDevTools();
    mainWindow.loadURL('http://127.0.0.1:8000/');
  }

  mainWindow.webContents.on('did-finish-load', () => {
    if (loadingWindow) { // 把加载的窗口关闭
      loadingWindow.close();
    }
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    mainWindow.show();
    mainWindow.focus();
  });

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', function() {
  createLoadingWindow();
  updateTray();
  createWindow();
  ipcMain.on('ipcRendererTest', () => {
    console.log('ipcRendererTest123456');
  });
  ipcMain.on('flashTray', () => {
    trayFlash();
  });
  ipcMain.on('cancelFlashTray', () => {
    trayFlash(false);
  });
});

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

/* eslint-disable @typescript-eslint/no-var-requires */
const { app, BrowserWindow, dialog, ipcMain } = require('electron');
const { initRemix } = require('remix-electron');
const { join } = require('node:path');
const path = require('path');

/** @type {BrowserWindow | undefined} */
let win;

/** @param {string} url */
async function createWindow(url) {
  win = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, 'preload.js'),
    },
  });
  await win.loadURL(url);
  ipcMain.handle('ping', () => 'pong');
  win.show();

  if (process.env.NODE_ENV === 'development') {
    win.webContents.openDevTools();
  }
}

/** @param {unknown} error */
function getErrorStack(error) {
  return error instanceof Error ? error.stack || error.message : String(error);
}

app.whenReady().then(async () => {
  try {
    if (process.env.NODE_ENV === 'development') {
      const { default: installExtension, REACT_DEVELOPER_TOOLS } = require('electron-devtools-installer');

      await installExtension(REACT_DEVELOPER_TOOLS);
    }

    const url = await initRemix({ serverBuild: join(__dirname, 'build') });
    await Promise.race([
      createWindow(url),
      app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
          createWindow(url);
        }
      }),
    ]);
  } catch (error) {
    dialog.showErrorBox('Error', getErrorStack(error));
    console.error(error);
  }
});

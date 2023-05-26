/* eslint-disable @typescript-eslint/no-var-requires */
const { app, BrowserWindow, dialog, ipcMain } = require('electron');
const { initRemix } = require('remix-electron');
const { join } = require('node:path');

/** @type {BrowserWindow | undefined} */
let win;

/** @param {string} url */
async function createWindow(url) {
  win = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
      preload: join(__dirname, 'preload.js'),
    },
  });
  ipcMain.handle('ping', () => 'pong');
  await win.loadURL(url);
  win.show();

  if (process.env.NODE_ENV === 'development') {
    win.webContents.openDevTools();
  }
}

/** @param {unknown} error */
function getErrorStack(error) {
  return error instanceof Error ? error.stack || error.message : String(error);
}

app.on('ready', async () => {
  try {
    if (process.env.NODE_ENV === 'development') {
      const { default: installExtension, REACT_DEVELOPER_TOOLS } = require('electron-devtools-installer');

      await installExtension(REACT_DEVELOPER_TOOLS);
    }

    const url = await initRemix({ serverBuild: join(__dirname, 'build') });
    await createWindow(url);
  } catch (error) {
    dialog.showErrorBox('Error', getErrorStack(error));
    console.error(error);
  }
});

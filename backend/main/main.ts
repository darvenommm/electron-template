import { app, BrowserWindow } from 'electron';
import { join } from 'node:path';

const modeEnv = process.env.MODE;

const createWindow = (): void => {
  const window = new BrowserWindow({
    width: 800,
    height: 800,
    webPreferences: {
      preload: join(__dirname, '..', 'preload', 'index.js'),
    },
  });

  if (modeEnv === 'development') {
    window.loadURL('http://localhost:4000');
  } else {
    window.loadFile(join(__dirname, '..', 'frontend', 'index.html'));
  }
};

app
  .whenReady()
  .then(() => {
    createWindow();
  })
  .catch(console.error);

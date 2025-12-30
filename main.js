const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    // Inicia la ventana oculta para que no se vea el "salto" al maximizar
    show: false, 
    width: 1280,
    height: 720,
    useContentSize: true,
    resizable: true,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
    }
  });

  // Quitar menús predeterminados
  win.setMenuBarVisibility(false);

  // Cargar el juego de GB Studio
  win.loadFile('web/index.html');

  // Maximizar y mostrar cuando esté listo
  win.once('ready-to-show', () => {
    win.maximize(); // Esto hace que se maximice al abrirse
    win.show();
  });
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
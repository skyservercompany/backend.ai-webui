const { ipcRenderer } = require('electron');
global.appRoot = window.appRoot = __dirname;

process.once('loaded', () => {
  ipcRenderer.on('proxy-ready', (event, proxy_url) => {
    window.__local_proxy = proxy_url;
      console.log("na do", window.__local_proxy);

  });

  ipcRenderer.on('app-close-window', _ => {
    let event = new CustomEvent("backend-ai-logout", {"detail": ""});
    document.dispatchEvent(event);
    setTimeout(function () {
      ipcRenderer.send('app-closed');
    }, 1000);
  });
});

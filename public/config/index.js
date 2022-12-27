(function () {
  /**
   * http://localhost:32311/
   * ws://localhost:32311/hubs/WSServer.ashx';
   */
  if (window.pettycash === undefined) window.pettycash = {};
  window.pettycash.serverAddress = "https://localhost:7106/";
  window.pettycash.wss = "wss://localhost:44300//ws.ashx";
  window.pettycash.locale = "EN";
  window.pettycash.to = "30m";
  window.pettycash.sessionInterval = 30;
})();

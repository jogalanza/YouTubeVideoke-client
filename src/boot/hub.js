import { boot } from "quasar/wrappers";
import { HubConnectionBuilder, LogLevel } from "@aspnet/signalr";

export default boot(({ app }) => {
  let eventBus = app.config.globalProperties.$eventBus;
  let connection = null;
  let startedPromise = null;
  let connected = false;

  // connection = $.hubConnection(
  //   (window.pettycash && window.pettycash.serverAddress) ||
  //     "https://localhost:44300/"
  // );
  // proxy = connection.createHubProxy("MainHub");

  connection = new HubConnectionBuilder()
    .withUrl(
      `${
        (window.pettycash && window.pettycash.serverAddress) ||
        "https://localhost:7106/"
      }mainhub`
    )
    .configureLogging(LogLevel.Information)
    .build();

  console.warn("hub connection", connection, $.connection);

  // connection.stateChanged(function (change) {
  //   console.log(change);
  //   if (change.newState === $.signalR.connectionState.reconnecting) {
  //     console.log("Re-connecting");
  //   } else if (change.newState === $.signalR.connectionState.connected) {
  //     console.log("The server is online");
  //   } else if (change.newState === 4) {
  //     setTimeout(() => {
  //       console.warn("attempting to reconnect");
  //       start();
  //     }, 5000);
  //   }
  // });

  connection.on("hubmessage", (data) => {
    var x = {};
    try {
      x = JSON.parse(data);
    } catch {
      //
    }
    eventBus.$emit(
      x.emit !== undefined ? x.emit : "hub-message",
      x.payload !== undefined ? x.payload : null
    );
  });

  // function start() {
  //   startedPromise = connection
  //     .start({ jsonp: false, transport: ["webSockets", "longPolling"] })
  //     // .done(() => {
  //     //   connected = true;
  //     //   eventBus.$emit("hub-connected", connection.id);
  //     // })
  //     // .fail(() => {
  //     //   console.warn("Could not connect to hub");
  //     // })
  //     .catch(() => {
  //       console.error("Failed to connect with hub", err);
  //       return new Promise((resolve, reject) =>

  //         setTimeout(() => {
  //           start().then(resolve).catch(reject)
  //         }, 5000);
  //       )
  //     });

  //   return startedPromise;
  // }

  function start() {
    startedPromise = connection.start().catch((err) => {
      console.error("Failed to connect with hub", err);
      return new Promise((resolve, reject) =>
        setTimeout(() => start().then(resolve).catch(reject), 5000)
      );
    });
    return startedPromise;
  }

  connection.onclose(() => start());

  start();

  const SendMessage = (data) => {
    if (!startedPromise) return; // to ensure no invocation happens until the connection is established

    if (connected) {
      connection.invoke("SendMessage", data);
    }
  };

  app.provide("HubSend", SendMessage);
});

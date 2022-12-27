import { boot } from "quasar/wrappers";
import Emitter from "tiny-emitter";

const emitter = new Emitter();

const eventBus = {
  $on: (...args) => emitter.on(...args),
  $once: (...args) => emitter.once(...args),
  $off: (...args) => emitter.off(...args),
  $emit: (...args) => emitter.emit(...args),
};

export default boot(({ app }) => {
  app.config.globalProperties.$eventBus = eventBus;
  app.provide("eventBus", eventBus);
});

export { eventBus };

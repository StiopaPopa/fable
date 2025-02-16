import { LogLevel } from "./api.js";
const NULL_LOGGER = Object.freeze({
  level: LogLevel.NONE,
  addChild(l) {
    return l;
  },
  childLogger: () => NULL_LOGGER,
  enabled: () => false,
  fine() {
  },
  debug() {
  },
  info() {
  },
  warn() {
  },
  severe() {
  },
  none() {
  },
  logEntry() {
  }
});
export {
  NULL_LOGGER
};

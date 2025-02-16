import { ALogger } from "./alogger.js";
import { LogLevel } from "./api.js";
import { NULL_LOGGER } from "./null.js";
class ProxyLogger extends ALogger {
  set(logger) {
    this.parent = logger;
  }
  childLogger(id, level) {
    return new ProxyLogger(id, level ?? this.level, this);
  }
  logEntry(e) {
    this.parent.logEntry(e);
  }
}
const ROOT = new ProxyLogger("root", LogLevel.FINE, NULL_LOGGER);
export {
  ProxyLogger,
  ROOT
};

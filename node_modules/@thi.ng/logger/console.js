import { ALogger } from "./alogger.js";
import { LogLevel } from "./api.js";
import { expandArgs } from "./utils.js";
class ConsoleLogger extends ALogger {
  childLogger(id, level) {
    return new ConsoleLogger(id, level ?? this.level, this);
  }
  logEntry(e) {
    if (e[0] < this.level) return;
    console.log(`[${LogLevel[e[0]]}] ${e[1]}:`, ...expandArgs(e.slice(3)));
    this.parent?.logEntry(e);
  }
}
export {
  ConsoleLogger
};

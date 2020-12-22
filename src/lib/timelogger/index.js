"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk = require("chalk");
function timelogger(fn, className, withParams = false) {
    if (withParams == null)
        withParams = true;
    return function decorator(...args) {
        return __awaiter(this, void 0, void 0, function* () {
            let start = Date.now();
            let result = yield fn.apply(this, args);
            let duration = Date.now() - start;
            let params = withParams ? `(${JSON.stringify(args)})` : "";
            if (duration < 200) {
                console.log(chalk.bgGreen(`>>>>> ${className != null ? className : ""}.${fn.name.replace("bound ", "")}${params} duration ${duration / 1000} sec`));
            }
            else if (duration < 1000) {
                console.log(chalk.bgYellow(`>>>>> ${className != null ? className : ""}.${fn.name.replace("bound ", "")}${params} duration ${duration / 1000} sec`));
            }
            else {
                console.log(chalk.bgRed(`>>>>> ${className != null ? className : ""}.${fn.name.replace("bound ", "")}${params} duration ${duration / 1000} sec`));
            }
            return result;
        });
    };
}
exports.default = timelogger;
;

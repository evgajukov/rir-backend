import * as chalk from "chalk";

export default function timelogger (fn, className?, withParams = false) {
  if (withParams == null) withParams = true;
  return async function decorator(...args) {
    let start = Date.now();
    let result = await fn.apply(this, args);
    let duration = Date.now() - start;
    let params = withParams ? `(${JSON.stringify(args)})` : "";
    if (duration < 200) {
      console.log(chalk.bgGreen(`>>>>> ${className != null ? className : ""}.${fn.name.replace("bound ", "")}${params} duration ${duration / 1000} sec`));
    } else if (duration < 1000) {
      console.log(chalk.bgYellow(`>>>>> ${className != null ? className : ""}.${fn.name.replace("bound ", "")}${params} duration ${duration / 1000} sec`));
    } else {
      console.log(chalk.bgRed(`>>>>> ${className != null ? className : ""}.${fn.name.replace("bound ", "")}${params} duration ${duration / 1000} sec`));
    }
    return result;
  }
};
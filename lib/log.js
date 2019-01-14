const chalk = require('chalk');
const logSymbols = require('log-symbols');

function log(...args) {
    args = args.join(' ');
    console.log(args);
}

log.error = (...args) => {
    console.error(chalk.red(logSymbols.error, args));
};

log.success = (...args) => {
    log(chalk.green(logSymbols.success, args));
};

log.warn = (...args) => {
    console.warn(chalk.yellow(logSymbols.warn, args));
};

log.info = (...args) => {
    console.info(chalk.blue(logSymbols.info, args));
};

module.exports = log;

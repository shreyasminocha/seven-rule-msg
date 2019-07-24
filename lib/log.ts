import chalk from 'chalk';
import logSymbols from 'log-symbols';

function log(arg: string = '') {
    console.log(arg);
}

log.error = (arg: string) => {
    console.error(chalk.red(logSymbols.error, arg));
};

log.success = (arg: string) => {
    log(chalk.green(logSymbols.success, arg));
};

log.warn = (arg: string) => {
    console.warn(chalk.yellow(logSymbols.warn, arg));
};

log.info = (arg: string) => {
    console.info(chalk.blue(logSymbols.info, arg));
};

export default log;

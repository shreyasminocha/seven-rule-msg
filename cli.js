#!/usr/bin/env node

const meow = require('meow');
const getStdin = require('get-stdin');
const fs = require('fs');
const validate = require('.');
const log = require('./lib/log');

const helpText = fs.readFileSync('./usage.txt', { encoding: 'utf8' });

const cli = meow(helpText, {
    description: 'Validate commit messages against the seven rules of commit messages.',

    flags: {
        silent: { type: 'boolean', alias: 's' },
        verbose: { type: 'boolean', alias: 'v' },
        file: { type: 'string', alias: 'f' },
        help: { type: 'boolean', alias: 'h' }
    }
});

if (cli.flags.silent && cli.flags.verbose) {
    cli.showHelp();
}

let commitMessage;

async function main() {
    if (cli.flags.file !== undefined) {
        commitMessage = fs.readFileSync(cli.flags.file, { encoding: 'utf8' });
    } else if (cli.input.length > 0) {
        [commitMessage] = cli.input;
    } else {
        commitMessage = await getStdin() || process.exit(0);
    }

    if (!cli.flags.silent) {
        log(); // Leading new line
    }

    const results = validate(commitMessage);
    let exitCode = 0;

    for (const result of results) {
        switch (result.type) {
        case 'fail':
            if (!cli.flags.silent) {
                log.error(result.message);
            }

            if (exitCode === 0) { exitCode = 1; }

            break;
        case 'pass':
            if (!cli.flags.silent && cli.flags.verbose) {
                log.success(result.message);
            }

            break;
        case 'info':
            if (!cli.flags.silent && cli.flags.verbose) {
                log.info(result.message);
            }

            break;
        default:
            throw new Error(`Internal Error: Invalid result type '${result.type}'`);
        }
    }

    process.exit(exitCode);
}

main();

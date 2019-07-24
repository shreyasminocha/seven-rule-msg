#!/usr/bin/env node --experimental-modules --no-warnings

import meow from 'meow';
import getStdin from 'get-stdin';
import fs from 'fs';
import validate from './index';
import log from './lib/log';
import ResultType from './lib/types/result-type';

const helpText = fs.readFileSync('../usage.txt', { encoding: 'utf8' });

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

let commitMessage: string;

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
        case ResultType.fail:
            if (!cli.flags.silent) {
                log.error(result.rule.message);
            }

            if (exitCode === 0) { exitCode = 1; }

            break;
        case ResultType.pass:
            if (!cli.flags.silent && cli.flags.verbose) {
                log.success(result.rule.message);
            }

            break;
        case ResultType.info:
            if (!cli.flags.silent && cli.flags.verbose) {
                log.info(result.rule.message);
            }

            break;
        default:
            throw new Error(`Internal Error: Invalid result type '${result.type}'`);
        }
    }

    process.exit(exitCode);
}

main();

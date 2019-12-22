import { promises as fs } from 'fs';
import test from 'ava';
import validate from '../src/index.ts';
import ResultType from '../src/lib/types/result-type.ts';

const readFileOpts = { encoding: 'utf8' };

test('single line commit message', (t) => {
    const message = 'Fix absolutely nothing';
    const results = validate(message);

    for (const result of results) {
        t.not(result.type, ResultType.fail);
    }
});

test('empty commit message', (t) => {
    const message = '';

    t.throws(() => {
        validate(message);
    });
});

test('results have expected format', async (t) => {
    const passesAll = await fs.readFile('test/fixtures/passes-all', readFileOpts);
    const pass = validate(passesAll);

    t.is(pass.length, 7);

    for (let i = 1; i <= 7; i++) {
        const rule = pass[i - 1];
        
        t.not(rule.rule, undefined);
        t.is(typeof rule.rule.message, 'string');

        if (i === 5 || i === 7) {
            t.is(rule.type, ResultType.info);
            t.is(typeof rule.rule.test, 'undefined');
        } else {
            t.is(rule.type, ResultType.pass);
            t.is(typeof rule.rule.test, 'function');
        }
    }
});

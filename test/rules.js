import test from 'ava';
import fsSync, { promises as fs } from 'fs';
import rules from '../src/lib/rules.ts';

const readFileOpts = { 
    encoding: 'utf8' 
};

const passesAll = fsSync.readFileSync('test/fixtures/passes-all', readFileOpts);
const violatesAll = fsSync.readFileSync('test/fixtures/violates-all', readFileOpts);

for (let i = 1; i <= 7; i++) {
    test(`rule ${i}`, async (t) => {
        const rule = rules[i - 1];
    
        if (i === 5 || i === 7) {
            t.is(rule.test, undefined);
            return;
        }
    
        const violatesRule = await fs.readFile(
            `test/fixtures/violates-${i}`, readFileOpts
        );
    
        t.false(rule.test(violatesRule));

        t.true(rule.test(passesAll));
        t.false(rule.test(violatesAll));
    });
}

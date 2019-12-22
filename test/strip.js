import { promises as fs } from 'fs';
import test from 'ava';
import strip from '../src/lib/strip.ts';

const readFileOpts = { encoding: 'utf8' };

test('strip', async (t) => {
    const unstripped = await fs.readFile(
        'test/fixtures/should-be-stripped', readFileOpts
    );

    const stripped = `A commit message, this is

¯\\_(ツ)_/¯

Trailing whitespace for you?

Resolves #571`;

    t.is(strip(unstripped), stripped);
});

const strip = require('./lib/strip');
const rules = require('./lib/rules');

function validate(commitMessage) {
    const strippedMessage = strip(commitMessage);

    if (strippedMessage === '') {
        throw new Error('Empty commit message');
    }

    const results = [];

    for (const rule of rules) {
        let outcome;

        if (rule.test === undefined) {
            outcome = 'info';

            results.push({
                type: outcome,
                message: rule.message
            });

            continue;
        }

        if (rule.test(strippedMessage)) {
            outcome = 'pass';
        } else {
            outcome = 'fail';
        }

        results.push({
            type: outcome,
            message: rule.message
        });
    }

    return results;
}

module.exports = validate;

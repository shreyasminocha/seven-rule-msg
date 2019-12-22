import strip from './lib/strip';
import rules from './lib/rules';
import ResultType from './lib/types/result-type';
import Result from './lib/types/result';

function validate(commitMessage: string): Result[] {
    const strippedMessage = strip(commitMessage);

    if (strippedMessage === '') {
        throw new Error('Empty commit message');
    }

    const results: Result[] = [];

    for (const rule of rules) {
        let outcome: ResultType;

        if (rule.test === undefined) {
            outcome = ResultType.info;
        } else if (rule.test(strippedMessage)) {
            outcome = ResultType.pass;
        } else {
            outcome = ResultType.fail;
        }

        results.push({
            rule,
            type: outcome
        });
    }

    return results;
}

export default validate;

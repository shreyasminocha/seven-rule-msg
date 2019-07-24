import Rule from './rule';
import ResultType from './result-type';

interface Result {
    readonly rule: Rule,
    readonly type: ResultType
}

export default Result;

const one = {
    message: 'Separate subject from body with a blank line',
    test: (commitMessage) => {
        const separatedByLf = /^.+(\n\n(?:.|\n)+|\n?)$/g;

        return separatedByLf.test(commitMessage);
    }
};

const two = {
    message: 'Limit the subject line to 50 characters',
    test: (commitMessage) => {
        const subjectLine = getSubjectLine(commitMessage);
        const cutOff = 50;

        return subjectLine.length < cutOff;
    }
};

const three = {
    message: 'Capitalize the subject line',
    test: (commitMessage) => {
        const subjectLine = getSubjectLine(commitMessage);
        const firstCharacter = subjectLine[0];

        return !isLowerCase(firstCharacter);
    }
};

const four = {
    message: 'Do not end the subject line with a period',
    test: (commitMessage) => {
        const subjectLine = getSubjectLine(commitMessage);
        const lastCharacter = subjectLine.substr(-1);

        return !(lastCharacter === '.');
    }
};

const five = {
    message: 'Use the imperative mood in the subject line'
    // We could, in theory, use NLP to check for this rule,
    // ...but it would take effort and would be error prone
};

const six = {
    message: 'Wrap the body at 72 characters',
    test: (commitMessage) => {
        const bodyLines = getBody(commitMessage).split('\n');

        return bodyLines.every(line => line.length < 72);
    }
};

const seven = {
    message: 'Use the body to explain _what_ and _why_ vs. _how_'
    // This is obviously not detectable programtically
};

const rules = [
    one, two, three, four, five, six, seven
];

module.exports = rules;

function getSubjectLine(commitMessage) {
    return commitMessage.split('\n')[0];
}

function getBody(commitMessage) {
    const [, ...body] = commitMessage.split('\n');
    return body.join('\n');
}

function isLowerCase(char) {
    return !(char.toUpperCase() === char);
}

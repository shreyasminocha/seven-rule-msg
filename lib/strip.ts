// See: https://git-scm.com/docs/git-commit#git-commit-strip

// TODO: Respect git's core.commentchar

function strip(rawCommitMessage: string) {
    const trailingWhitespace = /[ \t\f\v]+$/gm;
    const commentary = /^#.*/gm;
    const consecutiveEmptyLines = /\n{3,}/g;
    const leadingTrailingEmptyLines = /^\n+|\n+$/g;

    return rawCommitMessage
        .replace(trailingWhitespace, '')
        .replace(commentary, '')
        .replace(consecutiveEmptyLines, '\n\n')
        .replace(leadingTrailingEmptyLines, '');
}

export default strip;

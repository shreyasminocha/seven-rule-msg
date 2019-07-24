function getSubjectLine(commitMessage: string): string {
    return commitMessage.split('\n')[0];
}

export default getSubjectLine;

function getBody(commitMessage: string): string {
    const [, ...body] = commitMessage.split('\n');
    return body.join('\n');
}

export default getBody;

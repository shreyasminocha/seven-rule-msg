interface Rule {
    readonly message: string,
    readonly test?: (commitMessage: string) => boolean;
}

export default Rule;

# seven-rule-msg

[![Build status](https://img.shields.io/travis/com/shreyasminocha/seven-rule-msg/master.svg)](//travis-ci.org/shreyasminocha/seven-rule-msg)
[![Npm version](https://img.shields.io/npm/v/seven-rule-msg.svg)](//npmjs.com/package/seven-rule-msg)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](//shreyas.mit-license.org/2019)
[![Commit message style](https://img.shields.io/badge/commit%20messages-seven%20rules-blue.svg)](//chris.beams.io/posts/git-commit)

![seven-rule-msg in action](https://raw.githubusercontent.com/shreyasminocha/seven-rule-msg/master/media/demo.jpg)

Minimal, opinionated commit message validator.

## Rules

All rules are inspired from [Chris' post and its predecessors](https://chris.beams.io/posts/git-commit).

1. [Separate subject from body with a blank line](https://chris.beams.io/posts/git-commit/#separate)
2. [Limit the subject line to 50 characters](https://chris.beams.io/posts/git-commit/#limit-50)
3. [Capitalize the subject line](https://chris.beams.io/posts/git-commit/#capitalize)
4. [Do not end the subject line with a period](https://chris.beams.io/posts/git-commit/#end)
5. [Use the imperative mood in the subject line](https://chris.beams.io/posts/git-commit/#imperative) (not checked)
6. [Wrap the body at 72 characters](https://chris.beams.io/posts/git-commit/#wrap-72)
7. [Use the body to explain what and why vs. how](https://chris.beams.io/posts/git-commit/#why-not-how) (not checked)

## Features

- No configuration required
- Beautiful output
- Read from `$1`
- Read from file
- Read from `STDIN`
- Verbose mode
- Silent mode

## Comparison with other tools

| Feature | [**`seven-rule-msg`**](//github.com/shreyasminocha/seven-rule-msg) | [`commitlint`](//github.com/conventional-changelog/commitlint) | [`node-commit-msg`](//github.com/clns/node-commit-msg) |
|---------|:---:|:---:|:---:|
| Ability to test for seven rules | ✅| ✅| ✅|
| Designed to test for seven rules | ✅| ❌ | ✅|
| Opinionated | ✅| ❌ | ❌ |
| Beautiful output | ✅| ✅| ❌ |
| Easy installation | ✅| ✅| ❌ |
| Zero setup | ✅| ✅| ❌ |
| Does one thing (and does it well) | ✅| ❌ | ❌ |
| Checks for imperative tense | ❌ <sup>1</sup> | ⚠️ <sup>2</sup> | ⚠️ <sup>3</sup> |

<sup>1</sup> Programmatically checking for imperative tense is non-trivial and error-prone

<sup>2</sup> Deprecated

<sup>3</sup> Requires separate installation of Java 8

## Installation

Assuming you have [`npm`](//npmjs.com) installed,

```sh
npm install --global seven-rule-msg-cli
```

## Usage

### From CLI

See also: [`usage.txt`](usage.txt).

#### CLI Argument

```sh
seven-rule-msg 'Fix all the stuff'
```

#### File

```sh
seven-rule-msg [--file|-f] <path-to-file>
```

#### `STDIN`

```sh
echo 'Fix all the stuff' | seven-rule-msg
```

### As git hook

`.git/hooks/commit-msg`:

```sh
!/bin/sh

seven-rule-msg -f "$1"
```

### Using the node.js API

```js
import validate from 'seven-rule-msg';

const results = validate('A nice lil commit message');
```

#### `validate(commitMessage: string)`

- Return value: `Result[]`
    - Length: `7`

The `i`th element of the returned array corresponds to the `i + 1`th rule.

```ts
interface Result {
    readonly rule: Rule,
    readonly type: ResultType
}
```

```ts
interface Rule {
    readonly message: string,
    readonly test?: (commitMessage: string) => boolean;
}
```

`Rule`s without `test` methods are informative only. In other words, they cannot be reliably checked programmatically.

```ts
enum ResultType {
    pass = 'pass',
    fail = 'fail',
    info = 'info'
}
```

## Badge

Here's a badge to show the world that you follow the seven rules of commit messages.

```md
[![Commit message style](https://img.shields.io/badge/commit%20messages-seven%20rules-blue.svg)](https://chris.beams.io/posts/git-commit)
```

## License

Licensed under the [MIT License](//shreyas.mit-license.org/2019).

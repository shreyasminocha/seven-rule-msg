# seven-rule-msg

[![Build status](https://img.shields.io/travis/shreyasminocha/seven-rule-msg.svg)](//travis-ci.com/shreyasminocha/seven-rule-msg)
[![Npm version](https://img.shields.io/npm/v/seven-rule-msg.svg)](//npmjs.com/package/seven-rule-msg)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](//shreyas.mit-license.org/2019)
[![Commit message style](https://img.shields.io/badge/commit%20messages-seven%20rules-blue.svg)](//chris.beams.io/posts/git-commit)

![seven-rule-msg in action](https://github.com/shreyasminocha/seven-rule-msg/blob/master/media/demo.jpg)

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
- Verbose mode
- Silent mode

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

#### `validate(commitMessage: String)`

Return value: `[Object]`, length `7`, consisting of objects with the following keys:

- `type`: `String` (possible values: `pass`, `fail`, `info`)
- `message`: `String`

The `i`th element of the returned array corresponds to the `i + 1`th rule.

## Badge

Here's a badge to show the world that you follow the seven rules of commit messages.

```md
[![Commit message style](https://img.shields.io/badge/commit%20messages-seven%20rules-blue.svg)](https://chris.beams.io/posts/git-commit)
```

## License

Licensed under the [MIT License](//shreyas.mit-license.org/2019).

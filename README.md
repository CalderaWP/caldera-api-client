# caldera-api-client
JavaScript API client for Caldera Forms and Caldera Forms Pro

[![Build Status](https://travis-ci.org/calderawp/caldera-api-client.svg?branch=master)](https://travis-ci.org/calderawp/caldera-api-client)
[![Coverage Status](https://coveralls.io/repos/github/calderawp/caldera-api-client/badge.svg?branch=master)](https://coveralls.io/github/calderawp/caldera-api-client?branch=master)

Forked from: [https://www.npmjs.com/package/npm-module-es6-boilerplate](https://www.npmjs.com/package/npm-module-es6-boilerplate)

🌋 [Documentation](http://calderalabs.org/caldera-api-client/)

## Included

- [babel](http://babeljs.io) - Transpile ES6
- [Jest](https://facebook.github.io/jest/) - Tests, includes coverage report
- [Coveralls](https://coveralls.io/) - Ensure that all your new code is fully covered, and see coverage trends emerge.
- [Travis](https://travis-ci.org) - Deploy and test.
- [Flow](https://flow.org/en/docs/types/primitives/) - Type Checking
- [esDoc](https://esdoc.org/) - Documentation
- [esLint](https://eslint.org/) - Enforces tabs over spaces and other lints.

- Auto publish to npm on every build.

### Usage

## Install

### Dependencies
* Yarn
* Git
* Flow
* npm
* Node

## Testing




## Scripts

### Build for release
* `yarn build`
- Runs tests, and flow type checks and Babel compiles with minification and source map.

This script calls a pre, compile, and post subcommands.  For consistency, please call other scripts at those three events.

### Tests

#### Unit Tests
This package uses [Facebook Jest](https://facebook.github.io/jest/). Test are in the directory named `__tests__` at any level and start writing tests.

WordPress is not available during these tests.
* Run tests with watcher
- `yarn test`
* Run tests once
- `yarn test:once`

#### Acceptance Tests With Browser/ WordPress/ Caldera Forms
Requires
* [Docker]()
* [Docker Compose]()

Install:
`yarn wp-tests:install`

You should now see a WordPress at [http://localhost:8888/](http://localhost:8888/)

### Type-checking With Flow
* `yarn flow`

### Lint Code
* Lint code once:
- `yarn lint`
* Lint and fix code once
- `yarn lint:fix`
* Run linter and fixer watch
- `yarn lint:watch`

### Generate Documentation
* `npm run documentation`
- Generates documentation from inline docs
- Generates documentation from markdown files in /manual
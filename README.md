# caldera-api-client
JavaScript API client for Caldera Forms and Caldera Forms Pro

[![Build Status](https://travis-ci.org/calderawp/caldera-api-client.svg?branch=master)](https://travis-ci.org/calderawp/caldera-api-client)
[![Coverage Status](https://coveralls.io/repos/github/calderawp/caldera-api-client/badge.svg?branch=master)](https://coveralls.io/github/calderawp/caldera-api-client?branch=master)

🌋 [Documentation](http://calderalabs.org/caldera-api-client/)

### Usage
See: [http://calderalabs.org/caldera-api-client/manual/overview.html#usage](http://calderalabs.org/caldera-api-client/manual/overview.html#usage)

## Install
`npm i -D @caldera-labs/api-client`

### Requirements
* [npm](https://www.npmjs.com/get-npm)
* [Yarn](https://yarnpkg.com/lang/en/docs/install/#mac-stable)
* [Git]()
* [Flow](https://flow.org/en/docs/install/) - Type Checking


## Testing

This boilerplate uses [Facebook Jest](https://facebook.github.io/jest/). Test go in the directory `__tests__`.

* Run test watcher
```
yarn test
```

## Scripts

### Build for release
* `yarn build`
- Runs tests, and flow type checks and Babel compiles with minification and source map.

This script calls a pre, compile, and post subcommands.  For consistency, please call other scripts at those three events.

### Tests
* `yarn test` : Test Watcher
* `npm test:once` : Run Tests once

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

### Release To npm
Must be [logged in as project maintainer via npm cli](https://docs.npmjs.com/cli/adduser)

* `yarn release`
# caldera-npm-module-boilerplate
Boilerplate to write npm modules in ES6 and distribute vanilla ES5 code for Caldera Forms dependencies.

[![Build Status](https://travis-ci.org/calderawp/npm-module-boilerplate.svg?branch=master)](https://travis-ci.org/calderawp/npm-module-boilerplate)
[![Coverage Status](https://coveralls.io/repos/github/calderawp/npm-module-boilerplate/badge.svg?branch=master)](https://coveralls.io/github/calderawp/npm-module-boilerplate?branch=master)

Forked from: [https://www.npmjs.com/package/npm-module-es6-boilerplate](https://www.npmjs.com/package/npm-module-es6-boilerplate)
## Included

- [babel](http://babeljs.io) - Transpile ES6
- [Jest](https://facebook.github.io/jest/) - Tests, includes coverage report
- [Coveralls](https://coveralls.io/) - Ensure that all your new code is fully covered, and see coverage trends emerge.
- [Travis](https://travis-ci.org) - Deploy and test.
- [Flow](https://flow.org/en/docs/types/primitives/) - Type Checking
- [esDoc](https://esdoc.org/) - Documentation
- [esLint](https://eslint.org/) - Enforces tabs over spaces and other lints.

- Auto publish to npm on every build.

## Install

### Dependencies
* Yarn
* Git
* Flow
* npm
* Node

### Create New Project
Change `caldera-whatever` to package name.

* Step 1: Install
- Clone:
```
git clone git@github.com:calderawp/npm-module-boilerplate.git ## Clone boilerplate
mv npm-module-boilerplate caldera-whatever ## change name of directory
cd caldera-whatever   # Change current directory to the newly created one
yarn install          # Install dependencies
```
- Reset Git:
`git remote remove`
`remote add origin git@github.com:CalderaWP/caldera-whatever.git`
`git add .`
`git commit -m "generate from boilerpate"`
`git push --set-upstream origin master`

* Step 2: Rename Stuff
Replace 'caldera-whatever' with package name.

* Step 3: Profit
Write code and such.

## Testing

This boilerplate uses [Facebook Jest](https://facebook.github.io/jest/). Test are in the directory named `__tests__` at any level and start writing tests.

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
* `yarn lint`

### Generate Documentation
* `npm run documentation`
- Generates documentation from inline docs
- Generates documentation from markdown files in /manual
# caldera-api-client
JavaScript API client for [Caldera Forms REST API)(https://calderaforms.com/doc/caldera-forms-rest-api/) and Caldera Forms Pro REST API.
🌋 👀 [Documentation](https://calderalabs.org/caldera-api-client/)

[![Build Status](https://travis-ci.org/calderawp/caldera-api-client.svg?branch=master)](https://travis-ci.org/calderawp/caldera-api-client)
[![Coverage Status](https://coveralls.io/repos/github/calderawp/caldera-api-client/badge.svg?branch=master)](https://coveralls.io/github/calderawp/caldera-api-client?branch=master)


## Install
`npm i @caldera-labs/api-client`

## Usage
Create a form client and use it to get page one of form configs via API
```js
import * as calderaApiClient from '@caldera-labs/api-client';
const formsAdminApiClient = calderaApiClient.wpClientFactory(
	'https://hiroy.club/wp-json/cf-api/v2', //root of Caldera Forms REST API namespace
    '12345', //the nonce for REST API cookie authentication
    'forms' //type of client to get
);
let forms = [];
formsAdminApiClient(page).then(r => {
	forms = r;
}).catch(error => {
	console.log(error);
	throw error;
});
```

See: [http://calderalabs.org/caldera-api-client/manual/overview.html#usage](http://calderalabs.org/caldera-api-client/manual/overview.html#usage)



## Development Requirements
* [npm](https://www.npmjs.com/get-npm)
* [Yarn](https://yarnpkg.com/lang/en/docs/install/#mac-stable)
* [Git]()
* [Flow](https://flow.org/en/docs/install/)


## Testing

We use [Facebook Jest](https://facebook.github.io/jest/) for unit tests. Test go in the directory `__tests__`.

* Run test watcher
```
yarn test
```

Make sure to review the docs on [testing requests](http://calderalabs.org/caldera-api-client/manual/overview.html#mocking-requests)

## Scripts

### Build for release
* `yarn build`
    - Runs tests, and flow type checks and Babel compiles with minification and source map.

This script calls a pre, compile, and post subcommands.  For consistency, please call other scripts at those three events.

### Tests
*`yarn test`
    - Run test watcher
* `npm test:once` 
    - Run tests once

### Type-checking With Flow
* `yarn flow`

### Lint Code
* `yarn lint`
    - Run linter and fixer watch
* `yarn lint:fix`
    - Lint and fix code once
* `yarn lint:once`
    - Lint code once


### Generate Documentation
* `npm run documentation`
    - Generates documentation from inline docs
    - Generates documentation from markdown files in /manual

### Release To npm
Must be [logged in as project maintainer via npm cli](https://docs.npmjs.com/cli/adduser)

* `yarn release`
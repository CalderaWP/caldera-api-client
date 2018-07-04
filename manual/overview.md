# Caldera API Overview


## Provided Clients
### Forms Clients
__Admin Client__

Get form configs and collections of forms config from a WordPress site.
### Privacy Settings
__Admin Client__

Get and update a WordPress site's privacy settings

### CF Pro Local Settings Client
__Admin Client__

Get and update a WordPress site's CF Pro settings

### CF Pro Client
__Admin Client__
Get an account's layouts from CF Pro. Client is designed for remote admin access to Caldera Forms Pro.

### Entries
Get entries of a form.

#### Acceptable Usage Of Admin Clients
Admin clients are designed to be used on pages that only someone who has access to the account or owns the current site will be authorized to view. These clients will expose secret keys, so they should only be used where the current user knows these secrets.

* OK: Caldera Forms settings page that is accessible only to admin users
* OK: Caldera Forms Pro UI that requires login
* NOT OK: Any publicly addressable page.
* NOT OK: Front-end rendering of a Caldera Form.

## Usage

### Import With webpack
`import * as calderaApiClient from '@caldera-labs/api-client';`

#### Full Example
```js
import * as calderaApiClient from '@caldera-labs/api-client';
const formsAdminApiClient = calderaApiClient.wpClientFactory(
	'https://hiroy.club/wp-json/cf-api/v2', //root of Caldera Forms REST API namepace
    '12345', //the nonce for REST API cookie authentication
    'forms' //type of client to get
);
```

### WordPress Admin Clients

* Get or update Caldera Forms form configs or other settings.

* [Uses REST API cookie authentication](https://developer.wordpress.org/rest-api/using-the-rest-api/authentication/#cookie-authentication)

#### Get Forms or A Specific Form With The Forms Client
```js
//create forms client
const client = wpClientFactory(
	'https://hiroy.club/wp-json/cf-api/v2', //root of Caldera Forms REST API namepace
	'12345', //the nonce for REST API cookie authentication
	'forms' //type of client to get
);
//Get page 1 of forms
client.getForms(1).then(forms => {
	console.log(forms); //Array of forms
});

//Get page 2 of forms
client.getForms(2).then(forms => {
	console.log(forms); //Array of forms
});

//Get form CF123456's configuration
client.getForm('CF123456').then(form => {
	console.log(form); //Object containing form configuration
});
```

#### Read or Update Privacy Settings
```js
//create forms client
const client = wpClientFactory(
	'https://hiroy.club/wp-json/cf-api/v2', //root of Caldera Forms REST API namepace
	'12345', //the nonce for REST API cookie authentication
	'privacy' //type of client to get ask for "privacy"
);
//Get privacy settings of form with ID CF12345
client.getSettings('CF12345').then(settings => {
	console.log(settings); //Object with basic form info and the privacy settings
});

//Update setting of form with ID CF12345
client.updateSettings('CF12345',{
    'emailIdentifyingFields': ['fld_4917648'],
    'piiFields': ['fld_9899154', 'fld_4917648'],
    'privacyExporterEnabled': true
}).then(settings => {
    console.log(settings); //Object with basic form info and the privacy settings
});

```
#### Read or Update Caldera Forms Pro Local Settings

### Caldera Forms Pro Admin Client

```js
const client = new ProClient('https://app.calderaformspro.com');
client.setPublicKey('12345');
client.setSecretKey('abcd1');
client.getLayouts().then(res => {
    expect(res).toEqual(layouts);
});
```

## Testing 
### Mocking Requests
All HTTP requests use the [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API).


You can test using [jest-fetch-mock](https://github.com/jefflau/jest-fetch-mock)

#### Examples of Mocking Fetch
* Mocking Fetch, in general:
```js
describe('testing api', () => {
	
  beforeEach(() => {
    fetch.resetMocks()
  });

  it('Gets data from API', () => {
    fetch.mockResponseOnce(JSON.stringify({ data: '12345' }))

    //assert on the response
    fetch('https://hiroy.club/api').then(res => {
      expect(res.data).toEqual('12345')
    },error => {
        //nothing here, but test will generate an error without it.
    });

    //assert on the times called and arguments given to fetch
    expect(fetch.mock.calls.length).toEqual(1);
  })
})
```

* Mocking API call that uses fetch.
- Since our API clients use fetch, we need to setup a fetch mock before calling a client function.
```js
describe('Forms API', () => {
	//Data likely to be reused in multiple tests.
	const form = {ID: 'CF1'};
	const formsApiRoute = 'https://wordpress.test/wp-json/cf-api/v2/forms';
	
	//Reset before each test in this describe() closure for isolation
	beforeEach(() => {
		fetch.resetMocks()
	});

	//Test once call per it() closure.
	it('Gets data from API', () => {
		fetch.mockResponseOnce(JSON.stringify(form));

		//Fetch and wait for response.
		client.getForm('CF1').then(response => {
			expect(response).toEqual(form); //test response
		}).catch((error) => {
			console.log(error); //log error
		});

		//Make sure it ran.
		expect(fetch.mock.calls.length).toEqual(1);
	})
});
```

#### Helpful Links About Fetch and Testing With Fetch
* [MDN Fetch docs](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
* [David Walsh blog post about Fetch](https://davidwalsh.name/fetch)
* [Why tests using fetch mocks must catch errors](https://github.com/jefflau/jest-fetch-mock/issues/60#issuecomment-402489882)
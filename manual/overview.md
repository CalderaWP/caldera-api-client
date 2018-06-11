# Caldera API Overview


## Usage
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
Admin clients are designed to be used on pages that only someone who has access to the account or owns the current site. These clients will expose secret keys, so should only be employed where the use knows these secrets.

OK: Caldera Forms settings page that is accessible only to admin users
OK: Caldera Forms Pro UI that requires login
NOT OK: Any publicly addressable page.
NOT OK: Front-end rendering of a Caldera Form.


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
# Caldera API Overview


## Usage
### Forms Clients
Get form configs and collections of forms config from a WordPress site.
### Privacy Settings
Get and update a WordPress site's privacy settings

### CF Pro Local Settings Client
Get and update a WordPress site's CF Pro settings

### CF Pro Client
Get an account's layouts from CF Pro.


## Testing 
### Mocking Requests
All HTTP requests use fetch.

You can test using [jest-fetch-mock](https://github.com/jefflau/jest-fetch-mock)

#### Example
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


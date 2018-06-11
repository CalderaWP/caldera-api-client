import {ProClient} from '../src/ProClient';
import sha1 from  'locutus/php/strings/sha1';

const publicKey = '13Q2-cvom-a211f477-EECa';
const secretKey = '10X6-hySZ-1c3eecba-Feja';
const route = 'https://app.calderaformspro.com';
const token = sha1( publicKey + secretKey );
describe( 'CF Pro client', () => {
	describe( 'API Keys', () => {
		it( 'Sets public keys', () => {
			const client = new ProClient(route);
			client.setPublicKey(publicKey);
			expect(client.getPublicKey())
				.toEqual(publicKey);

		});

		it( 'Sets private keys', () => {
			const client = new ProClient(route);
			client.setSecretKey(secretKey);
			expect(client.getSecretKey())
				.toEqual(secretKey);
		});

		it( 'Know it has keys', () => {
			const client = new ProClient(route);
			client.setPublicKey(publicKey);
			client.setSecretKey(secretKey);

			expect( client.hasKeys()).toBe(true);
		});

		it( 'Knows it does not have public key', () => {
			const client = new ProClient(route);
			client.setSecretKey(secretKey);

			expect( client.hasKeys()).toBe(false);
		});

		it( 'Knows it does not have secret key', () => {
			const client = new ProClient(route);
			client.setPublicKey(publicKey);
			expect( client.hasKeys()).toBe(false);
		});

		it( 'Sets token', () => {
			const client = new ProClient(route);
			client.setPublicKey(publicKey);
			client.setSecretKey(secretKey);
			expect( client.getToken() )
				.toEqual( token );
		});

		it( 'Adds to GET request data', () => {
			const client = new ProClient(route);
			client.setPublicKey(publicKey);
			client.setSecretKey(secretKey);
			expect( client.requestDataForGetRequests({
				x: 1,
			}) )
				.toEqual(
					{
						x:1,
						public:publicKey,
						token: token
					}
				);
		});
	});

});

describe( 'Auth headers', () => {
	it( 'Extends API client', () =>{
		const client = new ProClient(route);
		expect( typeof client.createRequest ).toEqual('function');
	});

	it( 'sets public key header', () => {
		const client = new ProClient(route);
		client.setPublicKey(publicKey);
		client.setSecretKey(secretKey);
		const request = client.createRequest();
		expect(request.headers.has('X-CS-PUBLIC')).toBeTruthy();
	});

	it( 'sets the right public key header', () => {
		const client = new ProClient(route);
		client.setPublicKey(publicKey);
		client.setSecretKey(secretKey);
		const request = client.createRequest();
		expect(request.headers.get('X-CS-PUBLIC')).toBe(publicKey);
	});

	it( 'sets token header', () => {
		const client = new ProClient(route);
		client.setPublicKey(publicKey);
		client.setSecretKey(secretKey);
		const request = client.createRequest();
		expect(request.headers.has('X-CS-TOKEN')).toBeTruthy();
	});

	it( 'sets the right token header', () => {
		const client = new ProClient(route);
		client.setPublicKey(publicKey);
		client.setSecretKey(secretKey);
		const request = client.createRequest();
		expect(request.headers.get('X-CS-TOKEN')).toBe(token);
	});

});


describe( 'GET layouts', () => {
	const layouts = [{'name':'Caldera Forms Dot Com Layout','id':5},{'name':'Field Slug Example','id':7}];
	beforeEach(() => {
		fetch.resetMocks();
	});

	it( 'Gets the layouts', () => {
		const client = new ProClient(route);
		client.setPublicKey(publicKey);
		client.setSecretKey(secretKey);
		fetch.mockResponseOnce(new Response(JSON.stringify(layouts)));
		client.getLayouts().then(res => {
			expect(res).toEqual(layouts);
		});

		expect(fetch.mock.calls).toHaveLength(1);
	});
});
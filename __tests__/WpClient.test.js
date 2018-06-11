import {wpClientFactory} from "../src/wpClientFactory";
import {WpClient} from "../src/WpClient";
import {FormsClient} from "../src/FormsClient";

describe( 'Factory', () => {
	it( 'Returns generic by default', () => {
		const client = wpClientFactory('https://hiroy.club', '12345' );
		expect(client ).toBeInstanceOf( WpClient );
	});

	it( 'Returns generic by default', () => {
		const client = wpClientFactory('https://hiroy.club', '12345', 'forms' );
		expect(  client ).toBeInstanceOf( FormsClient );
	});

});
describe( 'WordPress Client', () => {
	describe( 'sets nonce', ()=> {
		it( 'Adds the nonce', () => {
			const client = wpClientFactory('https://hiroy.club', '12345' );
			expect( client.headers.has( 'X-WP-NONCE' ) ).toBeTruthy();
		});

		it( 'Adds the right nonce', () => {
			const client = wpClientFactory('https://hiroy.club', '12345' );
			expect( client.headers.get( 'X-WP-NONCE' ) ).toBe('12345');
		});
	});

	describe( 'Resets nonce', ()=> {
		it( 'Resets the nonce', () => {
			const client = wpClientFactory('https://hiroy.club', '12345' );
			client.setNonce('abcd');
			expect( client.headers.has( 'X-WP-NONCE' ) ).toBeTruthy();
		});

		it( 'Resets to the right nonce', () => {
			const client = wpClientFactory('https://hiroy.club', '12345' );
			client.setNonce('abcd');
			expect( client.headers.get( 'X-WP-NONCE' ) ).toBe('abcd');
		});
	});
});


describe( 'Forms Client', () => {
	beforeEach(() => {
		fetch.resetMocks()
	});

	const form = {ID: 'CF1'};
	const forms = [
		form
	];
	const formsApiRoute = 'https://wordpress.test/wp-json/cf-api/v2/forms';

	describe( 'Forms endpoint', () => {
		it( 'Gets forms', () =>{
			const client = new FormsClient(formsApiRoute );
			client.setNonce('12345');
			fetch.mockResponseOnce(JSON.stringify(forms));
			client.getForms(1).then(  response => {
				expect( response ).toEqual(forms);
			}).catch((error) => {
				console.log(error);
			});
			expect(fetch.mock.calls.length).toEqual(1)

		});
	});

	describe( 'Form endpoint', () => {
		it( 'Gets a form', () =>{
			const client = new FormsClient(formsApiRoute );
			client.setNonce('12345');
			fetch.mockResponseOnce(JSON.stringify(form));
			client.getForm('CF1').then(  response => {
				expect( response ).toEqual(form);
			}).catch((error) => {
				console.log(error);
			});
			expect(fetch.mock.calls.length).toEqual(1)
		});
	});

});


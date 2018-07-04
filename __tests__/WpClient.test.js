import {wpClientFactory} from '../src/wpClientFactory';
import {WpClient} from '../src/WpClient';
import {FormsClient} from '../src/FormsClient';
import {PrivacySettingsClient} from '../src/PrivacySettingsClient';
import {EntriesClient} from "../src/EntriesClient";
describe( 'Factory', () => {
	it( 'Returns generic by default', () => {
		const client = wpClientFactory('https://hiroy.club', '12345' );
		expect(client ).toBeInstanceOf( WpClient );
	});

	it( 'Returns forms client when requested to.', () => {
		const client = wpClientFactory('https://hiroy.club', '12345', 'forms' );
		expect(  client ).toBeInstanceOf( FormsClient );
	});

	it( 'Returns privacy client when requested to.', () => {
		const client = wpClientFactory('https://hiroy.club', '12345', 'privacy' );
		expect(  client ).toBeInstanceOf( PrivacySettingsClient );
	});

	it( 'Returns entries client when requested as "entries".', () => {
		const client = wpClientFactory('https://hiroy.club', '12345', 'entries' );
		expect(  client ).toBeInstanceOf( EntriesClient );
	});
	it( 'Returns entries client when requested as "entry".', () => {
		const client = wpClientFactory('https://hiroy.club', '12345', 'entry' );
		expect(  client ).toBeInstanceOf( EntriesClient );
	});

});
describe( 'WordPress Client', () => {
	it( 'Has nonce getter', ( ) => {
		const client = new FormsClient();
		client.setNonce('x1');
		expect( client.getNonce() ).toBe('x1');
	});
	describe( 'sets nonce in requests', ()=> {
		it( 'Adds the nonce to requests', () => {
			const client = wpClientFactory('https://hiroy.club', '12345' );
			expect( client.headers.has( 'X-WP-NONCE' ) ).toBeTruthy();
		});

		it( 'Adds the right nonce to requests', () => {
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



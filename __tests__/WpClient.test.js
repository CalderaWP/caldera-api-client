import {wpClientFactory} from '../src/wpClientFactory';
import {WpClient} from '../src/WpClient';
import {FormsClient} from '../src/FormsClient';
import {PrivacySettingsClient} from '../src/PrivacySettingsClient';
import {EntriesClient} from '../src/EntriesClient';
import {GeneralSettingClient} from '../src/GeneralSettingClient';
import {ProLocalSettingClient} from '../src/ProLocalSettingClient';
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
	it( 'Returns general settings client when requested as "settings".', () => {
		const client = wpClientFactory('https://hiroy.club', '12345', 'settings' );
		expect( client ).toBeInstanceOf( GeneralSettingClient );
	});
	it( 'Returns pro local settings client when requested as "settings".', () => {
		const client = wpClientFactory('https://hiroy.club', '12345', 'proLocal' );
		expect( client ).toBeInstanceOf( ProLocalSettingClient );
	});

});
describe( 'WordPress Client', () => {
	it( 'Has nonce getter', ( ) => {
		const client = new FormsClient();
		client.setNonce('x1');
		expect( client.getNonce() ).toBe('x1');
	});

	it( 'Nonce getter does not make error when no nonce set', ( ) => {
		const client = new FormsClient();
		expect( client.getNonce() ).toBe('');
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



import * as cfApi from '../src/index';

describe( 'Exporting', () =>{

	it( 'Exports PrivacySettingsClient', () => {
		expect( typeof cfApi.PrivacySettingsClient ).toBe('function');
	});

	it( 'Exports ProLocalSettingClient', () => {
		expect( typeof cfApi.ProLocalSettingClient ).toBe('function');
	});

	it( 'Exports WpClient', () => {
		expect( typeof cfApi.WpClient ).toBe('function');
	});
	it( 'Exports FormsClient', () => {
		expect( typeof cfApi.FormsClient ).toBe('function');
	});
});
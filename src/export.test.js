import clients from './index';
import {PrivacySettingsClient} from "./PrivacySettingsClient";
import {ProLocalSettingClient} from "./ProLocalSettingClient";
import {WpClient} from "./WpClient";
import {FormsClient} from "./FormsClient";
import {EntriesClient} from "./EntriesClient";
import {ProClient} from "./ProClient";
import {GeneralSettingClient} from "./GeneralSettingClient";

describe('Export', () => {
	it('is an object', () => {
		expect(typeof clients).toEqual('object')
	});

	it('exports factory', () => {
		expect(typeof clients.wpClientFactory).toEqual('function')
	});

	it('exports PrivacySettingsClient', () => {
		expect(typeof clients.PrivacySettingsClient).toEqual('function')
	});

	it('exports ProLocalSettingClient', () => {
		expect(typeof clients.ProLocalSettingClient).toEqual('function')
	});
	it('exports WpClient', () => {
		expect(typeof clients.WpClient).toEqual('function')
	});
	it('exports FormsClient', () => {
		expect(typeof clients.FormsClient).toEqual('function')
	});
	it('exports EntriesClient', () => {
		expect(typeof clients.EntriesClient).toEqual('function')
	});
	it('exports ProClient', () => {
		expect(typeof clients.ProClient).toEqual('function')
	});
	it('exports GeneralSettingClient', () => {
		expect(typeof clients.GeneralSettingClient).toEqual('function')
	});

});
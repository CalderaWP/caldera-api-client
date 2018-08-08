//@flow
import {WpClient} from './WpClient';
import {FormsClient} from './FormsClient';
import {PrivacySettingsClient} from './PrivacySettingsClient';
import {EntriesClient} from "./EntriesClient";
import {GeneralSettingClient} from "./GeneralSettingClient";
import {ProLocalSettingClient} from "./ProLocalSettingClient";

/**
 * Create a WordPress API client
 * @param {String} wpApiUrl Root URL for the WordPress REST API of site
 * @param {String} wpApiNonce The REST API nonce
 * @param {String} type Optional. Type of client forms|privacy|generic Default is generic
 * @returns {FormsClient|PrivacySettingsClient|WpClient|EntriesClient|GeneralSettingClient}
 */
export function wpClientFactory(wpApiUrl: string, wpApiNonce: string, type: string = 'generic' ): WpClient {
	let client = new WpClient(wpApiUrl);
	switch (type) {
		case 'forms':
			client = new FormsClient(wpApiUrl);
			break;
		case 'privacy' :
			client = new PrivacySettingsClient(wpApiUrl);
			break;
		case 'entries':
		case 'entry':
			client = new EntriesClient(wpApiUrl);
			break;
		case 'settings' :
			client = new GeneralSettingClient(wpApiUrl);
			break;
		case 'proLocal' :
			client = new ProLocalSettingClient(wpApiUrl);
			break;
		default:
			client = new WpClient(wpApiUrl);
			break;

	}
	client.setNonce(wpApiNonce);
	return client;
}
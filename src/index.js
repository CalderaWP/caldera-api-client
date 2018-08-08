/*eslint no-undef: "error"*/
/*eslint-env node*/
import {wpClientFactory} from "./wpClientFactory";
import {ProLocalSettingClient} from "./ProLocalSettingClient";
import {PrivacySettingsClient} from "./PrivacySettingsClient";
import {WpClient} from "./WpClient";
import {FormsClient} from "./FormsClient";
import {EntriesClient} from "./EntriesClient";
import {ProClient} from "./ProClient";
import {GeneralSettingClient} from "./GeneralSettingClient";

/**
 * Export factory and all clients
 * @type {{wpClientFactory: wpClientFactory, PrivacySettingsClient: PrivacySettingsClient, ProLocalSettingClient: ProLocalSettingClient, WpClient: WpClient, FormsClient: FormsClient, EntriesClient: EntriesClient, ProClient: ProClient, GeneralSettingClient: GeneralSettingClient}}
 */
module.exports = {
	wpClientFactory,
	PrivacySettingsClient,
	ProLocalSettingClient,
	WpClient,
	FormsClient,
	EntriesClient,
	ProClient,
	GeneralSettingClient
};
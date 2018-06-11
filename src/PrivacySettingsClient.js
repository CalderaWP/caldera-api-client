//@flow
import {WpClient} from './WpClient';

/**
 * Get and update a WordPress site's privacy settings
 */
class PrivacySettingsClient extends WpClient {

	/**
	 * Get privacy settings for a form
	 *
	 * @param {String} formId ID of form to get settings for
	 * @returns {Promise}
	 */
	getSettings(formId: string): Promise<any> {
		return this.reqGet({privacy:true},formId);
	}

	/**
	 * Update privacy settings for a form
	 *
	 * @param {String} formId ID of form to get settings for
	 * @param {Object} data New settings
	 * @returns {Promise}
	 */
	updateSettings(formId: string,data: Object): Promise<any>{
		return this.reqPost(data,`${formId}/privacy`);
	}
}
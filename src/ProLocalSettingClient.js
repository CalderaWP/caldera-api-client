import {WpClient} from './WpClient';

/**
 * Get and update a WordPress site's CF Pro settings
 */
export class ProLocalSettingClient extends WpClient {
	/**
	 * Get CF Pro settings on current site
	 *
	 * @returns {Promise}
	 */
	getSettings(): Promise<any> {
		return this.reqGet({},'/settings/pro');
	}

	/**
	 * Update CF Pro settings on current site
	 *
	 * @returns {Promise}
	 */
	updateSettings(data: Object): Promise<any>{
		return this.reqPost(data,'/settings/pro');
	}
}
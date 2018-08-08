//@flow
import {WpClient} from './WpClient';

/**
 * Prepare data for
 * @param {Object} styleIncludes Style includes settings. Each value defaults to true
 * @param {boolean} cdnEnable Is CDN enabled? Default false
 * @return {{styleIncludes: {grid: boolean, form: boolean, alert: boolean}, otherSettings: {cdnEnable: boolean}}}
 */
export const prepareGeneralSettingsData = (styleIncludes: Object = {}, cdnEnable : boolean = false ) : Object => {

	return {
		styleIncludes: {
			grid: styleIncludes.hasOwnProperty( 'grid' ) ? styleIncludes.grid : true,
			form: styleIncludes.hasOwnProperty( 'form' ) ? styleIncludes.form : true,
			alert: styleIncludes.hasOwnProperty( 'alert' ) ? styleIncludes.alert : true,
		},
		otherSettings: {
			cdnEnable
		}
	}
};

/**
 * Get and update a site's general settings
 */
export class GeneralSettingClient extends WpClient {
	/**
	 * Get general settings on current site
	 *
	 * @returns {Promise}
	 */
	getSettings(): Promise<any> {
		return this.reqGet({}, '/settings');
	}

	/**
	 * Update general settings on current site
	 *
	 * @returns {Promise}
	 */
	updateSettings(styleIncludes: Object, cdnEnable : boolean): Promise<any> {

		return this.reqPost(prepareGeneralSettingsData(styleIncludes,cdnEnable), '/settings');
	}


}
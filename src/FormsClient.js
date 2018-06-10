//@flow
import {WpClient} from './WpClient';

/**
 * Client for administrating forms on a WordPress site
 */
export class FormsClient extends WpClient {

	/**
	 * Get forms
	 *
	 * @param {Numeric} page Optional. Default is 1
	 * @returns {Promise<any>}
	 */
	getForms(page: number=1): Promise<any>{
		return this.reqGet({page:page});
	};

	/**
	 * Get a form config
	 *
	 * @param {String} formId ID of form to request
	 * @returns {Promise<any>}
	 */
	getForm(formId:string): Promise<any>{
		return this.reqGet({
			preview:false
		},formId);
	};

	/**
	 * Get HTML preview of a form
	 *
	 * @param {String} formId ID of form to request
	 * @returns {Promise<any>}
	 */
	getFormPreview(formId:string): Promise<any>{
		return this.reqGet({
			preview:true
		},formId);
	};
}
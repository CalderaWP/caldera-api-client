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
	getForms(page: number = 1): Promise<any> {
		return this.reqGet({
			page:page,
			_wpnonce:this.nonce
		},this.getFormsEndpoint());
	}

	/**
	 * Get a form config
	 *
	 * @param {String} formId ID of form to request
	 * @returns {Promise<any>}
	 */
	getForm(formId: string): Promise<any> {
		return this.reqGet({
			preview: false,
			_wpnonce: this.nonce
		}, this.getFormEndpoint(formId));
	}

	/**
	 * Get endpoint for requesting one form via API
	 *
	 * @param {String} formId ID of form to request
	 * @returns {string}
	 */
	getFormEndpoint(formId: string) :string {
		return `${this.getFormsEndpoint()}/${formId}`;
	}

	/**
	 * Create a new form or clone an existing form
	 *
	 * @param {String} name Name for new form
	 * @param {Object} args Options
	 * @return {*}
	 */
	createForm(name: string,args : Object = {} ) :  Promise<any> {
		return this.reqPost({
			...args,
			name: name
		},this.getFormsEndpoint());
	}

	/**
	 * Get route endpoint for forms route
	 *
	 * @returns {string}
	 */
	getFormsEndpoint() :string {
		return `forms`;
	}

	/**
	 * Get HTML preview of a form
	 *
	 * @param {String} formId ID of form to request
	 * @returns {Promise<any>}
	 */
	getFormPreview(formId: string): Promise<any> {
		return this.reqGet({
			preview: true,
			_wpnonce: this.nonce
		}, this.getFormEndpoint(formId));
	}


}
//@flow
import {WpClient} from './WpClient';

/**
 * Client for accessing Caldera Forms entry data via Caldera Forms REST API
 */
export class EntriesClient extends WpClient {

	/**
	 * Get one page of entries for a form
	 *
	 * @param {String} formId ID of form to get entries for.
	 * @param {number} page Optional. Which page of entries to get. Default is 1.
	 * @return {Promise<any>}
	 */
	getEntries(formId: string, page: number = 1): Promise<any> {
		return this.reqGet({
			page,
			_wpnonce: this.nonce
		}, this.getEntriesEndpoint(formId));
	}

	/**
	 * Get a single entry of a form
	 *
	 * @param {String} formId ID of form to get entries for.
	 * @param {String} entryId ID of entry to find.
	 * @return {Promise<any>}
	 */
	getEntry(formId: string, entryId: number): Promise<any> {
		return this.reqGet({
			_wpnonce: this.nonce
		}, this.getEntryEndpoint(formId, entryId));
	}

	/**
	 * Delete a single entry of a form
	 *
	 * @param {String} formId ID of form to get entries for.
	 * @param {String} entryId ID of entry to find.
	 * @return {Promise<any>}
	 */
	deleteEntry( formId: string, entryId: number ): Promise<any> {
		return this.reqDelete(this.getEntryEndpoint( formId, entryId ) );
	}

	/**
	 * Resent a single entry of a form
	 *
	 * @param {String} formId ID of form to get entries for.
	 * @param {String} entryId ID of entry to find.
	 * @return {Promise<any>}
	 */
	resendEntry( formId: string, entryId: number ): Promise<any> {
		return this.reqPost(this.getEntryEndpoint( formId, entryId ) );
	}


	/**
	 * The endpoint URI for a collection of entries for one form.

	 * @param {String} formId ID of form to get entries for.
	 * @return {string}
	 */
	getEntriesEndpoint(formId: string): string {
		return `entries/${formId}`;
	}

	/**
	 * The endpoint URI for single entries
	 *
	 * @param {String} formId ID of form to get entries for.
	 * @param {String} entryId ID of entry to find.
	 * @return {string}
	 */
	getEntryEndpoint(formId: string, entryId: number): string {
		return `${this.getEntriesEndpoint(formId)}/${entryId}`;
	}

	/**
	 * The resend endpoint URI for single entries
	 *
	 * @param {String} formId ID of form to get entries for.
	 * @param {String} entryId ID of entry to find.
	 * @return {string}
	 */
	getEntryResendEndpoint(formId: string, entryId: number): string {
		return `${this.getEntriesEndpoint(formId)}/${entryId}/resend`;
	}


}
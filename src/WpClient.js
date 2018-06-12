//@flow

import {ApiClient} from './ApiClient';

export class WpClient extends ApiClient {
	/**
	 * WP API for requests
	 *
	 * @type {String}
	 */
	nonce: string;
	/**
	 * Set nonce for requests
	 *
	 * @param {String} nonce
	 */
	setNonce(nonce: string) {
		this.nonce= nonce;
		this.headers.set('X-WP-Nonce', this.nonce);
	}

}
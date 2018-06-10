//@flow

import {ApiClient} from './ApiClient';

export class WpClient extends ApiClient {

	/**
	 * Set nonce for requests
	 *
	 * @param {String} nonce
	 */
	setNonce(nonce: string) {
		this.headers.set('X-WP-Nonce', nonce);
	}

}
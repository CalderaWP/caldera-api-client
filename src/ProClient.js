//@flow
import {ApiClient} from './ApiClient';

import {sha1} from 'sha1'

/**
 * Client for remote access to Caldera Forms Pro
 *
 * Should only be used in admin context as it exposes public key, secret key and token.
 */
export class ProClient extends ApiClient{

	publicKey: string;
	secretKey: string;

	/**
	 * Set the public key for CF Pro
	 * @param publicKey
	 */
	setPublic(publicKey: string){
		this.publicKey=publicKey;
	}

	/**
	 * Set the secret key for CF Pro
	 * @param secretKey
	 */
	setSecret(secretKey: string){
		this.secretKey=secretKey;
	}

	/**
	 * Check if both public and secret keys are set for CF Pro
	 * @returns {string}
	 */
	hasKeys(): boolean {
		function truthy(a, b): boolean %checks {
			return !!a && !!b;
		}

		return truthy(this.secretKey && this.publicKey );
	}

	/**
	 * Get CF Pro token
	 *
	 * @returns {String}
	 */
	getToken(): string {
		if( ! this.hasKeys() ){
			return '';
		}
		return sha1(`${this.publicKey}${this.secretKey}`);

	}

	/**
	 * Get layouts from CF Pro
	 *
	 * @returns {*}
	 */
	getLayouts(): Promise<any> {
		return this.reqGet( this.reqGetData({}), '/layouts/list' );
	}


	reqGetData(data: ?Object = {}) {
		return {
			...{
				'public':this.publicKey,
				token: this.getToken()
			},
			data
		};
	}
}
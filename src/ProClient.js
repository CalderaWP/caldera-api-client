//@flow
import {ApiClient} from './ApiClient';

import sha1 from  'locutus/php/strings/sha1';

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
	 * @param {String} publicKey
	 */
	setPublicKey(publicKey: string){
		this.publicKey=publicKey;
	}

	/**
	 * Get the public key for CF Pro
	 * @returns {String}
	 */
	getPublicKey() : string {
		return this.publicKey;
	}

	/**
	 * Set the secret key for CF Pro
	 * @param {String} secretKey
	 */
	setSecretKey(secretKey: string){
		this.secretKey=secretKey;
	}

	/**
	 * Get the secret key for CF Pro
	 * @returns {String}
	 */
	getSecretKey() : string {
		return this.secretKey;
	}

	/**
	 * Check if both public and secret keys are set for CF Pro
	 * @returns {string}
	 */
	hasKeys(): boolean {

		return (
			undefined !== this.secretKey
			&& '' !== this.secretKey
			&& undefined !== this.publicKey
			&& '' !== this.publicKey
		);
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
		return sha1(this.publicKey + this.secretKey);

	}

	/**
	 * Get layouts from CF Pro
	 *
	 * @returns {*}
	 */
	getLayouts(): Promise<any> {
		return this.reqGet( this.requestDataForGetRequests({
			simple:true
		}), '/layouts/list' );
	}


	/**
	 * Adds public key and token to object
	 *
	 * Use for GET request data
	 * @param data
	 * @returns {{public: string, token: string}}
	 */
	requestDataForGetRequests(data: ?Object = {}) {
		return {
			...data,
			'public': this.publicKey ? this.publicKey : 0,
			token: this.getToken()
		};
	}


	/**
	 * Create a Request object
	 *
	 * @param {String} endpoint
	 * @param {Object} data
	 * @param {String}method
	 * @returns {Request}
	 */
	createRequest(endpoint: string, data: Object, method: string): Request {
		let request = super.createRequest(endpoint,data, method);
		request.headers.set( 'X-CS-PUBLIC', this.getPublicKey() );
		request.headers.set( 'X-CS-TOKEN', this.getToken() );
		return request;
	}
}
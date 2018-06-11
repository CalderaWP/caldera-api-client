//@flow
interface Body {
	bodyUsed: boolean;
	arrayBuffer(): Promise<ArrayBuffer>;
	blob(): Promise<Blob>;
	formData(): Promise<FormData>;
	json(): Promise<any>;
	text(): Promise<string>;
}
/**
 * Generic API client
 */
export class ApiClient{
	/**
	 * Base route for client
	 *
	 * @type {String}
	 */
	route: string;
	/**
	 * Headers for all requests
	 *
	 * @type {Headers}
	 */
	headers: Headers;

	/**
	 *
	 * @param {String} route The full URL of API route is a client for
	 * @param {Object} headers Optional. Headers for all requests
	 */
	constructor(route: string,headers: ?Object = {} ){
		this.route=route;
		if( ! headers ){
			headers = {};
		}
		this.headers=new Headers(headers);
	}



	/**
	 * Make a request to an endpoint
	 *
	 * @param endpoint
	 * @param data
	 * @param method
	 * @returns {Promise<Response>}
	 */
	makeRequest(endpoint: string, data: Object, method: string): Promise<Response> {
		let request = this.createRequest(endpoint, data, method);
		return fetch(request);
	}
	/**
	 * Create a Request object
	 *
	 * @param endpoint
	 * @param data
	 * @param method
	 * @returns {Request}
	 */
	createRequest(endpoint: string, data: Object, method: string): Request {
		let args = {
			method: 'method',
			mode:'same-origin',
			credentials: 'same-origin',
			redirect: 'follow',
			body: '',
			headers: this.headers
		};

		if ('POST' === method || 'PUT' === method) {
			args.body = JSON.stringify(data);
			args.headers.append('Content-Type', 'application/json');
			args.headers.append('Content-Length', args.body.length.toString());
		}

		return new Request(this.urlFromEndpoint(endpoint, method), args);

	}
	/**
	 * Create URL for route with endpoint
	 * @param endpoint
	 * @param method
	 * @param data
	 * @returns {*}
	 */
	urlFromEndpoint(endpoint: string, method: string = 'GET', data: ?Object = {}): string{
		if ('GET' === method) {
			if( ! data ){
				data = {};
			}
			return this.urlString(data, endpoint);
		}

		return `${this.route}${endpoint}`;
	}
	/**
	 * Make a GET request
	 *
	 * @param data Object containing query arguments
	 * @param endpoint Optional. Endpoint to query
	 * @returns {Promise<T>}
	 */
	reqGet(data: Object, endpoint: string = ''): Promise<any> {
		return this.makeRequest(endpoint, data, 'GET')
			.then(
				response => {
					return this.handleResponse(response);
				},
				error => {
					return this.handleError(error);
				}
			);
	}
	/**
	 * Make a POST request
	 *
	 * @param data Request body data
	 * @param endpoint Optional. Endpoint to query
	 * @returns {Promise<T>}
	 */
	reqPost (data: Object, endpoint: string = ''): Promise<any> {
		return this.makeRequest(endpoint, data, 'POST')
			.then(
				response => {
					return this.handleResponse(response);
				},
				error => {
					return this.handleError(error);
				}
			);
	}
	/**
	 * Make a PUT request
	 *
	 * @param data Request body data
	 * @param endpoint Optional. Endpoint to query
	 * @returns {Promise<T>}
	 */
	reqPut (data: Object, endpoint: string = ''): Promise<any>  {
		return this.makeRequest(endpoint, data, 'PUT')
			.then(
				response => {
					return this.handleResponse(response);
				},
				error => {
					return this.handleError(error);
				}
			);
	}
	/**
	 * Make a DELETE request
	 *
	 * @param endpoint Optional. Endpoint to query
	 * @returns {Promise<T>}
	 */
	reqDelete(endpoint: string = ''): Promise<any> {
		return this.makeRequest(endpoint, {}, 'DELETE')
			.then(
				response => {
					return this.handleResponse(response);
				},
				error => {
					return this.handleError(error);
				}
			);

	}
	/**
	 * Given HTTP response, return body
	 *
	 * @param response
	 * @returns {*}
	 */
	handleResponse(response: Response): Object  {
		if(response.ok) {
			return response.json();
		} else {
			return {

			};
		}
	}


	/**
	 * Given an HTTP response that is an error, return statusText
	 *
	 * @param error
	 * @returns {string}
	 */
	handleError(error: Response): string {
		return error.statusText;
	}
	/**
	 * Create a URL string with query args
	 * @param data Query arguments
	 * @param endpoint Optional. Endpoint to query
	 * @returns {string}
	 */
	urlString (data: Object, endpoint: string = ''): string {

		if ('' !== endpoint && '/' === endpoint.charAt(0)) {
			endpoint = endpoint.substr(1);
		}

		let str = '';
		for (let key in data) {
			if (str !== '') {
				str += '&';
			}
			str += key + '=' + data[key];
		}
		if (endpoint) {
			return `${this.route}/${endpoint}?${str}`;
		}
		return this.route + '?' + str;
	}

}
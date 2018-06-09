//@flow
export const apiClient = (route:string,headers: ?Object = {} ) :Object =>{

	return {
		route:route,
		headers:headers,
		/**
		 *
		 * @param endpoint
		 * @param data
		 * @param method
		 * @returns {Promise<Response>}
		 */
		makeRequest(endpoint:string, data:options, method:string):Promise<Response>  {
			let request = this.createRequest(endpoint,data,method);
			return fetch(request);
		},

		/**
		 * Create a makeRequest object
		 *
		 * @param endpoint
		 * @param data
		 * @param method
		 * @returns {Request}
		 */
		createRequest(endpoint:string,data:options,method:string) :Request {
			let args = {
				method: 'method',
				mode: this.mode,
				credentials: this.credentials,
				redirect: 'follow',
			};

			args.headers = new Headers();
			if ('POST' === method || 'PUT' === method) {
				args.body = JSON.stringify(data);
				args.headers.append("Content-Type", "application/json");
				args.headers.append("Content-Length", args.body.length.toString());
			}

			return new Request(this.urlFromEndpoint(endpoint, method), args);

		},

		/**
		 * Create URL for route with endpoint
		 * @param endpoint
		 * @param method
		 * @param data
		 * @returns {*}
		 */
		urlFromEndpoint(endpoint:string,method:string = 'GET', data:?object = {}) : string {
			if( 'GET'=== method){
				return this.urlString(data,endpoint);
			}

			return `${this.route}${endpoint}`
		},

		reqGet(data:object,endpoint:string=''): object {
			return this.makeRequest(endpoint,data,'GET')
				.then(
					response => {return this.handleResponse(response);},
					error => {return this.handleError(error);}
				);
		},

		reqPost(data:object,endpoint:string='') {
			return this.makeRequest(endpoint,data,'POST')
				.then(
					response => {return this.handleResponse(response);},
					error => {return this.handleError(error);}
				);
		},

		reqPut(data:object,endpoint:string='') {
			return this.makeRequest(endpoint,data,'PUT')
				.then(
					response => {return this.handleResponse(response);},
					error => {return this.handleError(error);}
				);
		},
		reqDelete(endpoint:string='') {
			return this.makeRequest(endpoint,{},'DELETE')
				.then(
					response => {return this.handleResponse(response);},
					error => {return this.handleError(error);}
				);

		},
		handleResponse(response: Response ) : object{
			if ('string' === typeof response.body) {
				const maybe = JSON.parse(response.body);
				if ('object' === typeof  maybe ) {
					if( maybe.hasOwnProperty('body' )&& 'object' === typeof  maybe.body ){
						return maybe.body;
					}
					return maybe;
				}

			}
			return response.body.body;
		},
		handleError(error:Response):string {
			return error.statusText;
		},
		urlString(data:object,endpoint:string=''):string {
			if ( '' !== endpoint && '/'===endpoint.charAt(0)){
				endpoint = endpoint.substr(1);
			}

			let str = "";
			for (let key in data) {
				if (str !== "") {
					str += "&";
				}
				str += key + "=" + data[key];
			}
			if( endpoint){
				return `${this.route}/${endpoint}?${str}`
			}
			return this.route + '?' + str;
		}
	}

};
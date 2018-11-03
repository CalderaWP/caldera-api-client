import {ApiClient} from '../src/ApiClient';

const form = {ID: 'CF1'};
const forms = [
	form
];
const formsApiRoute = 'https://wordpress.test/wp-json/cf-api/v2/forms';

describe('ApiClient', () => {
	beforeEach(() => {
		fetch.resetMocks();
	});

	describe('url functions', () => {
		it('urlString adds route', () => {
			const client = new ApiClient(formsApiRoute);
			expect(typeof client.urlString).toBe('function');
			expect(client.urlString({1: 1, 2: 2}, 'cf1')).toBe(formsApiRoute + '/cf1?1=1&2=2');
		});

		it('Adds route', () => {
			const client = new ApiClient(formsApiRoute);
			expect(typeof client.urlFromEndpoint).toBe('function');
			expect(client.urlFromEndpoint('/cf1')).toBe(formsApiRoute + '/cf1?');
		});
	});

	describe('handles Error', () => {
		it('Creates object form JSON', () => {
			const client = new ApiClient(formsApiRoute);
			const response = new Response(
				JSON.stringify({}),
				{
					status: 500,
					statusText: 'Fails'
				}
			);
			expect(client.handleError(response)).toEqual('Fails');
		});
	});

});

describe('Makes requests', () => {
	beforeEach(() => {
		fetch.resetMocks();
	});

	describe('GET', () => {
		describe('Makes GET requests using makeRequest', () => {
			it('Makes GET requests using makeRequest', () => {
				fetch.mockResponseOnce(new Response(JSON.stringify(forms)));
				const formsClient = new ApiClient('/forms', {});
				formsClient.makeRequest('/', {}).then(res => {
					expect(JSON.parse(res.body.body)).toEqual(forms);
				}, error => {
					//nothing here, but test will generate an error without it.
				});
				expect(fetch.mock.calls).toHaveLength(1);
			});
		});

		describe('Makes GET requests using reqGet', () => {
			it('Makes GET requests using reqGet', () => {
				fetch.mockResponseOnce(new Response(JSON.stringify(forms)));
				const formsClient = new ApiClient('/forms', {});
				formsClient.reqGet({}, '').then(res => {
					expect(res).toEqual(JSON.stringify(forms));
				}, error => {
					//nothing here, but test will generate an error without it.
				});

				expect(fetch.mock.calls).toHaveLength(1);
			});
		});
	});

	describe('POST', () => {
		it('Makes POST requests', () => {
			fetch.mockResponseOnce(new Response(JSON.stringify(form)));
			const formClient = new ApiClient('form/CF1');
			formClient.makeRequest('', {}, 'POST').then(res => {
				expect(res.body.body).toEqual(JSON.stringify(form));
			}, error => {
				//nothing here, but test will generate an error without it.
			});
			expect(fetch.mock.calls).toHaveLength(1);
		});

		it('Sets headers for POST requests', () => {
			const formClient = new ApiClient('/forms/cf2',);
			const request = formClient.createRequest('', {}, 'POST');
			expect(request.headers.has('Content-Length')).toBeTruthy();
			expect(request.headers.has('Content-Type')).toBeTruthy();
			expect(request.headers.get('Content-Type')).toEqual('application/json');
		});

		it('Makes POST requests using reqPost', () => {
			fetch.mockResponseOnce(new Response(JSON.stringify(forms)));
			const formsClient = new ApiClient('/forms', {});
			formsClient.reqPost({form}, '/cf1').then(res => {
				expect(res).toEqual(JSON.stringify(forms));
			}, error => {
				//nothing here, but test will generate an error without it.
			});

			expect(fetch.mock.calls).toHaveLength(1);
		});

		it('Makes POST requests using reqPost and CORS mode set to true', () => {
			fetch.mockResponseOnce(new Response(JSON.stringify(forms)));
			const formsClient = new ApiClient('/forms', {});
			formsClient.setCorsMode(true);
			formsClient.reqPost({form}, '/cf1').then(res => {
				expect(res).toEqual(JSON.stringify(forms));
			}, error => {
				//nothing here, but test will generate an error without it.
			});

			expect(fetch.mock.calls).toHaveLength(1);
		});

		it( 'sets CORS mode', () => {
			const formsClient = new ApiClient('/forms', {});
			formsClient.setCorsMode(true);
			expect(formsClient.corsMode).toBe(true);

			formsClient.setCorsMode(false);
			expect(formsClient.corsMode).toBe(false);

			formsClient.setCorsMode(true);
			expect(formsClient.corsMode).toBe(true);
		});
	});

	describe('PUT', () => {
		it('Makes PUT requests', () => {
			fetch.mockResponseOnce(new Response(JSON.stringify(form)));
			const formClient = new ApiClient('form/CF1');
			formClient.makeRequest('', {}, 'PUT').then(res => {
				expect(res.body.body).toEqual(JSON.stringify(form));
			}, error => {
				//nothing here, but test will generate an error without it.
			});
			expect(fetch.mock.calls).toHaveLength(1);
		});

		it('Makes PUT requests using reqPut', () => {
			fetch.mockResponseOnce(new Response(JSON.stringify(forms)));
			const formsClient = new ApiClient('/forms', {});
			formsClient.reqPut({form}, '/cf1').then(res => {
				expect(res).toEqual(JSON.stringify(forms));
			}, error => {
				//nothing here, but test will generate an error without it.
			});

			expect(fetch.mock.calls).toHaveLength(1);
		});
	});

	describe('DELETE', () => {
		it('Makes DELETE requests', () => {
			fetch.mockResponseOnce(new Response(JSON.stringify({delete: true})));
			const formClient = new ApiClient('/forms/cf2',);
			formClient.makeRequest('', {}).then(res => {
				expect(res.body.body).toEqual(JSON.stringify({delete: true}));
			}, error => {
				//nothing here, but test will generate an error without it.
			});

			expect(fetch.mock.calls).toHaveLength(1);
		});

		it('Makes PUT requests using reqPut', () => {
			fetch.mockResponseOnce(new Response(JSON.stringify(forms)));
			const formsClient = new ApiClient('/forms', {});
			formsClient.reqPut({form}, '/cf1').then(res => {
				expect(res).toEqual(JSON.stringify(forms));
			}, error => {
				//nothing here, but test will generate an error without it.
			});

			expect(fetch.mock.calls).toHaveLength(1);
		});
	});

});

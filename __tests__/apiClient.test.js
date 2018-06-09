import {apiClient} from "../src/apiClient";
const form = {ID: 'CF1'};
const forms = [
	form
];
const formsApiRoute = 'https://wordpress.test/wp-json/cf-api/v2/forms';

describe( 'apiClient', () => {
	beforeEach(() => {
		fetch.resetMocks()
	});


	describe('url functions', () => {
		it( 'urlString adds route', () => {
			const client = new apiClient( formsApiRoute  );
			expect( typeof client.urlString ).toBe( 'function' );
			expect( client.urlString({1:1,2:2}, 'cf1')).toBe( formsApiRoute + '/cf1?1=1&2=2' );
		});

		it( 'Adds route', () => {
			const client = new apiClient( formsApiRoute  );
			expect( typeof client.urlFromEndpoint).toBe( 'function' );
			expect( client.urlFromEndpoint('/cf1')).toBe( formsApiRoute + '/cf1?' );
		});
	});

	describe( 'handles Responses', () =>{
		it( 'Creates object form JSON', () => {
			const client = new apiClient( formsApiRoute  );
			const response = new Response(
				JSON.stringify({body:forms}),
				{
					status:200
				}
			);
			expect( client.handleResponse(response) ).toEqual( forms );
		});
	});

	describe( 'handles Error', () =>{
		it( 'Creates object form JSON', () => {
			const client = new apiClient( formsApiRoute  );
			const response = new Response(
				JSON.stringify({}),
				{
					status:500,
					statusText:'Fails'
				}
			);
			expect( client.handleError(response) ).toEqual( 'Fails' );
		});
	})

});

describe( 'Makes requests', () => {
	beforeEach(() => {
		fetch.resetMocks()
	});

	describe( 'GET', () => {
		it('Makes GET requests using makeRequest', () => {
			fetch.mockResponseOnce(new Response(JSON.stringify(forms)));
			const formsClient = new apiClient( '/forms', {}  );
			formsClient.makeRequest('/',{}).then(res => {
				expect(res.body.body).toEqual(JSON.stringify(forms));
			});

			fetch.mockResponseOnce(new Response(JSON.stringify({body:forms})));
			formsClient.reqGet( ).then(  response => {
				expect( response ).toBe(forms);
			});

			expect(fetch.mock.calls.length).toEqual(2)
		});

		it('Makes GET requests using reqGet', () => {
			fetch.mockResponseOnce(new Response(JSON.stringify(forms)));
			const formsClient = new apiClient( '/forms', {}  );
			formsClient.reqGet({},'').then(res => {
				expect(res).toEqual(JSON.stringify(forms));
			});

			expect(fetch.mock.calls.length).toEqual(1)
		});
	});

	describe( 'POST', () => {
		it( 'Makes POST requests', () => {
			fetch.mockResponseOnce(new Response(JSON.stringify(form)));
			const formClient = new apiClient('form/CF1');
			formClient.makeRequest('',{},'POST').then(res => {
				expect(res.body.body).toEqual(JSON.stringify(form));
			});
			expect(fetch.mock.calls.length).toEqual(1)
		});

		it('Sets headers for POST requests', () => {
			fetch.mockResponseOnce(new Response(JSON.stringify(form)));
			const formClient = new apiClient( '/forms/cf2',  );
			const request = formClient.createRequest('',{},'POST');
			expect(request.headers.has('Content-Length')).toBeTruthy();
			expect(request.headers.has('Content-Type')).toBeTruthy();
			expect(request.headers.get('Content-Type')).toEqual('application/json');
		});

		it('Makes POST requests using reqPost', () => {
			fetch.mockResponseOnce(new Response(JSON.stringify(forms)));
			const formsClient = new apiClient( '/forms', {}  );
			formsClient.reqPost({form},'/cf1').then(res => {
				expect(res).toEqual(JSON.stringify(forms));
			});

			expect(fetch.mock.calls.length).toEqual(1)
		});
	});

	describe( 'PUT', () => {
		it( 'Makes PUT requests', () => {
			fetch.mockResponseOnce(new Response(JSON.stringify(form)));
			const formClient = new apiClient('form/CF1');
			formClient.makeRequest('',{},'PUT').then(res => {
				expect(res.body.body).toEqual(JSON.stringify(form));
			});
			expect(fetch.mock.calls.length).toEqual(1)
		});

		it('Makes PUT requests using reqPut', () => {
			fetch.mockResponseOnce(new Response(JSON.stringify(forms)));
			const formsClient = new apiClient( '/forms', {}  );
			formsClient.reqPut({form},'/cf1').then(res => {
				expect(res).toEqual(JSON.stringify(forms));
			});

			expect(fetch.mock.calls.length).toEqual(1)
		});
	});

	describe( 'DELETE', () => {
		it( 'Makes DELETE requests', () => {
			fetch.mockResponseOnce(new Response(JSON.stringify({delete:true})));
			const formClient = new apiClient( '/forms/cf2',  );
			const request = formClient.createRequest('/delete',{},'DELETE');
			formClient.makeRequest('',{}).then(res => {
				expect(res.body.body).toEqual(JSON.stringify({delete:true}));
			});

			expect(fetch.mock.calls.length).toEqual(1)
		});

		it('Makes PUT requests using reqPut', () => {
			fetch.mockResponseOnce(new Response(JSON.stringify(forms)));
			const formsClient = new apiClient( '/forms', {}  );
			formsClient.reqPut({form},'/cf1').then(res => {
				expect(res).toEqual(JSON.stringify(forms));
			});

			expect(fetch.mock.calls.length).toEqual(1)
		});
	});

});
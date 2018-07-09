import {FormsClient} from '../src/FormsClient';


describe( 'Forms Client', () => {
	beforeEach(() => {
		fetch.resetMocks();
	});

	const form = {ID: 'CF1'};
	const forms = [
		form
	];
	const formsApiRoute = 'https://wordpress.test/wp-json/cf-api/v2/forms';

	describe( 'Urls are correct', () => {
		it( 'creates URL for form endpoint correctly', () => {
			const client = new FormsClient(formsApiRoute );
			expect( client.getFormEndpoint('cf1') ).toEqual('forms/cf1');
		});
		it( 'creates URL for forms endpoint correctly', () => {
			const client = new FormsClient(formsApiRoute );
			expect( client.getFormEndpoint() ).toEqual('forms/');
		});
	});

	describe( 'Forms endpoint', () => {
		it( 'Gets forms', () =>{
			const client = new FormsClient(formsApiRoute );
			client.setNonce('12345');
			fetch.mockResponseOnce(JSON.stringify(forms));
			client.getForms(1).then(  response => {
				expect( response ).toEqual(forms);
			}).catch((error) => {
				// eslint-disable-next-line no-console
				console.log(error);
			});
			expect(fetch.mock.calls).toHaveLength(1);

		});
	});

	describe( 'Form endpoint', () => {
		it( 'Gets a form', () =>{
			const client = new FormsClient(formsApiRoute );
			client.setNonce('12345');
			fetch.mockResponseOnce(JSON.stringify(form));
			client.getForm('CF1').then(  response => {
				expect( response ).toEqual(form);
			}).catch((error) => {
				// eslint-disable-next-line no-console
				console.log(error);
			});
			expect(fetch.mock.calls).toHaveLength(1);
		});
	});

	describe( 'preview route', () => {
		beforeEach(() => {
			fetch.resetMocks();
		});

		it( 'gets form preview', () => {
			const mockPreviewHtml = '<div><form></form></div>';
			const mockResponse = {
				js: {a:1},
				css: {b:1},
				html: mockPreviewHtml
			};
			const client = new FormsClient(formsApiRoute);
			client.setNonce('12345');
			fetch.mockResponseOnce(JSON.stringify(mockResponse));
			client.getFormPreview('CF1').then(response => {
				expect(response).toEqual(mockResponse);
			},error => {
				//nothing here, but test will generate an error without it.
			});
			expect(fetch.mock.calls).toHaveLength(1);


		});

	});

});

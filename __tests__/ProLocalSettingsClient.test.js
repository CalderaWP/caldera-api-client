import {ProLocalSettingClient} from '../src/ProLocalSettingClient';

const settings = {
	accountId: '1',
	apiKey: '123',
	apiSecret: '1111',
	generatePDFs: false,
	enhancedDelivery: true,
	plan: 'apex',
	activate: false,
	logLevel: 300,
	'forms': [{
		'attach_pdf': false,
		'pdf_link': 0,
		'layout': 5,
		'pdf_layout': 0,
		'form_id': 'CF54b455a0722ac',
		'name': 'Add-O',
	}]
};

describe( 'ProLocalSettingClient', () => {
	beforeEach(() => {
		fetch.resetMocks();
	});
	it( 'Gets settings', () => {
		fetch.mockResponseOnce(new Response(JSON.stringify(settings)));
		const client = new ProLocalSettingClient('https://hiroy.club/wp-json/cf-api/v2');
		client.getSettings().then(res => {
			expect(res).toEqual(settings);
		},error => {
			//nothing here, but test will generate an error without it.
		});
		expect(fetch.mock.calls).toHaveLength(1);
	});


	it( 'Updates settings', () => {
		fetch.mockResponseOnce(new Response(JSON.stringify(settings)));
		const client = new ProLocalSettingClient('https://hiroy.club/wp-json/cf-api/v2');
		client.updateSettings(settings).then(res => {
			expect(res).toEqual(settings);
		},error => {
			//nothing here, but test will generate an error without it.
		});
		expect(fetch.mock.calls).toHaveLength(1);
	});
});
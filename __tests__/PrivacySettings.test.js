import {PrivacySettingsClient} from '../src/PrivacySettingsClient';

const settings = {
	'ID': 'CF5b197831b60ae',
	'name': 'Stripe',
	'fields': {
		'fld_9899154': {'ID': 'fld_9899154', 'name': 'Priceaa', 'type': 'hidden'},
		'fld_4917648': {'ID': 'fld_4917648', 'name': 'Email', 'type': 'email'},
		'fld_1081036': {'ID': 'fld_1081036', 'name': 'Total', 'type': 'calculation'}
	},
	'emailIdentifyingFields': ['fld_4917648'],
	'piiFields': ['fld_9899154', 'fld_4917648'],
	'privacyExporterEnabled': true
};

describe( 'PrivacySettingsClient', () => {
	beforeEach(() => {
		fetch.resetMocks();
	});

	it( 'Gets the settings', () => {
		fetch.mockResponseOnce(new Response(JSON.stringify(settings)));

		const client = new PrivacySettingsClient( '/forms', {}  );
		client.getSettings('CF5b197831b60ae').then(res => {
			expect(res).toEqual(settings);
		},error => {
			//nothing here, but test will generate an error without it.
		});

		expect(fetch.mock.calls).toHaveLength(1);
	});

	it( 'Updates the settings', () => {
		fetch.mockResponseOnce(new Response(JSON.stringify(settings)));
		const client = new PrivacySettingsClient( '/forms', {}  );
		client.updateSettings('CF5b197831b60ae',{
			'emailIdentifyingFields': ['fld_4917648'],
			'piiFields': ['fld_9899154', 'fld_4917648'],
			'privacyExporterEnabled': true
		}).then(res => {
			expect(res).toEqual(settings);
		},error => {
			//nothing here, but test will generate an error without it.
		});

		expect(fetch.mock.calls).toHaveLength(1);
	});
});
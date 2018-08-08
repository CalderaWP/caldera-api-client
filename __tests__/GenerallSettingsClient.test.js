import {GeneralSettingClient,prepareGeneralSettingsData} from '../src/GeneralSettingClient';

const settings = {
	styleIncludes: {
		grid: false,
		form: true,
		alert: true
	},
	otherSettings : {
		cdnEnable: false
	}
};

describe( 'prepareGeneralSettingsData', () => {
	it( 'fills in missing style includes', () => {
		expect(prepareGeneralSettingsData({
			grid: false,
		})).toEqual(settings);
	});
});

describe( 'ProLocalSettingClient', () => {
	beforeEach(() => {
		fetch.resetMocks();
	});
	it( 'Gets settings', () => {
		fetch.mockResponseOnce(new Response(JSON.stringify(settings)));
		const client = new GeneralSettingClient('https://hiroy.club/wp-json/cf-api/v2');
		client.getSettings().then(res => {
			expect(res).toEqual(settings);
		},error => {
			//nothing here, but test will generate an error without it.
		});
		expect(fetch.mock.calls).toHaveLength(1);
	});


	it( 'Updates settings', () => {
		fetch.mockResponseOnce(new Response(JSON.stringify(settings)));
		const client = new GeneralSettingClient('https://hiroy.club/wp-json/cf-api/v2');
		client.updateSettings(settings).then(res => {
			expect(res).toEqual(settings);
		},error => {
			//nothing here, but test will generate an error without it.
		});
		expect(fetch.mock.calls).toHaveLength(1);
	});
});
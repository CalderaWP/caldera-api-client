import {EntriesClient} from '../src/EntriesClient';

const formId = 'CF5b197831b60ae';
const entriesCollection = require('./mock-data/entries/CF5b197831b60ae.json');
const entries26 = require('./mock-data/entries/CF5b197831b60ae/26.json');
const entries27 = require('./mock-data/entries/CF5b197831b60ae/27.json');

describe( 'Entries client', () => {
	beforeEach(() => {
		fetch.resetMocks();
	});

	describe( 'Mock data', () => {
		it( 'has the mock data for entries', () => {
			expect( typeof  entriesCollection ).toBe( 'object' );
		});

		it( 'has the right number of mock entries', () => {
			expect( Object.keys(entriesCollection) ).toHaveLength( 2 );
		});

		it( 'has entry 26', () => {
			expect( typeof  entries26 ).toBe( 'object' );
		});

		it( 'has entry 27', () => {
			expect( typeof  entries27 ).toBe( 'object' );
		});

		it( 'can re-serialize mock data and still be a good mock', () => {
			expect(JSON.parse(JSON.stringify(entriesCollection))).toEqual(entriesCollection);
		});
	});

	describe( 'Endpoint Urls', () => {
		it( 'Forms entries list URL', () => {
			const client = new EntriesClient('https://hiroy.club/wp-json/cf-api/v1');
			expect( client.getEntriesEndpoint(formId)).toEqual('entries/CF5b197831b60ae');
		});

		it( 'Single entry URL', () => {
			const client = new EntriesClient('https://hiroy.club/wp-json/cf-api/v1');
			expect( client.getEntryEndpoint(formId,27)).toEqual('entries/CF5b197831b60ae/27');
		});

		it( 'Resend entry URL', () => {
			const client = new EntriesClient('https://hiroy.club/wp-json/cf-api/v1');
			expect( client.getEntryResendEndpoint(formId,27)).toEqual('entries/CF5b197831b60ae/27/resend');
		});
	});

	describe( 'getting entries', () => {

		it( 'Gets entries collection', () => {
			fetch.mockResponseOnce(new Response(JSON.stringify({a:1})));
			const client = new EntriesClient('https://hiroy.club/wp-json/cf-api/v1');
			client.setNonce('aaaa-aa-a');
			client.getEntries(formId).then(  response => {
				expect( response ).toEqual(entriesCollection);
			},error => {});
			expect(fetch.mock.calls).toHaveLength(1);

		});

		it( 'Gets a single entry', () => {
			fetch.mockResponseOnce(new Response(JSON.stringify(entries26)));
			const client = new EntriesClient('https://hiroy.club/wp-json/cf-api/v1');
			client.getEntry(formId,26).then(  response => {
				expect( response ).toEqual(entries26);
			},error => {});
			expect(fetch.mock.calls).toHaveLength(1);
		});
	});

	describe( 'Resending entries', () => {
		it( 'Resends a single entry', () => {
			const r = {
				resent: true,
				entry_id: '26'
			};
			fetch.mockResponseOnce(new Response(JSON.stringify(r)));
			const client = new EntriesClient('https://hiroy.club/wp-json/cf-api/v1');
			client.resendEntry(formId,26).then(  response => {
				expect( response ).toEqual({});
			},error => {});
			expect(fetch.mock.calls).toHaveLength(1);
		});
	});

	describe( 'deleting entries', () => {
		it( 'Deletes a single entry', () => {
			const r = {
				message: 'Entry Deleted'
			};
			fetch.mockResponseOnce(new Response(JSON.stringify(r)));
			const client = new EntriesClient('https://hiroy.club/wp-json/cf-api/v1');
			client.deleteEntry(formId,26).then(  response => {
				expect( response ).toEqual(r);
			},error => {});
			expect(fetch.mock.calls).toHaveLength(1);
		});
	});
});
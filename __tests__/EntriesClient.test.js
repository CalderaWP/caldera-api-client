import {EntriesClient} from "../src/EntriesClient";

const formId = 'CF5b197831b60ae';
const entriesCollection = require("./mock-data/entries/CF5b197831b60ae.json");
const entries26 = require("./mock-data/entries/CF5b197831b60ae/26.json");
const entries27 = require("./mock-data/entries/CF5b197831b60ae/27.json");

describe( 'Entries client', () => {
	beforeEach(() => {
		fetch.resetMocks();
	});

	describe( 'Mock data', () => {
		it( 'has the mock data for entries', () => {
			expect( typeof  entriesCollection ).toBe( 'object' );
		});

		it( 'has the right number of mock entries', () => {
			expect( Object.keys(entriesCollection).length ).toBe( 2 );
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

	describe( 'getting entries', () => {

		it( 'Gets entries collection', () => {
			fetch.mockResponseOnce(new Response(JSON.stringify({a:1})));
			const client = new EntriesClient('https://hiroy.club/wp-json/cf-api/v1');
			client.setNonce('aaaa-aa-a');
			client.reqGet(formId).then(  response => {
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

});
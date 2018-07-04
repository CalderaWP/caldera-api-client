//@flow
import {WpClient} from './WpClient';


export class EntriesClient extends WpClient {

	getEntries(formId: string, page: number= 1 ) : Promise<any>{
		return this.reqGet({
			page,
			_wpnonce:this.nonce
		},this.getEntriesEndpoint(formId));
	}

	getEntry(formId: string,entryId: number ): Promise<any>{
		return this.reqGet({
			_wpnonce:this.nonce
		},this.getEntryEndpoint(formId,entryId));
	}

	getEntriesEndpoint(formId: string):string {
		return `entries/${formId}`;
	}

	getEntryEndpoint(formId: string, entryId: number):string {
		return `${this.getEntriesEndpoint(formId)}/${entryId}`;
	}


}
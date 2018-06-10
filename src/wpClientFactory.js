//@flow
import {WpClient} from './WpClient';
import {FormsClient} from './FormsClient';

export function wpClientFactory(wpApiUrl: string, wpApiNonce: string,type: ?string): WpClient{
	let client = new WpClient(wpApiUrl);
	switch( type ){
	case 'forms':
		client = new FormsClient(wpApiUrl);
		break;
	default:
		client = new WpClient(wpApiUrl);
		break;
	}
	client.setNonce(wpApiNonce);
	return client;
}
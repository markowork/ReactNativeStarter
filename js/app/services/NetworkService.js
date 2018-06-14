/**
 * Service to monitor the internet connection
 * @flow
 */
import Service from './Service';

export default class NetworkService extends Service {
    onConnected() {
        console.log('connected to the internet');
    }

    onDisconnected() {
        console.log('disconnected to the internet');
    }
}

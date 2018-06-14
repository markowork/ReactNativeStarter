/**
 * Initialize all services. Services run on the background, performing maintenance tasks.
 * Other parts of the app should NOT communicate with services.
 * Services should NOT depend on other services.
 * Services should have lean initialization (return immediately).
 *
 * @flow
 */

import NetworkService from '../services/NetworkService';

const services = [];

function initialize() {
    services.push(new NetworkService());
}

export default {
    initialize,
};

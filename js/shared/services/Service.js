/**
 * @flow
 */

import { AppState, NetInfo } from 'react-native';

import { AppStateValues } from 'definitions.UI';

import type { AppState as AppStateType } from 'definitions.UI';

export default class Service {
    _currentAppState: ?AppStateType = undefined;
    _isActive: boolean;
    _isConnected: ?boolean;
    _timeLastConnected: ?number;
    _timeLastDisconnected: ?number;
    _timeLastPaused: ?number;
    _timeLastResumed: ?number;

    constructor() {
        AppState.addEventListener('change', this._handleAppStateChange);
        // First status read; we need to wait a bit because it's always false on startup
        setTimeout(() => {
            NetInfo.isConnected.fetch().then(this._handleNetInfoChange);
        }, 250);
        NetInfo.isConnected.addEventListener('connectionChange', this._handleNetInfoChange);

        this._currentAppState = ((AppState.currentState: any): AppStateType);
        this._isActive = this._currentAppState === AppStateValues.active;

        this.start();
        if (this._isActive) this.resume();
    }

    /**
     * Checks the app state, can be one of the following:
     * Active (app is in foreground)
     * Background
     * Inactive
     * Unknown
     */
    _handleAppStateChange = (newAppState: AppStateType) => {
        if (this._currentAppState !== newAppState) {
            this._currentAppState = newAppState;
            const wasActive = this._isActive;
            this._isActive = this._currentAppState === AppStateValues.active;
            if (!wasActive && this._isActive) {
                this._timeLastResumed = Date.now();
                this.resume();
            } else if (wasActive && !this._isActive) {
                this._timeLastPaused = Date.now();
                this.pause();
            }
        }
    };

    /**
     * Checks the app network
     */
    _handleNetInfoChange = (isConnected: boolean) => {
        if (this._isConnected !== isConnected) {
            this._isConnected = isConnected;
            if (isConnected) {
                this._timeLastConnected = Date.now();
                this.onConnected();
            } else {
                // since net info is not working properly with power save mode
                // see https://github.com/facebook/react-native/issues/15729
                // we should also ping google to make sure we are disconnected
                // TODO: remove this once the issue is fixed
                fetch('https://google.com')
                    .then((response) => {
                        if (response.status === 200) {
                            this._timeLastConnected = Date.now();
                            this.onConnected();
                        } else {
                            this._timeLastDisconnected = Date.now();
                            this.onDisconnected();
                        }
                    })
                    .catch(() => {
                        this._timeLastDisconnected = Date.now();
                        this.onDisconnected();
                    });
            }
        }
    }

    isConnected() {
        return this._isConnected;
    }

    isActive() {
        return this._isActive;
    }

    getTimeLastConnected() {
        return this._timeLastConnected;
    }

    getTimeLastDisconnected() {
        return this._timeLastDisconnected;
    }

    getTimeLastResumed() {
        return this._timeLastResumed;
    }

    getTimeLastPaused() {
        return this._timeLastPaused;
    }


    // Extendable interface
    start() {
        // Ran at app start
        // Fill in
    }

    resume() {
        // Ran at app start, and when coming back from background
        // Fill in
    }

    pause() {
        // Ran at app end, and when going to background
        // Fill in
    }

    onConnected() {
        // Connected to the internet
        // Fill in
    }

    onDisconnected() {
        // Disconnected from the internet
        // Fill in
    }
}

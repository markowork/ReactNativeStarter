/**
 * React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import reducers from './js/shared/reducers';
import ServiceInitializer from './js/app/initializers/ServiceInitializer';
import { userDataInitializer } from './js/app/initializers/UserDataInitializer';

import RootNavigator from 'screens.RootNavigator';

type Props = {};
type State = {};

export default class App extends Component<Props, State> {
    componentDidMount() {
        ServiceInitializer.initialize();
        userDataInitializer();
    }

    render() {
        const store = createStore(reducers);
        return (
            <Provider store={ store }>
                <RootNavigator />
            </Provider>
        );
    }
}

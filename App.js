/**
 * React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';

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
        return <RootNavigator />;
    }
}

/**
 * React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

import reducers from './js/shared/reducers';
import ServiceInitializer from './js/app/initializers/ServiceInitializer';
import { userDataInitializer } from './js/app/initializers/UserDataInitializer';

import RootNavigator from 'screens.RootNavigator';

type Props = {};
type State = {};

const client = new ApolloClient({ uri: 'http://localhost:4000/graphql' });

export default class App extends Component<Props, State> {
    componentWillMount() {
        ServiceInitializer.initialize();
        userDataInitializer();
    }

    render() {
        const store = createStore(reducers);
        return (
            <ApolloProvider client={ client }>
                <Provider store={ store }>
                    <RootNavigator />
                </Provider>
            </ApolloProvider>
        );
    }
}

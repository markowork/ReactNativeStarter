/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Button from 'components.Button';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
});

type Props = {};
export default class App extends Component<Props> {
    render() {
        return (
            <View style={ styles.container }>
                <Text style={ styles.welcome }>
                    Welcome to React Native!
                </Text>
                <Button
                    text='batn tekst'
                />
            </View>
        );
    }
}

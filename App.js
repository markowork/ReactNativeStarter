/**
 * React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Icons } from 'Resources';

import Button from 'components.Button';
import SVGImage from 'components.SVGImage';
import DeviceUtils from 'utils.DeviceUtils';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

type Props = {};
export default class App extends Component<Props> {
    render() {
        return (
            <View style={ styles.container }>
                <Text>
                    { DeviceUtils.getDeviceInfo() }
                </Text>
                <Button
                    shouldHavePressDelay={ true }
                    onPress={ () => { console.log('123'); } }
                    text={ 'Example button' }
                />
                <SVGImage svgXmlData={ Icons.example.mastercard } />
            </View>
        );
    }
}

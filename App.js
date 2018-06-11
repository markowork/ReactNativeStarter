/**
 * React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

import { Icons } from 'Resources';

import Button from 'components.Button';
import SVGImage from 'components.SVGImage';

import UserData from 'data.UserData';

import DeviceUtils from 'utils.DeviceUtils';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    customFontFamily: {
        fontFamily: 'GothamRounded-Bold',
    },
});

type Props = {};
type State = {
    userDataExampleFlag: boolean,
};

export default class App extends Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            userDataExampleFlag: false,
        };
    }

    componentDidMount() {
        UserData.read(() => {
            const userDataState = UserData.get();
            if (userDataState) {
                this.setState({
                    userDataExampleFlag: userDataState.exampleFlag,
                });
            }
        });
    }

    render() {
        return (
            <View style={ styles.container }>
                <Text>
                    { DeviceUtils.getDeviceInfo() }
                </Text>
                <Text>
                    {`Persistent data, example flag value: ${String(this.state.userDataExampleFlag)}`}
                </Text>
                <Button
                    shouldHavePressDelay={ true }
                    onPress={ () => { this.togglePersistentDataValue(); } }
                    text={ 'Example button' }
                />
                <Image source={ require('./assets/images/pin_orange.png') } />
                <SVGImage svgXmlData={ Icons.example.mastercard } />
                <Text style={ styles.customFontFamily }> {'Custom font text' } </Text>
            </View>
        );
    }

    togglePersistentDataValue() {
        UserData.set({ exampleFlag: !this.state.userDataExampleFlag }, () => {
            this.setState({ userDataExampleFlag: !this.state.userDataExampleFlag });
        });
    }
}

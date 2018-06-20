/**
 * @providesModule components.Button
 * @flow
 */

import * as React from 'react';
import { StyleSheet, Text, TouchableOpacity, ViewPropTypes } from 'react-native';

import { Colors, Sizes } from 'Resources';
import { iPhoneXStyles } from 'utils.DisplayUtils';
import PressUtils from 'utils.PressUtils';

const styles = StyleSheet.create({
    defaultButton: {
        backgroundColor: Colors.blue,
        padding: Sizes.examplePadding,
        // example of how to add styles only for iPhoneX
        ...iPhoneXStyles({
            backgroundColor: Colors.red,
        }),
    },
    defaultButtonText: {
        color: Colors.white,
        fontSize: Sizes.exampleButtonFontSize,
        letterSpacing: Sizes.exampleButtonLetterSpacing,
        lineHeight: Sizes.exampleButtonLineHeight,
    },
});

type Props = {
    buttonStyle?: ViewPropTypes.style,
    onPress: () => void,
    text: string,
    textStyle?: ViewPropTypes.style,
    shouldHavePressDelay?: boolean,
};

type State = {};

export default class Button extends React.PureComponent<Props, State> {
    constructor(props: Props) {
        super(props);
    }

    render() {
        // merge optional styles that come as props with default ones
        const buttonStyle = [
            styles.defaultButton,
            this.props.buttonStyle,
        ];

        const buttonTextStyle = [
            styles.defaultButtonText,
            this.props.textStyle,
        ];

        return (
            <TouchableOpacity 
                style={ buttonStyle }
                onPress={ () => { this.onPress(); } }
            >
                <Text style={ buttonTextStyle }>
                    { this.props.text }
                </Text>
            </TouchableOpacity>
        );
    }

    /**
     * Calls on each click of a button
     * shouldHavePressDelay prop is optional and is used to prevent double taps
     */
    onPress() {
        if (this.props.onPress) {
            if (this.props.shouldHavePressDelay) {
                PressUtils.pressIfAllowed(() => {
                    this.props.onPress();
                });
            } else {
                this.props.onPress();
            }
        }
    }
}

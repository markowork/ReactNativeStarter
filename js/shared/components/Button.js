/**
 * @providesModule components.Button
 * @flow
 */

import * as React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

// import { Colors, Fonts, Sizes } from 'Resources';
// import PressUtils from 'utils.PressUtils';

// const styles = StyleSheet.create({
//     buttonText: {
//         color: Colors.Themes.DarkBrown.text,
//         textAlign: 'center',
//         backgroundColor: Colors.transparent,
//     },
// });

type Props = {
  text: string,
};

type State = {};

export default class Button extends React.PureComponent<Props, State> {
    constructor(props: Props) {
        super(props);
    }

    render() {
        return (
                <TouchableOpacity>
                <Text>
                    { this.props.text }
                </Text>
            </TouchableOpacity>
        );
    }
}

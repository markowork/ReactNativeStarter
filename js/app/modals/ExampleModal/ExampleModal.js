/**
 * @providesModule modals.ExampleModal
 * @flow
 */

import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Button from 'components.Button';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

type Props = {
  navigation: any,
};
type State = {};

export default class ExampleModal extends React.PureComponent<Props, State> {
    constructor(props: Props) {
        super(props);
    }

    render() {
        return (
            <View style={ styles.container }>
                <Text> Modal </Text>
                <Button
                    shouldHavePressDelay={ true }
                    onPress={ () => { this.goBack(); } }
                    text={ 'Go back' }
                />
            </View>
        );
    }

    goBack() {
        this.props.navigation.goBack();
    }
}

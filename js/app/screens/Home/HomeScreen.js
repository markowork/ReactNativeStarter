/**
 * @providesModule screens.HomeScreen
 * @flow
 */

import * as React from 'react';
import { StyleSheet, View } from 'react-native';

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

export default class HomeScreen extends React.PureComponent<Props, State> {
    constructor(props: Props) {
        super(props);
    }

    render() {
        return (
            <View style={ styles.container }>
                <Button
                    shouldHavePressDelay={ true }
                    onPress={ () => { this.navigateToRoute('ExampleScreen'); } }
                    text={ 'Check the example route!' }
                />
            </View>
        );
    }

    navigateToRoute(routeName: string) {
        this.props.navigation.navigate(routeName);
    }
}

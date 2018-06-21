/**
 * @providesModule screens.ExampleScreen
 * @flow
 */

import * as React from 'react';
import { Image, NativeModules, StyleSheet, ScrollView, Text, View } from 'react-native';
import { connect } from 'react-redux';

import { Icons, Sizes } from 'Resources';

import Button from 'components.Button';
import SVGImage from 'components.SVGImage';
import UserData from 'data.UserData';

import DeviceUtils from 'utils.DeviceUtils';

import { toggleExampleReduxBooleanValue } from 'actions.Example';

const ExampleNativeModule = NativeModules.ExampleNativeModule;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    section: {
        padding: Sizes.examplePadding,
    },
    sectionTitle: {
        fontSize: Sizes.exampleScreenSectionTitle,
        textDecorationLine: 'underline',
    },
    customFontFamily: {
        fontFamily: 'GothamRounded-Bold',
    },
});

type Props = {
    navigation: any,
    exampleValueFromRedux: boolean,
    toggleExampleReduxBooleanValue: any,
};
type State = {
    userDataExampleFlag: boolean,
    reversedString: string,
};

class ExampleScreen extends React.PureComponent<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            userDataExampleFlag: false,
            reversedString: 'example',
        };
    }

    componentDidMount() {
        const userDataState = UserData.get();
        if (userDataState) {
            this.setState({
                userDataExampleFlag: userDataState.exampleFlag,
            });
        }

        ExampleNativeModule.reverseCharacterOrder(this.state.reversedString).then((reversedString: string) => {
            this.setState({ reversedString: reversedString });      
        });
    }

    render() {
        const { navigation } = this.props;
        const textFromRouteParams = navigation.getParam('text', 'defaultValue');

        return (
            <ScrollView style={ styles.container }>
                <Text style={ styles.section }>
                    { textFromRouteParams }
                </Text>
                { this.renderSection('Getting the device info') }
                { this.renderSection('Adding a custom font') }
                { this.renderSection('Adding an image and icons') }
                { this.renderSection('Persistent data') }
                { this.renderSection('Go to modal screen') }
                { this.renderSection('Redux usage') }
                { this.renderSection('Native modules example') }
            </ScrollView>
        );
    }

    renderSection(title: string) {
        return (
            <View style={ styles.section }>
                <Text style={ styles.sectionTitle }>
                    { title }
                </Text>
                { this.getContentBySection(title) }
            </View>
        );
    }

    getContentBySection(section: string) {
        switch (section) {
            case 'Persistent data':
                return (
                    <View>
                        <Text>
                            {`Persistent data, example flag value: ${String(this.state.userDataExampleFlag)}`}
                        </Text>
                        <Button
                            shouldHavePressDelay={ true }
                            onPress={ () => { this.togglePersistentDataValue(); } }
                            text={ 'Toggle persistend data' }
                        />
                    </View>
                );
            case 'Adding an image and icons':
                return (
                    <View>
                        <Text>
                            {'Image as an asset'}
                        </Text>
                        <Image source={ require('../../../../assets/images/pin_orange.png') } />
                        <Text>
                            {'Image as a svg'}
                        </Text>
                        <SVGImage svgXmlData={ Icons.example.mastercard } />
                    </View>
                );
            case 'Getting the device info':
                return (
                    <View>
                        <Text> 
                            { DeviceUtils.getDeviceInfo() }
                        </Text>
                    </View>
                );
        
            case 'Adding a custom font':
                return (
                    <View>
                        <Text style={ styles.customFontFamily }> 
                            {'This is a custom font. More info --> Readme.MD' } 
                        </Text>
                    </View>
                );

            case 'Go to modal screen':
                return (
                    <Button
                        shouldHavePressDelay={ true }
                        onPress={ () => { this.navigateToRoute('ExampleModal'); } }
                        text={ 'Open modal' }
                    />
                );
            case 'Redux usage':
                return (
                    <View>
                        <Text>
                            {`Redux, example value is currenty ${String(this.props.exampleValueFromRedux)}`}
                        </Text>
                        <Button
                            shouldHavePressDelay={ true }
                            onPress={ () => { this.toggleReduxExampleValue(); } }
                            text={ 'Change redux value' }
                        />
                    </View>
                );
            case 'Native modules example':
                return (
                    <View>
                        <Text>
                            {`Native module that takes a string "example" and returns it reversed!\nreturned string: ${this.state.reversedString}`}
                        </Text>
                    </View>
                );
        
            default:
                break;
        }
    }

    navigateToRoute(routeName: string) {
        this.props.navigation.navigate(routeName);
    }

    togglePersistentDataValue() {
        UserData.set({ exampleFlag: !this.state.userDataExampleFlag }, () => {
            this.setState({ userDataExampleFlag: !this.state.userDataExampleFlag });
        });
    }

    toggleReduxExampleValue() {
        this.props.toggleExampleReduxBooleanValue(!this.props.exampleValueFromRedux);
    }
}

const mapStateToProps = state => {
    return {
        exampleValueFromRedux: state.example.exampleBooleanValue,
    };
};

export default connect(mapStateToProps, {
    toggleExampleReduxBooleanValue,
})(ExampleScreen);

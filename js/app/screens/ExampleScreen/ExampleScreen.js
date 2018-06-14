/**
 * @providesModule screens.ExampleScreen
 * @flow
 */

import * as React from 'react';
import { Image, StyleSheet, ScrollView, Text, View } from 'react-native';

import { Icons, Sizes } from 'Resources';

import Button from 'components.Button';
import SVGImage from 'components.SVGImage';
import UserData from 'data.UserData';

import DeviceUtils from 'utils.DeviceUtils';

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

type Props = {};
type State = {
    userDataExampleFlag: boolean,
};

export default class ExampleScreen extends React.PureComponent<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            userDataExampleFlag: false,
        };
    }

    componentDidMount() {
        const userDataState = UserData.get();
        if (userDataState) {
            this.setState({
                userDataExampleFlag: userDataState.exampleFlag,
            });
        }
    }

    render() {
        return (
            <ScrollView style={ styles.container }>
                { this.renderSection('Getting the device info') }
                { this.renderSection('Adding a custom font') }
                { this.renderSection('Adding an image and icons') }
                { this.renderSection('Persistent data') }
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
                            <Image source={ require('../../../../assets/images/pin_orange.png') } />
                        </Text>
                        <Text>
                            {'Image as a svg'}
                            <SVGImage svgXmlData={ Icons.example.mastercard } />
                        </Text>
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
        
            default:
                break;
        }
    }

    togglePersistentDataValue() {
        UserData.set({ exampleFlag: !this.state.userDataExampleFlag }, () => {
            this.setState({ userDataExampleFlag: !this.state.userDataExampleFlag });
        });
    }
}
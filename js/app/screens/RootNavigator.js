/**
 * @providesModule screens.RootNavigator
 * @flow
 */

import { createStackNavigator } from 'react-navigation';

import ExampleScreen from 'screens.ExampleScreen';
import HomeScreen from 'screens.HomeScreen';
import ExampleModal from 'modals.ExampleModal';

const ScreensStack = createStackNavigator(
    {
        ExampleScreen: {
            screen: ExampleScreen,
        },
        HomeScreen: {
            screen: HomeScreen,
        },
    },  
    {
        initialRouteName: 'HomeScreen',
    }
);

const RootNavigator = createStackNavigator(
    {
        Main: {
            screen: ScreensStack,
        },
        ExampleModal: {
            screen: ExampleModal,
        },
    },
    {
        mode: 'modal',
        headerMode: 'none',
    }
);

export default RootNavigator;

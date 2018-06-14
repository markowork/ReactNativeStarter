/**
 * @providesModule screens.RootNavigator
 * @flow
 */

import { createStackNavigator } from 'react-navigation';

import ExampleScreen from 'screens.ExampleScreen';
import HomeScreen from 'screens.HomeScreen';

const RootNavigator = createStackNavigator(
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
    });

export default RootNavigator;

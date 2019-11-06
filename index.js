/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);


/**
 * BuzzBus React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import { StackNavigator, NavigationActions} from 'react-navigation';
import SplashScreen from './src/screens/splash';


const Routes = StackNavigator({
    SplashScreen: {screen:SplashScreen, navigationOptions:{header:true}},
})
AppRegistry.registerComponent(appName, () => Routes);
console.disableYellowBox = false;

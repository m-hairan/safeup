import React from 'react';
import {
  Platform
} from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Splash from '../screens/splash/splash';
import Splash2 from '../screens/splash/splash2';
import Nearby from '../screens/splash/nearby';
import VerifyFacebook from '../screens/home/verifyfacebook';
import Register from '../screens/account/register';
import SelectAge from '../screens/account/select_age';
import SelectGender from '../screens/account/select_gender';
import PhotoCapture from '../screens/account/photo_capture';
import ContactInfo from '../screens/contact/info';
import Terms from '../screens/contact/terms';
import Profile from '../screens/contact/profile';
import Home from '../screens/home/home';
import About from '../screens/menu/about';



const RootStack = createStackNavigator(
  {
    Splash: { screen: Splash ,navigationOptions:{header: null} },
    Splash2: { screen: Splash2 ,navigationOptions:{header: null} },
    Nearby: { screen: Nearby ,navigationOptions:{header: null} },
    VerifyFacebook: { screen: VerifyFacebook ,navigationOptions:{header: null}},
    Register: { screen: Register ,navigationOptions:{header: null}},
    SelectAge: { screen: SelectAge ,navigationOptions:{header: null}},
    SelectGender: { screen: SelectGender ,navigationOptions:{header: null}},
    PhotoCapture: { screen: PhotoCapture ,navigationOptions:{header: null}},
    ContactInfo: { screen: ContactInfo ,navigationOptions:{header: null}},
    Terms: { screen: Terms ,navigationOptions:{header: null}},
    Profile: { screen: Profile ,navigationOptions:{header: null}},
    Home: { screen: Home ,navigationOptions:{header: null}},
    About: { screen: About ,navigationOptions:{header: null}}
    
  },
  { 
    initialRouteName: Platform.OS === 'Android' ? 'Splash' : 'Splash2'
  }
);

const AppNavigator = createAppContainer(RootStack);
export default AppNavigator;


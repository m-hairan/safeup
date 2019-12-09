/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import React, {Component} from 'react';
import AppNavigator from './src/navigation/navigator';
import I18n from 'react-native-i18n';
//import NotifService from './src/service/NotifService';
import PushNotification from 'react-native-push-notification';
import firebase from 'react-native-firebase';
import {
  AsyncStorage,Alert 
} from 'react-native';

import {serviceAddPersonal} from './src/service/api';
import {Config} from './src/doc/config';

console.disableYellowBox = true
export default class App extends Component{
  constructor(props){
    super(props)

    //this.notif = new NotifService(this.onRegister.bind(this), this.onNotification.bind(this));

    // PushNotification.configure({
    //   // (optional) Called when Token is generated (iOS and Android)
    //   onRegister: token => {
    //     console.log("TOKEN:", token);
    //   },
    
    //   // (required) Called when a remote or local notification is opened or received
    //   onNotification: notification => {
    //     console.log("NOTIFICATION:", notification);
    
    //     // process the notification
    
    //     // required on iOS only (see fetchCompletionHandler docs: https://github.com/react-native-community/react-native-push-notification-ios)
    //     notification.finish(PushNotificationIOS.FetchResult.NoData);
    //   },
    
    //   // ANDROID ONLY: GCM or FCM Sender ID (product_number) (optional - not required for local notifications, but is need to receive remote push notifications)
    //   senderID: "198057160299",
    
    //   // IOS ONLY (optional): default: all - Permissions to register.
    //   permissions: {
    //     alert: true,
    //     badge: true,
    //     sound: true
    //   },
    
    //   // Should the initial notification be popped automatically
    //   // default: true
    //   popInitialNotification: true,
    
    //   /**
    //    * (optional) default: true
    //    * - Specified if permissions (ios) and token (android and ios) will requested or not,
    //    * - if not, you must call PushNotificationsHandler.requestPermissions() later
    //    */
    //   requestPermissions: true
    // });
    
  }

  async componentDidMount(){
    global.deviceLocale = I18n.currentLocale();
    
    this.checkPermission();

    this.createNotificationListeners(); //add this line
    //    
  }

  componentWillUnmount() {
    this.notificationListener();
    this.notificationOpenedListener();
  }
  
  async getToken() {
    let fcmToken = await AsyncStorage.getItem('fcmToken');
    console.log("before fcmToken: ", fcmToken);
    if (!fcmToken) {
      fcmToken = await firebase.messaging().getToken();
      if (fcmToken) {
        console.log("after fcmToken: ", fcmToken);
        await AsyncStorage.setItem('fcmToken', fcmToken);
      }
    }
  }
  async requestPermission() {
    firebase.messaging().requestPermission()
      .then(() => {
        this.getToken();
      })
      .catch(error => {
        console.log('permission rejected');
      });
  }
  async checkPermission() {
    firebase.messaging().hasPermission()
      .then(enabled => {
        if (enabled) {
          console.log("Permission granted");
          this.getToken();
        } else {
          console.log("Request Permission");
          this.requestPermission();
        }
      });
  }

  async createNotificationListeners() {
    /*
    * Triggered when a particular notification has been received in foreground
    * */
    this.notificationListener = firebase.notifications().onNotification((notification) => {
        const { title, body, data } = notification;
        let phone = "";
        if(data.additional_data) {
          console.log(JSON.parse(data.additional_data).phone_number);
          phone = JSON.parse(data.additional_data).phone_number;
          this.showAlert(title, body, phone);
        }   
    });
  
    /*
    * If your app is in background, you can listen for when a notification is clicked / tapped / opened as follows:
    * */
    this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {
        const { title, body, data } = notificationOpen.notification;
        let phone = "";
        if(data.additional_data) {
          console.log("backend ");
          phone = JSON.parse(data.additional_data).phone_number;
          //this.showAlert(title, body, phone);
          this.addPersonal(phone);
        }     
    });
  
    /*
    * If your app is closed, you can check if it was opened by a notification being clicked / tapped / opened as follows:
    * */
    const notificationOpen = await firebase.notifications().getInitialNotification();
    if (notificationOpen) {
        const { title, body, data } = notificationOpen.notification;
        phone = JSON.parse(data.additional_data).phone_number;
        //this.showAlert(title, body);
        console.log('Bearer ' + Config.AuthToken);
        this.addPersonal(phone);
    }
    /*
    * Triggered for data only payload in foreground
    * */
    this.messageListener = firebase.messaging().onMessage((message) => {
      //process data message
      console.log(JSON.stringify(message));
    });
  }
  
  showAlert(title, body, phone) {
    Alert.alert(
      title, body,
      [
          { text: 'OK', onPress: () => this.addPersonal(phone) },
      ],
      { cancelable: false },
    );
  }

  addPersonal(phone) {
    serviceAddPersonal(phone).then(res => {
      console.log("Successfully accepted!!");
    }).catch( err => {
      console.log(err);
    });
  }

  render() {
    return (
	    <AppNavigator />
    );
  }
}
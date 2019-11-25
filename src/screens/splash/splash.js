import React, {Component} from 'react';
import {Image,StatusBar, View,Text} from 'react-native';

import Styles from '../../common/style';
import {Config} from '../../doc/config';
import {Globals} from '../../doc/global';
// import DefaultPreference from 'react-native-default-preference';

const { styles } = Styles;

var self= null;
export default class SplashScreen extends Component {
  constructor(props) {
    super(props);    
    self = this;    
  }
  componentDidMount() {    
    setTimeout(() => {
      this.props.navigation.navigate('Splash2');        
    }, 2000);
  }
  
  render() {
    return (
      <View style={[styles.centerScreen,styles.fullScreen,{backgroundColor:'#9723F2'}]}>
        <StatusBar hidden={true} />
        <View style={{alignItems:'center'}}>
            <Image source={require('../../assets/logo.png')}/>
            <Text style={{marginTop:45,color:'#fff',fontSize:18,textAlign:'center',fontWeight:'normal',lineHeight: 16}}>
                Women Personal Safety Network {"\n"}{"\n"}- Find safe zones {"\n"}{"\n"}- Call safe line {"\n"}{"\n"}-Keep safe communities
            </Text>
        </View>
      </View>
    );
  }
}

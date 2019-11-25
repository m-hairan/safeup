import React, {Component} from 'react';
import {Image,StatusBar, View,Text} from 'react-native';

import Styles from '../../common/style';

const { styles } = Styles;

var self= null;
export default class Splash2Screen extends Component {
  constructor(props) {
    super(props);    
    self = this;    
  }
  componentDidMount() {    
    setTimeout(() => {
        this.props.navigation.navigate('Nearby');
    }, 2000);
  }

  render() {
    return (
      <View style={[styles.fullScreen,{backgroundColor:'#9723F2',alignItems:'center'}]}>
        <StatusBar hidden={true} />
        <Image source={require('../../assets/splash_bg.png')} style={{width:'100%',height:'100%'}} resizeMode='stretch' />
        <View style={{position:'absolute',alignItems:'center'}}>
            <Image style={{marginTop:150}} source={require('../../assets/logo.png')}/>
        </View>
      </View>
    );
  }
}

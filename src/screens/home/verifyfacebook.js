import React, {Component} from 'react';
import {Image,StatusBar, View,Text,ScrollView,Animated,TouchableOpacity} from 'react-native';
import Styles from '../../common/style';
import { LoginButton, AccessToken,LoginManager} from 'react-native-fbsdk';


const { styles } = Styles;

var self= null;
export default class VerifyFacebookScreen extends Component {

  constructor(props) {
    super(props);    
    self = this;
    const {state} = props.navigation;
    this.state = {
    };
  }
  componentDidMount() {    
    
  }
  handleFacebookLogin () {
    LoginManager.logInWithPermissions(['public_profile']).then(
      function (result) {
        if (result.isCancelled) {
        } else {
          self.props.navigation.state.params.onComplete('1');
          self.props.navigation.goBack();
        }
      },
      function (error) {
      }
    )
  }
  onWithoutFacebook()
  {
      self.props.navigation.state.params.onComplete('0');
      self.props.navigation.goBack();
      //uncommented by Pascal again
      this.props.navigation.navigate('Register');
  }
  onBack()
  {
      this.props.navigation.goBack();
  }
  
  render() {

    return (
        <View style={[styles.fullScreen,styles.centerHorizontal,{backgroundColor:'#2A3139'}]}>
          <StatusBar hidden={true} />
          <View style={[styles.vwTopBar]}>
                {/* <TouchableOpacity style={{height:50,marginLeft:20,justifyContent:'center'}} onPress={()=> this.onBack()}>
                    <View style={{flexDirection:'row'}}>
                        <Image style={{width:12,height:21}} source={require('../../assets/ic_back.png')}/>
                        <Text style={{marginLeft:10,fontSize:18,color:'#fff'}}>Back</Text>
                    </View>
                </TouchableOpacity> */}
          </View>
          <View style={{justifyContent:'center',flex:1}}>
              <Text style={{color:'#fff',fontSize:20,marginLeft:20,marginRight:20,textAlign:'center'}}>We need to trust each other to help each other. That why all SafeUpers are verifing themselfs.</Text>
              <TouchableOpacity style={[{backgroundColor:'#9723F2',marginTop:150,marginLeft:20,marginRight:20},styles.btn]} onPress={()=> this.handleFacebookLogin()}>
                <Text style={[styles.btnText]}>Verify with Facebock</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[{marginLeft:20,marginTop:20,marginRight:20},styles.btn]} onPress={()=> this.onWithoutFacebook()}>
                <Text style={[styles.btnText]}>Dont have facebook? that’s ok, click here</Text>
              </TouchableOpacity>
          </View>
        </View>
    );
  }
}

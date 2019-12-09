import React, {Component} from 'react';
import {Image,StatusBar, View,Text,TextInput,TouchableOpacity, ScrollView} from 'react-native';
import Styles from '../../common/style';
import { AccessToken} from 'react-native-fbsdk';
import {serviceFacebookDetail} from '../../service/api';
import Modal from "react-native-modal";
import { scale, verticalScale } from '../../common/scale';
// import { ScrollView } from 'react-native-gesture-handler';

const { styles } = Styles;

var self= null;
export default class RegisterScreen extends Component {

  constructor(props) {
    super(props);    
    self = this;
    this.state = {
        isError:false,
        errorMsg:'',
        isFacebook:false,
        first_name:'',
        last_name:''
    };
  }
  componentDidMount() {    
    AccessToken.getCurrentAccessToken().then(
      (data) => {
        self.getFacebookDetail(data.accessToken);
      }
    ).catch(err=>{
      console.warn(err);
    });
  }

  getFacebookDetail(token)
  {
    this.setState({isFacebook:true});
    serviceFacebookDetail(token)
    .then(res=>{
        this.setState({first_name:res.first_name,last_name:res.last_name});
        console.warn(res);
    }).catch(err=>{
        console.warn(err);
    });
  }

  onBack()
  {
    this.props.navigation.goBack();
  }
  onRegister()
  {
    if ((this.state.first_name == '') || (this.state.last_name == ''))
    {
        return;
    }
    this.props.navigation.navigate('SelectAge',
    {
      params :{
        first_name : this.state.first_name,
        last_name : this.state.last_name
      }      
    });//send the first name, last name to the next screen
  }
  render() {

    return (
        <View style={[styles.fullScreen,styles.centerHorizontal,{backgroundColor:'#2A3139'}]}>
          <StatusBar hidden={true} />
          {global.deviceLocale == 'he-IL'?
          <View style={[styles.vwTopBar_he]}>
                <TouchableOpacity style={{height:50,marginLeft:20,justifyContent:'center'}} onPress={()=> this.onBack()}>
                    <View style={{flexDirection:'row'}}>
                        <Text style={{marginLeft:10,fontSize:18,color:'#fff'}}>Back</Text>
                        <Image style={{width:12,height:21, marginLeft:10, marginRight:10, marginTop:3}} source={require('../../assets/ic_back.png')}/>
                    </View>
                </TouchableOpacity>
          </View>
          :
          <View style={[styles.vwTopBar]}>
                <TouchableOpacity style={{height:50,marginLeft:20,justifyContent:'center'}} onPress={()=> this.onBack()}>
                    <View style={{flexDirection:'row'}}>
                        <Image style={{width:12,height:21}} source={require('../../assets/ic_back.png')}/>
                        <Text style={{marginLeft:10,fontSize:18,color:'#fff'}}>Back</Text>
                    </View>
                </TouchableOpacity>
          </View>
          }
          <View style={{justifyContent:'center'}}>
              <ScrollView style={{width:'100%'}}>
                  <View style={{alignItems:'center',justifyContent:'center'}}>
                        <Image source={require('../../assets/register_banner.png')}/>
                  </View>
                  <Text style={{color:'#fff',fontSize:16,marginLeft:20,marginRight:20,marginTop:10, textAlign:'center'}}>No facebook, no worries, we’ll simply verify you with some contacts who know you. it only takes 2 min. {"\n"}{"\n"}how should we call you?</Text>
                  <View style={{marginLeft:20,marginRight:20,marginTop:20}}>
                    <Text style={{fontSize:16,color:'#D19FF8'}}>First Name</Text>
                    <View style={{backgroundColor:'#121518',height:50,marginTop:10,borderRadius:10,paddingLeft:10,paddingRight:10}}>
                        <TextInput style={{color:'rgba(236, 211, 255, 0.63)',flex:1}} value={this.state.first_name} onChangeText={(first_name) => this.setState({first_name})}></TextInput>
                    </View>
                  </View>
                  <View style={{marginLeft:20,marginRight:20,marginTop:20}}>
                    <Text style={{fontSize:16,color:'#D19FF8'}}>Last Name</Text>
                    <View style={{backgroundColor:'#121518',height:50,marginTop:10,borderRadius:10,paddingLeft:10,paddingRight:10}}>
                        <TextInput style={{color:'rgba(236, 211, 255, 0.63)',flex:1}} value={this.state.last_name} onChangeText={(last_name) => this.setState({last_name})}></TextInput>
                    </View>
                  </View>
                  <TouchableOpacity style={[{backgroundColor:'#9723F2',marginTop:50,marginLeft:20,marginRight:20},styles.btn]} onPress={()=> this.onRegister()}>
                    <Text style={[styles.btnText]}>Register</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[{marginLeft:20,marginBottom:30,marginTop:20,marginRight:20},styles.btn]}>
                    <Text style={[styles.btnText]}>{this.state.isFacebook? "Connected with Facebook" : "Connected without Facebook"}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[{backgroundColor: 'rgba(52, 52, 52, 1.0)',marginLeft:20,marginRight:20},styles.btn]}>                    
                  </TouchableOpacity>
              </ScrollView>              
          </View>
          <Modal 
                backdropColor="#000"
                isVisible={this.state.isError}>
                <View style={{ backgroundColor:"#333333",padding:scale(10),borderRadius:scale(10),alignItems:'center',}}>
                    <View style={{marginVertical:verticalScale(0)}}>
                        
                        <Text style={{color:'#FFF',fontSize:scale(18),textAlign:"center",marginVertical:verticalScale(20)}}>
                            {this.state.errorMsg}
                        </Text>
                        <TouchableOpacity 
                        style={{alignSelf:'center'}}
                        onPress={()=>this.setState({
                            isError:false
                        })}>
                            <Text style={{padding:scale(10),textAlign:'center',color:'#fff',fontWeight:'bold'}}> Dismiss </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
  }
}

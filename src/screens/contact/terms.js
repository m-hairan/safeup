import React, {Component} from 'react';
import {Image,StatusBar, View,Text,ScrollView,TouchableOpacity} from 'react-native';
import Styles from '../../common/style';


const { styles } = Styles;

var self= null;
export default class TermsScreen extends Component {

  constructor(props) {
    super(props);    
    self = this;
    const {params} = this.props.navigation.state;
    this.state = {
        isAgree:false,
        //avatarSource : params.params.avatarSource,
        gender : params.params.gender,
        age : params.params.age,
        first_name : params.params.first_name,
        last_name : params.params.last_name
    };
  }
  componentDidMount() {    
        
  }

  onBack()
  {
    this.props.navigation.goBack();
  }
  onAgree()
  {
      let isAgree = (this.state.isAgree + 1) % 2;
      this.setState({isAgree,isAgree});
  }
  onNext()
  {
      if (this.state.isAgree)
        this.props.navigation.navigate('Profile', {
            params: {
                //avatarSource : this.state.avatarSource,
                gender : this.state.gender,
                age : this.state.age,
                first_name : this.state.first_name,
                last_name : this.state.last_name
            }            
        });
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
          <View style={{justifyContent:'center',flex:1,alignItems:'center'}}>
              <ScrollView>
                  <View>
                        {global.deviceLocale == 'he-IL'?
                        <Text style={{color:'#fff',fontSize:20,marginLeft:20,marginRight:20,marginTop:30,marginBottom:20,textAlign:'right'}}>We hope this helps you to understand our privacy commitments to you. For further clarification of the terms of the terms used in this Policy.
Please visit our Privacy Center on spotify.com For information on how to contact use if you ever have any questions or concerns, please see the 'How to Contact Us' Section 14 below.
Alternatively, if you do not agree with the content of this Policy, then please remember it is your choice whether you want to use the Spotify Service.</Text>
                        :
                        <Text style={{color:'#fff',fontSize:20,marginLeft:20,marginRight:20,marginTop:30,marginBottom:20,textAlign:'left'}}>We hope this helps you to understand our privacy commitments to you. For further clarification of the terms of the terms used in this Policy.
Please visit our Privacy Center on spotify.com For information on how to contact use if you ever have any questions or concerns, please see the 'How to Contact Us' Section 14 below.
Alternatively, if you do not agree with the content of this Policy, then please remember it is your choice whether you want to use the Spotify Service.</Text>
                        }
                        <TouchableOpacity style={{marginLeft:20,marginRight:20,marginTop:10}} onPress={()=> this.onAgree()}>
                            {global.deviceLocale == 'he-IL'?
                            <View style={{flexDirection:'row-reverse',alignItems:'center'}}>
                                <View style={[!this.state.isAgree?styles.btnAgreeOff:styles.btnAgreeOn]}>
                                    <Image style={{width:15,height:15,position:'absolute', marginLeft:10}} source={require('../../assets/ic_check.png')}/>
                                </View>
                                <Text style={{marginLeft:10, marginRight:10,color:'#fff',fontSize:20}}>Check to Allow Privacy Policy</Text>
                            </View>
                            :
                            <View style={{flexDirection:'row',alignItems:'center'}}>
                                <View style={[!this.state.isAgree?styles.btnAgreeOff:styles.btnAgreeOn]}>
                                    <Image style={{width:15,height:15,position:'absolute'}} source={require('../../assets/ic_check.png')}/>
                                </View>
                                <Text style={{marginLeft:10,color:'#fff',fontSize:20}}>Check to Allow Privacy Policy</Text>
                            </View>
                            }
                        </TouchableOpacity>
                  </View>
              </ScrollView> 
              <TouchableOpacity style={[{backgroundColor:'#9723F2',flexDirection:'row',marginTop:50,marginBottom:50,marginLeft:20,marginRight:20},styles.btn]} onPress={()=> this.onNext()}>
                <Text style={[styles.btnText]}>Next</Text>
              </TouchableOpacity>
          </View>
        </View>
    );
  }
}

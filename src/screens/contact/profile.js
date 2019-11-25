import React, {Component} from 'react';
import {Image,StatusBar, View,Text,TextInput,TouchableOpacity} from 'react-native';
import Styles from '../../common/style';


const { styles } = Styles;

var self= null;
export default class ProfileScreen extends Component {

  constructor(props) {
    super(props);    
    self = this;
    this.state = {
        isAgree:false
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
    this.props.navigation.navigate('Home');
  }
  render() {

    return (
        <View style={[styles.fullScreen,styles.centerHorizontal,{backgroundColor:'#2A3139'}]}>
          <StatusBar hidden={true} />
          <View style={[styles.vwTopBar]}>
                <TouchableOpacity style={{height:50,marginLeft:20,justifyContent:'center'}} onPress={()=> this.onBack()}>
                    <View style={{flexDirection:'row'}}>
                        <Image style={{width:12,height:21}} source={require('../../assets/ic_back.png')}/>
                        <Text style={{marginLeft:10,fontSize:18,color:'#fff'}}>Back</Text>
                    </View>
                </TouchableOpacity>
          </View>
          <View style={{flex:1,alignItems:'center'}}>
              <Text style={{color:'#fff',fontSize:26,fontWeight:'bold',marginLeft:20,marginRight:20,textAlign:'center'}}>Please check the below {"\n"}Looks correct? {"\n"}Great, click next! </Text>
              <Image resizeMethod="stretch" style={{padding:20,marginTop:50,width:90,height:90,borderRadius:45,backgroundColor:'#2A292B',borderWidth:2,borderColor:'#CB9CF0'}}source={require('../../assets/ic_profile_placeholder.png')}/>
              <View style={{alignItems:'center',marginTop:10,flexDirection:'row'}}>
                <View style={{flex:1}}>
                  <View style={{marginLeft:20,marginRight:20,marginTop:20}}>
                      <Text style={{fontSize:16,color:'#D19FF8'}}>First Name</Text>
                      <View style={{backgroundColor:'#121518',height:50,marginTop:10,borderRadius:10,paddingLeft:10,paddingRight:10}}>
                          <TextInput style={{color:'rgba(236, 211, 255, 0.63)',flex:1}}></TextInput>
                      </View>
                  </View>
                  <View style={{marginLeft:20,marginRight:20,marginTop:20}}>
                      <Text style={{fontSize:16,color:'#D19FF8'}}>Last Name</Text>
                      <View style={{backgroundColor:'#121518',height:50,marginTop:10,borderRadius:10,paddingLeft:10,paddingRight:10}}>
                          <TextInput style={{color:'rgba(236, 211, 255, 0.63)',flex:1}}></TextInput>
                      </View>
                  </View>
                  <View style={{marginLeft:20,marginRight:20,marginTop:20}}>
                      <Text style={{fontSize:16,color:'#D19FF8'}}>Age</Text>
                      <View style={{backgroundColor:'#121518',height:50,marginTop:10,borderRadius:10,paddingLeft:10,paddingRight:10}}>
                          <TextInput style={{color:'rgba(236, 211, 255, 0.63)',flex:1}}></TextInput>
                      </View>
                  </View>
                  <View style={{marginLeft:20,marginRight:20,marginTop:20}}>
                      <Text style={{fontSize:16,color:'#D19FF8'}}>Gender</Text>
                      <View style={{backgroundColor:'#121518',height:50,marginTop:10,borderRadius:10,paddingLeft:10,paddingRight:10}}>
                          <TextInput style={{color:'rgba(236, 211, 255, 0.63)',flex:1}}></TextInput>
                      </View>
                  </View>
                </View>
              </View>
              <TouchableOpacity style={[{backgroundColor:'#9723F2',flexDirection:'row',marginTop:50,marginBottom:50,marginLeft:20,marginRight:20},styles.btn]} onPress={()=> this.onNext()}>
                <Text style={[styles.btnText]}>Next</Text>
              </TouchableOpacity>
              
          </View>
        </View>
    );
  }
}

import React, {Component} from 'react';
import {Image,StatusBar, View,Text,TextInput,TouchableOpacity, ScrollView} from 'react-native';
import Styles from '../../common/style';
import {serviceProfileUpdate} from '../../service/api';


const { styles } = Styles;

var self= null;
export default class ProfileScreen extends Component {

  constructor(props) {
    super(props);    
    self = this;
    const {params} = this.props.navigation.state;
    this.state = {
        isAgree:false,
        //avatarSource : params.params.avatarSource,
        gender : params.params.gender == 2 ? "femail":"male",
        gender_post : params.params.gender,//for real post 
        age : params.params.age == 1 ? "I'm 18+" : "Under 18",
        age_post : params.params.age,//for real post 
        first_name : params.params.first_name,
        last_name : params.params.last_name
    };
    console.log(this.state.avatarSource+"..."+this.state.gender+"..."+this.state.age+"..."+this.state.first_name+"..."+this.state.last_name);    
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
    serviceProfileUpdate(this.state.first_name, this.state.last_name, this.state.gender_post, this.state.age_post)
    .then(res=>{
        //store the phone number and user name
        global.phoneNum = res.user.phoneNumber;
        global.fName = res.user.first_name;
        global.lName = res.user.last_name;
        //
        this.props.navigation.navigate('Home');
        console.warn(res);
    }).catch(err=>{
        console.warn(err);
    });
    // this.props.navigation.navigate('Home');
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
          
          <ScrollView style={{width: "100%"}}>
            <View style={{flex:1,alignItems:'center'}}>
              <Text style={{color:'#fff',fontSize:26,fontWeight:'bold',marginLeft:20,marginRight:20,textAlign:'center'}}>Please check the below {"\n"}Looks correct? {"\n"}Great, click next! </Text>
              <Image resizeMode="stretch" style={{padding:20,marginTop:50,width:90,height:90,borderRadius:45,backgroundColor:'#2A292B',borderWidth:2,borderColor:'#CB9CF0'}}source={require('../../assets/ic_profile_placeholder.png')}/>
              <View style={{alignItems:'center',marginTop:10,flexDirection:'row'}}>
                <View style={{flex:1}}>
                  <View style={{marginLeft:20,marginRight:20,marginTop:20}}>
                      <Text style={{fontSize:16,color:'#D19FF8'}}>First Name</Text>
                      <View style={{backgroundColor:'#121518',height:50,marginTop:10,borderRadius:10,paddingLeft:10,paddingRight:10}}>
                          <TextInput editable={false} style={{color:'rgba(236, 211, 255, 0.63)',flex:1}} value={this.state.first_name}></TextInput>
                      </View>
                  </View>
                  <View style={{marginLeft:20,marginRight:20,marginTop:20}}>
                      <Text style={{fontSize:16,color:'#D19FF8'}}>Last Name</Text>
                      <View style={{backgroundColor:'#121518',height:50,marginTop:10,borderRadius:10,paddingLeft:10,paddingRight:10}}>
                          <TextInput editable={false} style={{color:'rgba(236, 211, 255, 0.63)',flex:1}} value={this.state.last_name}></TextInput>
                      </View>
                  </View>
                  <View style={{marginLeft:20,marginRight:20,marginTop:20}}>
                      <Text style={{fontSize:16,color:'#D19FF8'}}>Age</Text>
                      <View style={{backgroundColor:'#121518',height:50,marginTop:10,borderRadius:10,paddingLeft:10,paddingRight:10}}>
                          <TextInput editable={false} style={{color:'rgba(236, 211, 255, 0.63)',flex:1}} value={this.state.age}></TextInput>
                      </View>
                  </View>
                  <View style={{marginLeft:20,marginRight:20,marginTop:20}}>
                      <Text style={{fontSize:16,color:'#D19FF8'}}>Gender</Text>
                      <View style={{backgroundColor:'#121518',height:50,marginTop:10,borderRadius:10,paddingLeft:10,paddingRight:10}}>
                          <TextInput editable={false} style={{color:'rgba(236, 211, 255, 0.63)',flex:1}} value={this.state.gender}></TextInput>
                      </View>
                  </View>
                </View>
              </View>
              <TouchableOpacity style={[{backgroundColor:'#9723F2',flexDirection:'row',marginTop:50,marginBottom:50,marginLeft:20,marginRight:20},styles.btn]} onPress={()=> this.onNext()}>
                <Text style={[styles.btnText]}>Next</Text>
              </TouchableOpacity>                    
            </View>
          </ScrollView>
        </View>
    );
  }
}

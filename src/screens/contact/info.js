import React, {Component} from 'react';
import {Image,StatusBar, View,Text,TextInput,Animated,TouchableOpacity} from 'react-native';
import Styles from '../../common/style';

import { PermissionsAndroid } from 'react-native';
// import Contacts from 'react-native-contacts';


const { styles } = Styles;

var self= null;
export default class ContactInfoScreen extends Component {

  constructor(props) {
    super(props);    
    self = this;
    const {params} = this.props.navigation.state;
    this.state = {
      //avatarSource : params.params.avatarSource,
      gender : params.params.gender,
      age : params.params.age,
      first_name : params.params.first_name,
      last_name : params.params.last_name
    };
    console.log("Terms111............"+this.state.avatarSource);
  }
  componentDidMount() { 
    //For ios
    // Contacts.getAll((err, contacts) => {
    //   if (err) {
    //     throw err;
    //   }
    //   // contacts returned
    // })
    //For android   
    PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
      {
        'title': 'Contacts',
        'message': 'This app would like to view your contacts.'
      }
    ).then(() => {
      Contacts.getAll((err, contacts) => {
        if (err === 'denied'){
          // error
        } else {
          // contacts returned in Array
        }
      })
    })
  }

  onBack()
  {
    this.props.navigation.goBack();
  }
  
  onNext()
  {
    console.log("Terms............"+this.state.avatarSource);
    this.props.navigation.navigate('Terms', 
    {
      params : {
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
              <Text style={{color:'#fff',fontSize:20,marginLeft:20,marginRight:20,marginTop:30,marginBottom:20,textAlign:'center'}}>Our community is built on trust. As you don’t have Facebook, Your contacts who are allready SafeUPers will recommend you.</Text>
              <Text style={{color:'#fff',fontSize:20,marginLeft:20,marginRight:20,marginTop:80,marginBottom:20,textAlign:'center'}}>Tell us who to contant by allowing the the access. We will not share this information.</Text>
              <TouchableOpacity style={[{backgroundColor:'#9723F2',flexDirection:'row',marginTop:40,marginLeft:20,marginRight:20},styles.btn]} onPress={()=> this.onNext()}>
                <Text style={[styles.btnText]}>Next</Text>
              </TouchableOpacity>
          </View>
        </View>
    );
  }
}

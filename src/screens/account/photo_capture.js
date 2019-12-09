import React, {Component} from 'react';
import {Image,StatusBar, View,Text,TextInput,Animated,TouchableOpacity} from 'react-native';
import Styles from '../../common/style';
import ImagePicker from 'react-native-image-picker';

import {servicePhotoUpload} from '../../service/api';


const { styles } = Styles;

var self= null;
export default class PhotoCaptureScreen extends Component {

  constructor(props) {
    super(props);    
    self = this;
    const {params} = this.props.navigation.state;
    this.state = {
      avatarSource:require('../../assets/ic_profile_placeholder.png'),
      gender:params.params.gender,
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
  
  onNext()
  {
      this.props.navigation.navigate('ContactInfo', 
      {
        params :{
          //avatarSource : this.state.avatarSource.source.uri,
          gender : this.state.gender,
          age : this.state.age,
          first_name : this.state.first_name,
          last_name : this.state.last_name
        }
      });
  }

  onImageUpload = async () => {
    try {
      var options = {
        title: 'Select Avatar',        
        storageOptions: {
          skipBackup: true,
          path: 'images'
        }
      };
      await ImagePicker.showImagePicker(options, (response) => {
        console.log('Response = ', response);
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
        } else {
          console.log("uploading");
          // this.uploadImage(response.uri, response.type)
          //   .then(url => {
          //   this.setState({ avatarSource: url}) })
          //   .catch(error => console.log(error))
          const source = { uri: response.uri };
          console.log("photo......."+response.uri);
          this.setState({ avatarSource: source});

          servicePhotoUpload(response.uri, response.fileName, response.type).then(res => {
            console.log("Successfully uploaded!");
            global.photo = res.file;
          }).catch(err=>{
            console.warn(err);
          });
        }
      });
    } catch (err) {
      console.log('onImageUpload error:' + err.message);
      alert('Upload image error:' + err.message);
    }
  };

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
              <TouchableOpacity style={{width:'100%'}} onPress={this.onImageUpload}>
                    <Image style={{width:300,height:300,borderRadius:150,backgroundColor:'#2A292B',borderWidth:2,borderColor:'#CB9CF0'}} source={this.state.avatarSource}/>
              </TouchableOpacity>
              <Text style={{color:'#fff',fontSize:20,marginLeft:20,marginRight:20,marginTop:40,marginBottom:20,textAlign:'center'}}>We help each other. {"\n"}Please take a selfie, so other women will know it’s you.</Text>
              <TouchableOpacity style={[{backgroundColor:'#9723F2',flexDirection:'row',marginTop:20,marginLeft:20,marginRight:20},styles.btn]} onPress={()=> this.onNext()}>
                <Text style={[styles.btnText]}>Next</Text>
              </TouchableOpacity>
          </View>
        </View>
    );
  }
}

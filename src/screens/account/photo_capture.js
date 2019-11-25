import React, {Component} from 'react';
import {Image,StatusBar, View,Text,TextInput,Animated,TouchableOpacity} from 'react-native';
import Styles from '../../common/style';


const { styles } = Styles;

var self= null;
export default class PhotoCaptureScreen extends Component {

  constructor(props) {
    super(props);    
    self = this;
    this.state = {
        
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
      this.props.navigation.navigate('ContactInfo');
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
          <View style={{justifyContent:'center',flex:1,alignItems:'center'}}>
              <View style={{width:'100%'}}>
                    <Image resizeMethod="stretch" style={{padding:20,width:300,height:300,borderRadius:150,backgroundColor:'#2A292B',borderWidth:2,borderColor:'#CB9CF0'}}source={require('../../assets/ic_profile_placeholder.png')}/>
              </View>
              <Text style={{color:'#fff',fontSize:20,marginLeft:20,marginRight:20,marginTop:100,marginBottom:20,textAlign:'center'}}>We help each other. {"\n"}Please take a selfie, so other women will know it’s you.</Text>
              <TouchableOpacity style={[{backgroundColor:'#9723F2',flexDirection:'row',marginTop:50,marginLeft:20,marginRight:20},styles.btn]} onPress={()=> this.onNext()}>
                <Text style={[styles.btnText]}>Next</Text>
              </TouchableOpacity>
          </View>
        </View>
    );
  }
}

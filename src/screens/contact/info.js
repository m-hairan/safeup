import React, {Component} from 'react';
import {Image,StatusBar, View,Text,TextInput,Animated,TouchableOpacity} from 'react-native';
import Styles from '../../common/style';


const { styles } = Styles;

var self= null;
export default class ContactInfoScreen extends Component {

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
    this.props.navigation.navigate('Terms');
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
              <Text style={{color:'#fff',fontSize:20,marginLeft:20,marginRight:20,marginTop:100,marginBottom:20,textAlign:'center'}}>Our community is built on trust. As you don’t have Facebook, Your contacts who are allready SafeUPers will recommend you.</Text>
              <Text style={{color:'#fff',fontSize:20,marginLeft:20,marginRight:20,marginTop:100,marginBottom:20,textAlign:'center'}}>Tell us who to contant by allowing the the access. We will not share this information.</Text>
              <TouchableOpacity style={[{backgroundColor:'#9723F2',flexDirection:'row',marginTop:50,marginLeft:20,marginRight:20},styles.btn]} onPress={()=> this.onNext()}>
                <Text style={[styles.btnText]}>Next</Text>
              </TouchableOpacity>
          </View>
        </View>
    );
  }
}

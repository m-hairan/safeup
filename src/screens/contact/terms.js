import React, {Component} from 'react';
import {Image,StatusBar, View,Text,ScrollView,TouchableOpacity} from 'react-native';
import Styles from '../../common/style';


const { styles } = Styles;

var self= null;
export default class TermsScreen extends Component {

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
      if (this.state.isAgree)
        this.props.navigation.navigate('Profile');
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
              <ScrollView>
                  <View>
                        <Text style={{color:'#fff',fontSize:20,marginLeft:20,marginRight:20,marginTop:100,marginBottom:20,textAlign:'center'}}>Our community is built on trust. As you don’t have Facebook, Your contacts who are allready SafeUPers will recommend you.</Text>
                        <TouchableOpacity style={{marginLeft:20,marginRight:20,marginTop:10}} onPress={()=> this.onAgree()}>
                            <View style={{flexDirection:'row',alignItems:'center'}}>
                                <View style={[!this.state.isAgree?styles.btnAgreeOff:styles.btnAgreeOn]}>
                                    <Image style={{width:15,height:15,position:'absolute'}} source={require('../../assets/ic_check.png')}/>
                                </View>
                                <Text style={{marginLeft:10,color:'#fff',fontSize:20}}>Check to Allow Privacy Policy</Text>
                            </View>
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

import React, {Component} from 'react';
import {Image,StatusBar, View,Text,TextInput,Animated,TouchableOpacity} from 'react-native';
import Styles from '../../common/style';


const { styles } = Styles;

var self= null;
export default class SelectAgeScreen extends Component {

  constructor(props) {
    super(props);    
    self = this;
    const {params} = this.props.navigation.state;
    this.state = {
        age:0,
        isShowSelectAge : true,
        first_name : params.params.first_name,
        last_name : params.params.last_name 
    };
    //console.log("firstname_lastname:"+params.params.first_name+","+params.params.last_name)
  }
  componentDidMount() {    
        
  }

  onBack()
  {
    this.props.navigation.goBack();
  }
  onSelectAge(mode)
  {
      this.setState({age:mode});
  }
  onNext()
  {
      if (this.state.age > 0)
      {
          this.props.navigation.navigate('SelectGender', 
          {
            params :{
              age : this.state.age,
              first_name : this.state.first_name,
              last_name : this.state.last_name
            }
          });//send the parames
      }
      // if (this.state.age > 0 && this.state.isShowSelectAge)
      // {
      //       this.setState({isShowSelectAge:false});
      // }
      // else if (this.state.age > 0 && !this.state.isShowSelectAge)
      // {
      //       this.props.navigation.navigate('SelectGender');
      // }
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
          <View style={{justifyContent:'center',flex:1}}>
              <Text style={{color:'#fff',fontSize:26,fontWeight:'bold',marginLeft:20,marginRight:20,textAlign:'center'}}>Hey</Text>
              <Text style={{color:'#fff',fontSize:20,marginLeft:20,marginRight:20,marginTop:10,marginBottom:20,textAlign:'center'}}>As a SafeUPer who is an adult, you are allowed to help other women. Not yet 18 years old? no worries, you can still call others to help you. {"\n"}{"\n"}Are you over 18 yours old?</Text>
              {
                  this.state.isShowSelectAge?
                  <View style={{marginLeft:20,marginRight:20,flexDirection:'row'}}>
                    <TouchableOpacity style={[{flex:1},this.state.age == 1 ? styles.btnToggleOn : styles.btnToggle,styles.btn]} onPress={()=> this.onSelectAge(1)}>
                        <Text style={[styles.btnText]}>Yes, I’m 18+</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[{flex:1,},this.state.age == 2 ? styles.btnToggleOn : styles.btnToggle,styles.btn]} onPress={()=> this.onSelectAge(2)}>
                        <Text style={[styles.btnText]}>Still under 18</Text>
                    </TouchableOpacity>
                </View>
                :null
              }
              
              <TouchableOpacity style={[{backgroundColor:'#9723F2',marginTop:50,marginLeft:20,marginRight:20},styles.btn]} onPress={()=> this.onNext()}>
                <Text style={[styles.btnText]}>Next</Text>
              </TouchableOpacity>
              
          </View>
        </View>
    );
  }
}

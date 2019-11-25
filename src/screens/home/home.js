import React, {Component} from 'react';
import {Image,StatusBar, View,Text,ScrollView,Animated,TouchableOpacity} from 'react-native';
import Styles from '../../common/style';
import VerifyCompleteDialog from '../../component/dialog/verify_complete'
import ChooseGuardianDialog from '../../component/dialog/choose_guardian'
import HelpDialog from '../../component/dialog/help_dialog'
import DemoDialog from '../../component/dialog/demo_dialog'
import ActivateDialog from '../../component/dialog/activate_dialog'
import MapView,{PROVIDER_GOOGLE} from 'react-native-maps';
import {mapStyle} from '../../common/style';


const { styles } = Styles;

var self= null;
export default class HomeScreen extends Component {

  constructor(props) {
    super(props);    
    self = this;
    this.radarWidth = new Animated.Value(50);
    this.radarHeight = new Animated.Value(50);
    this.radarRadius = new Animated.Value(25);
    this.radarOpacity = new Animated.Value(0.7);
    this.state = {
        isShowVerificationComplete: false,
        isShowSelectGuardian: false,
        isHelp:false,
        isDemo:false,
        isActivate:false
    };
  }
  componentDidMount() {    
        this.animateSearch();
        setTimeout(() => {
            // this.props.navigation.navigate('Nearby');
            this.setState({isShowVerificationComplete:true});
        }, 2000);
  }

  goVerification()
  {
    //this.props.navigation.navigate('Nearby');
    this.setState({isShowVerifyPhone:true});
    //console.warn('aa');
  }
  goSelectDialog()
  {
    this.setState({isShowVerificationComplete:false,isShowSelectGuardian:true});
  }
  openSelectGuard()
  {
    this.setState({isShowSelectGuardian:false});
    //this.props.navigation.navigate('Contacts');
  }
  openHelp()
  {
    this.setState({isHelp:true});
  }
  goHelp()
  {
    this.setState({isHelp:false,isDemo:true});
  }
  goDemo()
  {
    this.setState({isDemo:false});
  }
  demoOpen()
  {
    this.setState({isDemo:false,isActivate:true});
  }
  demoCancel()
  {
    this.setState({isDemo:false});
  }
  animateSearch()
  {
        this.radarWidth.setValue(50);
        this.radarHeight.setValue(50);
        this.radarRadius.setValue(25);
        this.radarOpacity.setValue(0.7);
        Animated.parallel([
            Animated.timing(this.radarWidth, {
                toValue: 100,
                duration: 1000
            }),
            Animated.timing(this.radarHeight, {
                toValue: 100,
                duration: 1000
            }),
            Animated.timing(this.radarRadius, {
                toValue: 100,
                duration: 1000
            }),
            Animated.timing(this.radarOpacity, {
                toValue: 0,
                duration: 1000
            }),
        ]).start(() => this.animateSearch());
        
  }
  
  render() {

    return (
        <View style={[styles.fullScreen,styles.centerHorizontal]}>
          <StatusBar hidden={true} />
          <MapView
                customMapStyle={mapStyle}
                style={{width:'100%',height:'100%'}} 
                provider={PROVIDER_GOOGLE}
                initialRegion={{
                latitude: 37.78825,
                longitude: -122.4324,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
                }}
          />
          <Image source={require('../../assets/splash_bg.png')} style={{width:'100%',height:'100%'}} resizeMode='stretch' />
          <View style={[styles.fullScreen,{position:'absolute',width:'100%',height:'100%'}]}>
                <View style={[styles.bottomRadius,{backgroundColor:'#2A3139',height:240,padding:20}]}>
                        <Text style={{color:'#fff',fontSize:16,lineHeight:19,marginTop:10,fontWeight:'normal',textAlign:'center'}}>23 Guardian are near you your zone is </Text>
                        <View style={{flexDirection:'row',marginTop:20}}>
                            <View style={[styles.photoContainer,styles.photoSize,{marginRight:10}]} >
                                <Image style={{width:'100%',height:'100%'}} source={require('../../assets/placeholder.png')}/>
                            </View>
                            <View style={[styles.photoContainer,styles.photoSize]} >
                                <Image style={{width:'100%',height:'100%'}} source={require('../../assets/placeholder.png')}/>
                            </View>
                        </View>
                        <View>
                            <View style={{flexDirection:'row',alignItems:'center',marginTop:20}}>
                                <Text style={{flex:1,color:'#fff',fontSize:16,fontWeight:'normal',flex:1}}>Call safe-walk conference line </Text>
                                <TouchableOpacity>
                                    <View style={{flexDirection:'row',borderRadius:15,backgroundColor:'#1BB92B',width:100,height:36,justifyContent:'center',alignItems:'center'}}>
                                        <Image style={{}} source={require('../../assets/ic_phone_on.png')}/>
                                        <Text style={{marginLeft:10,color:'#fff'}}>Join Call</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <View style={{flexDirection:'row',alignItems:'center',marginTop:10}}>
                                <Text style={{flex:1,color:'#fff',fontSize:16,fontWeight:'normal',flex:1}}>Share my location with my guardians </Text>
                                <TouchableOpacity>
                                    <View style={{flexDirection:'row',borderRadius:15,backgroundColor:'#495159',width:100,height:36}}>
                                        <View style={{backgroundColor:'#2A3139',position:'absolute',width:50,height:32,borderRadius:15,marginLeft:2,marginTop:2}}></View>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                </View>
                <View style={[styles.centerScreen,styles.fullScreen]}>
                    <View style={[styles.centerScreen,{width:300,height:300}]}>
                        <Animated.View
                            style={{position:'absolute',opacity:this.radarOpacity,width:this.radarWidth,height:this.radarHeight,borderRadius:this.radarRadius,backgroundColor:'#9723F2'}}
                        />
                        <View style={[styles.photoContainer,styles.photoSize]} >
                            <Image style={{width:'100%',height:'100%'}} source={require('../../assets/placeholder.png')}/>
                        </View>
                    </View>
                </View>
                <View style={{position:'absolute',top:0,height:'100%',width:'100%',alignItems:'center'}}>
                    <TouchableOpacity  style={{position:'absolute',bottom:100,width:350}} onPress={()=> this.openHelp()}>
                        <View style={[styles.btn,{backgroundColor:'#9723F2',flexDirection:'row',borderRadius:30}]}>
                            <View style={[{backgroundColor:'#771ADD',width:30,height:30,borderRadius:15},styles.centerScreen]}>
                                <Image style={{width:10,height:15}} source={require('../../assets/ic_play.png')}/>
                            </View>
                            <Text style={[styles.btnText]}>Swipe for Help NOW</Text>
                        </View>
                    </TouchableOpacity>
                </View>
          </View>
          {
              this.state.isShowVerificationComplete?
              <VerifyCompleteDialog onNext={this.goSelectDialog.bind(this)} />
              :
              null
          }
          {
              this.state.isShowSelectGuardian?
              <ChooseGuardianDialog onNext={this.openSelectGuard.bind(this)}/>
              :
              null
          }
          {
              this.state.isHelp?
              <HelpDialog onNext={this.goHelp.bind(this)}/>
              :
              null
          }
          {
              this.state.isDemo?
              <DemoDialog onNext={this.demoOpen.bind(this)} onCancel={this.demoCancel.bind(this)}/>:
              null
          }
          {
              this.state.isActivate?
              <ActivateDialog/>:
              null
          }
        </View>
    );
  }
}

import React, {Component} from 'react';
import {Image,ActivityIndicator,StatusBar, View,Text,ScrollView,Animated,TouchableOpacity} from 'react-native';
import Styles from '../../common/style';
import VerifyDialog from '../../component/dialog/verify_dialog'
import VerifyPhoneDialog from '../../component/dialog/verify_phone_dialog'
import VerifyDialogFb from '../../component/dialog/verify_dialog_fb'
import { scale, verticalScale } from '../../common/scale';
import {Config} from '../../doc/config';
import {Globals} from '../../doc/global';
import {activateLoader,stopLoader} from '../../common/utils';
import {serviceGetNearbyGuards,serviceRegister,serviceConfirmCode} from '../../service/api';
import DefaultPreference from 'react-native-default-preference';
import Modal from "react-native-modal";
import MapView,{PROVIDER_GOOGLE} from 'react-native-maps';
import {mapStyle} from '../../common/style';
import Geolocation from '@react-native-community/geolocation';

const { styles } = Styles;

var self= null;
export default class NearbyScreen extends Component {

  constructor(props) {
    super(props);    
    self = this;
    this.radarWidth = new Animated.Value(100);
    this.radarHeight = new Animated.Value(100);
    this.radarRadius = new Animated.Value(50);
    this.radarOpacity = new Animated.Value(0.7);
    this.nearbyGuardians = [];
    this.state = {
        loading:false,
        isError:false,
        errorMsg:'',
        nearbyGuardiansFound : [],
        isShowVerifyPhone: false,
        isShowVerifyAlert:false,
        isShowVerifyFb:false,
        latitude:0.0,
        longitude:0.0,
        phone:''
    };
  }
  componentDidMount() {
    Geolocation.getCurrentPosition(info => this.setState({latitude:info.coords.latitude,longitude:info.coords.longitude}));
    //Geolocation.getCurrentPosition(info => this.setState({latitude:43,longitude:120}));
    this.animateSearch();
    DefaultPreference.getMultiple(['phone','token','smscode']).then(function(values) 
    {         
        if (values == null || values[0] == null)
        {   
            self.setState({isShowVerifyPhone:true});
        }
        else{
            Config.AuthToken = values[1];
            Globals.smsCode = values[2];
            self.setState({phone:values[0]});
            self.loadNearbyGuards(values[0]);
        }
    })
    .catch(err=>{});
  }

  checkRegister(phone = '')
  {
    serviceRegister(phone)
    .then(res=>{ 
        
    }).catch(err=>{
        this.setState({isShowVerifyAlert:true});
    });
  }
  loadNearbyGuards(phone='')
  {
    serviceGetNearbyGuards(phone)
    .then(res=>{ 
        this.nearbyGuardians = res.nearby_guardians;
        this.animateRadarCount();
        this.goFacebook();
    }).catch(err=>{
        console.warn(err);
        serviceConfirmCode(phone,Globals.smsCode)
        .then(res=>{ 
            let token = res.token;
            Globals.smsCode = smscode;
            DefaultPreference.setMultiple({phone:phone,token:token,smscode:smscode}).then(function(values) 
            {
                self.setState({isShowVerifyPhone:false});
                self.goFacebook();
            })
            .catch(err=>{
                
            });

        }).catch(err=>{

        });
    });
  }


  goVerification(phone)
  {
    //checkRegister
    //this.props.navigation.navigate('Nearby');
    //this.setState({isShowVerifyPhone:true});
    //console.warn('aa');
  }
  onVerifyPhone(phone,smscode)
  {
    activateLoader(this,"Checking Sms Code");
    serviceConfirmCode(phone,smscode)
    .then(res=>{ 
        stopLoader(this);
        let token = res.token;
        Globals.smsCode = smscode;
        DefaultPreference.setMultiple({phone:phone,token:token,smscode:smscode}).then(function(values) 
        {
            self.setState({isShowVerifyPhone:false});
            self.goFacebook();
        })
        .catch(err=>{
            
        });

    }).catch(err=>{
        stopLoader(this);
        this.setState({isError:true,errorMsg:'Sms code Invalid'});
    });

  }
  goFacebook()
  {
        DefaultPreference.getMultiple(['facebook','first']).then(function(values) 
        {       
            if (values[0] == null)  
            {
                self.props.navigation.navigate('VerifyFacebook',{onComplete: (isVerify) => self.completeFacebook(isVerify)});
            }
            else if (values[1] == null)
            {
                self.props.navigation.navigate('Register');
            }
            
        })
        .catch(err=>{});
  }

  completeFacebook(isVerify)
  {
      DefaultPreference.set('facebook',isVerify).then(function(values){});
  }
  animateRadarCount()
  {
    this.timer = setInterval(() => {
        if (this.state.nearbyGuardiansFound.length == this.nearbyGuardians.length)
            clearInterval(this.timer)
        else
        {
            let guards = this.state.nearbyGuardiansFound;
            guards.push(this.nearbyGuardians[guards.length]);
            this.setState({nearbyGuardiansFound:guards});
        }
    }, 1000);
  }
  animateSearch()
  {
        this.radarWidth.setValue(100);
        this.radarHeight.setValue(100);
        this.radarRadius.setValue(50);
        this.radarOpacity.setValue(0.7);
        Animated.parallel([
            Animated.timing(this.radarWidth, {
                toValue: 300,
                duration: 1500
            }),
            Animated.timing(this.radarHeight, {
                toValue: 300,
                duration: 1500
            }),
            Animated.timing(this.radarRadius, {
                toValue: 150,
                duration: 1500
            }),
            Animated.timing(this.radarOpacity, {
                toValue: 0,
                duration: 1500
            }),
        ]).start(() => this.animateSearch());
  }
  
  render() {

    return (
        <View style={[styles.fullScreen,styles.centerHorizontal]}>
            {
                this.state.loading == true &&
                <View style={styles.loading}>
                    <View style={styles.loaderView}>
                        <ActivityIndicator color="#fff" style={styles.activityIndicator}/>
                        <Text style={styles.loadingText}>{this.state.loadingText}</Text>
                    </View>
                </View>
            }
          <StatusBar hidden={true} />
          <MapView
                customMapStyle={mapStyle}
                style={{width:'100%',height:'100%'}} 
                provider={PROVIDER_GOOGLE}
                initialRegion={{
                latitude: this.state.latitude,
                longitude: this.state.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
                }}
          />
          {/* <Image source={require('../../assets/splash_bg.png')} style={{width:'100%',height:'100%'}} resizeMode='stretch' /> */}
          <View style={[styles.fullScreen,{position:'absolute',width:'100%',height:'100%'}]}>
                <View style={[styles.bottomRadius,styles.centerHorizontal,{backgroundColor:'#2A3139',height:240,padding:20}]}>
                        <Text style={{color:'#fff',fontSize:24,lineHeight:28,marginTop:40,fontWeight:'bold',textAlign:'center'}}>Finding your nearest guardians now.</Text>
                        <Text style={{color:'#fff',fontSize:16,lineHeight:19,marginTop:10,fontWeight:'normal',textAlign:'center'}}>{this.state.nearbyGuardiansFound.length} Guardian are near you your zone is </Text>
                        <ScrollView horizontal = {true} style={{marginTop:20,width:'100%'}}>
                            <View style={{flexDirection:'row'}}>
                                {
                                    this.state.nearbyGuardiansFound.map((value, index) => (
                                        <View style={[styles.photoContainer,styles.photoSize,{marginLeft:10}]} >
                                            <Image style={{width:'100%',height:'100%'}} source={{ uri: value.photo}}/>
                                        </View>
                                    ))
                                }
                                
                            </View>
                        </ScrollView>
                </View>
                {
                    !this.state.isShowVerifyAlert ? 
                    <View style={[styles.centerScreen,styles.fullScreen]}>
                        <View style={[styles.centerScreen,{width:300,height:300}]}>
                            <Animated.View
                                style={{position:'absolute',opacity:this.radarOpacity,width:this.radarWidth,height:this.radarHeight,borderRadius:this.radarRadius,backgroundColor:'#9723F2'}}
                            />
                            <View style={[styles.centerScreen,{position:'absolute',width:100,height:100,borderRadius:50,backgroundColor:'#9723F2'}]}>
                                <Text style={{color:'#fff',fontSize:30,fontWeight:'bold'}}>{this.state.nearbyGuardiansFound.length}</Text>
                            </View>
                        </View>
                    </View> : 
                    null
                }
          </View>
          {
            this.state.isShowVerifyAlert?
            <VerifyDialog onNext={this.goVerification.bind(this)} />:
            null
          }
          {
              this.state.isShowVerifyPhone ? 
              <View style={{position:'absolute',width:'100%',height:'100%'}}>
                  <View style={{width:'100%',height:'100%',backgroundColor:'rgba(0, 0, 0, 0.8)',position:'absolute'}}></View>
                  <VerifyPhoneDialog onNext={(suffix,phone) => this.onVerifyPhone.bind(this,suffix,phone)}/>
              </View>
              :
              null
          }
          {
              this.state.isShowVerifyFb ? 
              <VerifyDialogFb onNext={this.goFacebook.bind(this)} style={{zIndex:99999}} />:
              null
          }
            <Modal 
                backdropColor="#000"
                isVisible={this.state.isError}>
                <View style={{ backgroundColor:"#333333",padding:scale(10),borderRadius:scale(10),alignItems:'center',}}>
                    <View style={{marginVertical:verticalScale(0)}}>
                        
                        <Text style={{color:'#FFF',fontSize:scale(18),textAlign:"center",marginVertical:verticalScale(20)}}>
                            {this.state.errorMsg}
                        </Text>
                        <TouchableOpacity 
                        style={{alignSelf:'center'}}
                        onPress={()=>this.setState({
                            isError:false
                        })}>
                            <Text style={{padding:scale(10),textAlign:'center',color:'#fff',fontWeight:'bold'}}> Dismiss </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
  }
}

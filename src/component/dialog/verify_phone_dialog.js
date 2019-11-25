import React, { Component } from 'react';
import {Linking,Animated,Text,View,TouchableOpacity,TextInput} from 'react-native';
import { scale, verticalScale } from '../../common/scale';
import Styles from '../../common/style';
import {activateLoader,stopLoader} from '../../common/utils';
import CountryPicker from 'react-native-country-picker-modal';
import Modal from "react-native-modal";
import {serviceRegister,serviceGetLocationInfo} from '../../service/api';

const { styles } = Styles;
var self= null;
class VerifyPhoneDialog extends Component {

    constructor(props) {
        super(props)
        self = this;
        var inputCode;
        this.vwTop = new Animated.Value(-400);
        this.state = {
            loading:false,
            enterCode: false,
            spinner: false,
            countryCode : 'AX',
            phoneCode : '44',
            isError:false,
            errorMsg:'',
            isSmsSent:false,
            smscode:'',
            phone:'',
            countDown:59
        };
    }
    shouldComponentUpdate(nextProps) {
        return nextProps.items !== this.props.items
    }

    componentDidMount() {    
        this.dropDownView();
        this.checkLocation();
    }

    checkLocation()
    {
        serviceGetLocationInfo()
        .then(res=>{
            let phoneCode = res.country_calling_code.substr(1);
            this.setState({countryCode:res.country,phoneCode:phoneCode});
            this.forceUpdate();
        }).catch(err=>{

        });
    }
    startCountDown()
    {
        this.setState({countDown:59});
        this.timer = setInterval(() => {
            if (this.state.countDown == 0)
                clearInterval(this.timer)
            else
            {
                this.setState({countDown:this.state.countDown - 1});
                this.forceUpdate();
            }
        }, 1000);
    }
    dropDownView()
    {
        this.vwTop.setValue(-400);
        Animated.parallel([
            Animated.timing(this.vwTop, {
                toValue: 0,
                duration: 1000
            })
        ]).start();
    }
    onSendSms()
    {
        
        if (this.state.phone == '')
        {
            this.setState({isError:true,errorMsg:'Please fill phone number'});
            this.forceUpdate();
            return;
        }
        if (this.state.phone.length < 9)
        {
            this.setState({isError:true,errorMsg:'Phone number should be at least 9 digits'});
            this.forceUpdate();
            return;
        }
        serviceRegister("+" + this.state.phoneCode + this.state.phone)
        .then(res=>{ 
            console.warn(res);
            this.setState({isSmsSent:true});
            this.startCountDown();
            this.forceUpdate();
        }).catch(err=>{
            //this.setState({isSmsSent:true});    
            //this.setState({isShowVerifyAlert:true});
        });
    }
    sendAgain()
    {
        clearInterval(this.timer)
        serviceRegister("+" + this.state.phoneCode + this.state.phone)
        .then(res=>{ 
            console.warn(res);
            this.setState({isSmsSent:true});
            this.startCountDown();
            this.forceUpdate();
        }).catch(err=>{
            //this.setState({isSmsSent:true});    
            //this.setState({isShowVerifyAlert:true});
        });
    }
    onSelectCountry(country)
    {
        self.setState({countryCode:country['cca2'],phoneCode:country['callingCode']});
        this.forceUpdate();
    }
    onChangePhone()
    {
        clearInterval(this.timer)
        this.setState({isSmsSent:false});
        this.forceUpdate();
    }
    closeErrorDialog()
    {
        self.setState({isError:false});
        this.forceUpdate();
    }
    onClickPrivacy()
    {
        Linking.canOpenURL("http://safeup.co/privacy-policy/").then(supported => {
            if (supported) {
              Linking.openURL("http://safeup.co/privacy-policy/");
            } else {
              console.log("Don't know how to open URI: " + this.props.url);
            }
        });
    }

    render() {
        return (
            <Animated.View style={[{position:'absolute',backgroundColor:'#2A3139',width:'100%',height:400,marginTop:this.vwTop},styles.bottomRadius]}>
                {
                    !this.state.isSmsSent?
                    <View>
                        <Text style={{color:'#fff',fontSize:24,lineHeight:28,marginTop:40,fontWeight:'bold',textAlign:'center'}}>Great ! We found many near by guardians and safe zones</Text>
                        <Text style={{color:'#fff',fontSize:16,lineHeight:19,marginTop:10,fontWeight:'normal',textAlign:'center'}}>To know their locations please verifiy your mobile number</Text>
                        <View style={{flexDirection:'row',backgroundColor:'#fff',marginLeft:20,marginRight:20,marginTop:50,borderRadius:10,height:50,alignItems:'center',paddingLeft:15,paddingRight:15}}>
                            <CountryPicker
                                ref={'countryPicker'}
                                closeable
                                style={{marginLeft:0}}
                                countryCode={this.state.countryCode}
                                withCallingCode = {true}
                                onSelect = {(country) => this.onSelectCountry(country)}
                                // styles={countryPickerCustomStyles}
                                translation='eng'/>
                            <Text>+{this.state.phoneCode}</Text>
                            <TextInput  keyboardType="phone-pad" style={{flex:1,height:40,marginLeft:5}} onChangeText={(text) => this.setState({phone:text})}></TextInput>
                        </View>
                        <TouchableOpacity style={[{backgroundColor:'#9723F2',marginTop:30,marginLeft:20,marginRight:20},styles.btn]} onPress={()=> this.onSendSms()}>
                            <Text style={[styles.btnText]}>NEXT</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[{marginTop:25}]} onPress={()=> this.onClickPrivacy()}>
                        <Text style={{color:'#FFFFFF',width:'100%',textAlign:'center',fontWeight:'300',fontSize:12}}>By continueing you agree to Terms of your and Privacy policy </Text>
                        </TouchableOpacity>
                    </View> :
                    <View>
                        <Text style={{color:'#fff',fontSize:24,lineHeight:28,marginTop:40,fontWeight:'bold',textAlign:'center'}}>Verifcation code </Text>
                        <Text style={{color:'#fff',fontSize:16,lineHeight:19,marginTop:10,fontWeight:'normal',textAlign:'center'}}>A verification codes has been sent to {this.state.phoneCode + this.state.phone}</Text>
                        <View style={{flexDirection:'row',backgroundColor:'#fff',marginLeft:20,marginRight:20,marginTop:50,borderRadius:10,height:80,alignItems:'center',justifyContent:'center',paddingLeft:15,paddingRight:15}}>
                            <Text style={{fontSize:25}}>S U</Text>
                            <View>
                                <TextInput maxLength={6} ref={ref => this.inputCode = ref} keyboardType="phone-pad" style={[styles.inputSms,{width:100,textAlign:'center'}]} onChangeText={(text) => this.setState({smscode:text})}></TextInput>
                                <View style={{height:1,backgroundColor:'#000',width:100,marginLeft:5}}></View>
                            </View>
                            
                        </View>
                        <TouchableOpacity style={[{backgroundColor:'#9723F2',marginTop:30,marginLeft:20,marginRight:20},styles.btn]} onPress={this.props.onNext("+" + this.state.phoneCode + this.state.phone,this.state.smscode)}>
                            <Text style={[styles.btnText]}>NEXT</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{marginLeft:20,marginTop:15,marginRight:20}} onPress={()=> this.sendAgain()}>
                            <Text style={{color:'#fff',textAlign:'center'}}>Send Again OTP {this.state.countDown}s</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{marginLeft:20,marginTop:15,marginRight:20}} onPress={()=> this.onChangePhone()}>
                            <Text style={{color:'#fff',textAlign:'center'}}>Change Phone Number</Text>
                        </TouchableOpacity>
                    </View>
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
                            onPress={()=>self.closeErrorDialog()}>
                                <Text style={{padding:scale(10),textAlign:'center',color:'#fff',fontWeight:'bold'}}> Dismiss </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </Animated.View>
        );
    }
}

export default VerifyPhoneDialog

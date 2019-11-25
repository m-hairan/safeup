import React, { Component } from 'react';
import {Animated,Text,View,TouchableOpacity,TextInput,Image} from 'react-native';
import Styles from '../../common/style';
import MenuGuardian from '../view/menu_guardian'
import LogoutDialog from '../dialog/logout_dialog'
import DeleteAccountDialog from '../dialog/deleteaccount_dialog'

const { styles } = Styles;
var self= null;
class ActivateDialog extends Component {

    constructor(props) {
        super(props)
        self = this;
        this.vwTop = new Animated.Value(-400);
        this.state = {
            enterCode: false,
            spinner: false,
            countryCode : 'AX',
            phoneCode : '1',
            isSmsSent:false,
            isMenuOpen:false,
            isLogout:false,
            isDelete:false
        };
    }
    shouldComponentUpdate(nextProps) {
        return nextProps.items !== this.props.items
    }

    componentDidMount() {    
        this.dropDownView();
    }

    dropDownView()
    {
        this.vwTop.setValue(-350);
        Animated.parallel([
            Animated.timing(this.vwTop, {
                toValue: 0,
                duration: 1000
            })
        ]).start();
    }
    onSendSms()
    {
        this.setState({isSmsSent:true});
        this.forceUpdate();
    }
    onSelectCountry(country)
    {
        self.setState({countryCode:country['cca2'],phoneCode:country['callingCode']});
        this.forceUpdate();
    }
    openMenu()
    {
        this.setState({isMenuOpen:true})
        this.forceUpdate();
    }
    logout()
    {
        this.setState({isLogout:true})
        this.forceUpdate();
    }
    about()
    {
        //this.props.navigation.navigate('About');
    }
    delete()
    {
        this.setState({isDelete:true})
        this.forceUpdate();
    }
    goLogout()
    {
        this.setState({isLogout:false})
        this.forceUpdate();
    }
    goDeleteAccount()
    {
        this.setState({isDelete:false})
        this.forceUpdate();
    }


    render() {
        return (
            <View style={{position:'absolute',width:'100%',height:'100%'}}>
                <Animated.View style={[{position:'absolute',backgroundColor:'#2A3139',width:'100%',height:350,marginTop:this.vwTop,borderRadius:20}]}>
                    <View>
                        <View style={{backgroundColor:'#9C4450',height:30,borderTopRightRadius:10,borderTopLeftRadius:10,justifyContent:'center'}}>
                            <Text style={{color:'#fff',fontSize:20,fontWeight:'bold',textAlign:'center'}}>HELP NOW ACTIVATED</Text>
                        </View>
                        <Text style={{color:'#FE5B5B',fontSize:18,fontWeight:'bold',marginTop:10,textAlign:'center'}}>23 Guardian Alerted.</Text>
                        <View style={{flexDirection:'row'}}>
                            <TouchableOpacity style={{flex:1}} onPress={()=> this.openMenu()}>
                                <View style={[styles.centerScreen]}>
                                    <Image resizeMethod="stretch" style={{padding:20,marginTop:10,width:90,height:90,borderRadius:45,backgroundColor:'#2A292B',borderWidth:2,borderColor:'#CB9CF0'}}source={require('../../assets/ic_profile_placeholder.png')}/>
                                    <Text style={{marginTop:10,color:'#fff'}}>Wating</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity style={{flex:1}} onPress={()=> this.openMenu()}>
                                <View style={[styles.centerScreen]}>
                                    <Image resizeMethod="stretch" style={{padding:20,marginTop:10,width:90,height:90,borderRadius:45,backgroundColor:'#2A292B',borderWidth:2,borderColor:'#CB9CF0'}}source={require('../../assets/ic_profile_placeholder.png')}/>
                                    <Text style={{marginTop:10,color:'#fff'}}>Wating</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity style={{flex:1}} onPress={()=> this.openMenu()}>
                                <View style={[styles.centerScreen]}>
                                    <Image resizeMethod="stretch" style={{padding:20,marginTop:10,width:90,height:90,borderRadius:45,backgroundColor:'#2A292B',borderWidth:2,borderColor:'#CB9CF0'}}source={require('../../assets/ic_profile_placeholder.png')}/>
                                    <Text style={{marginTop:10,color:'#fff'}}>Wating</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={{backgroundColor:'#000',marginLeft:30,marginRight:30,height:2,marginTop:20}}></View>
                        <View style={{flexDirection:'row',alignItems:'center',marginTop:10}}>
                            <Image resizeMethod="stretch" style={{marginLeft:20,width:20,height:20}}source={require('../../assets/ic_phone_on.png')}/>
                            <Text style={{marginLeft:10,color:'#fff',flex:1}}>Call safe-line conference line</Text>
                            <TouchableOpacity>
                                <View style={{width:100,height:30,marginRight:20,backgroundColor:'#FF4F72',borderRadius:15,flexDirection:'row',alignItems:'center'}}>
                                    <Image resizeMethod="stretch" style={{marginLeft:10,width:20,height:20}}source={require('../../assets/ic_phone.png')}/>
                                    <View style={[{backgroundColor:'#9A273E',height:20,marginLeft:10,flex:1,marginRight:10,borderRadius:10},styles.centerScreen]}>
                                        <Text style={{color:'#fff',textAlign:'center',fontSize:10,fontWeight:'bold'}}>00:03</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={{flexDirection:'row',alignItems:'center',marginTop:10}}>
                            <Image resizeMethod="stretch" style={{marginLeft:20,width:18,height:20}}source={require('../../assets/ic_shield.png')}/>
                            <Text style={{marginLeft:10,color:'#fff',flex:1}}>Share my location with my guardians</Text>
                            <TouchableOpacity>
                                <View style={{width:100,height:30,marginRight:20,backgroundColor:'#C987FD',borderRadius:15,flexDirection:'row',alignItems:'center'}}>
                                    <Image resizeMethod="stretch" style={{marginLeft:10,width:20,height:20}}source={require('../../assets/ic_shield_off.png')}/>
                                    <View style={[{backgroundColor:'#9723F2',height:20,marginLeft:10,flex:1,marginRight:10,borderRadius:10},styles.centerScreen]}>
                                        <Text style={{color:'#fff',textAlign:'center',fontSize:10,fontWeight:'bold'}}>Shared</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={{flexDirection:'row',alignItems:'center',marginTop:10}}>
                            <Image resizeMethod="stretch" style={{marginLeft:20,width:20,height:12}}source={require('../../assets/ic_camera.png')}/>
                            <Text style={{marginLeft:10,color:'#fff',flex:1}}>Video share live</Text>
                            <TouchableOpacity>
                                <View style={{width:100,height:30,marginRight:20,backgroundColor:'#FF4F72',borderRadius:15,flexDirection:'row',alignItems:'center'}}>
                                    <Image resizeMethod="stretch" style={{marginLeft:10,width:20,height:20}}source={require('../../assets/ic_camera_off.png')}/>
                                    <View style={[{backgroundColor:'#9A273E',height:20,marginLeft:10,flex:1,marginRight:10,borderRadius:10},styles.centerScreen]}>
                                        <Text style={{color:'#fff',textAlign:'center',fontSize:10,fontWeight:'bold'}}>REC</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Animated.View>

                <Animated.View style={[{position:'absolute',backgroundColor:'rgba(42, 49, 57, 0.8)',width:'100%',left:0,height:300,bottom:0,marginBottom:this.vwTop},styles.bottomRadius]}>
                    <View>
                        <TouchableOpacity  style={{marginLeft:20,marginRight:20,marginTop:20}} onPress={()=> this.openHelp()}>
                            <View style={[styles.btn,{backgroundColor:'#C987FD',flexDirection:'row',borderRadius:10}]}>
                                <Text style={[styles.btnText]}>Add My Guardians</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity  style={{marginLeft:20,marginRight:10,marginTop:20}} onPress={()=> this.openHelp()}>
                            <View style={[styles.btn,{backgroundColor:'#64CAFF',flexDirection:'row',borderRadius:10}]}>
                                <Text style={[styles.btnText]}>Call Police</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </Animated.View>

                {
                    this.state.isMenuOpen?
                    <MenuGuardian onLogout={this.logout.bind(this)} onDelete={this.delete.bind(this)} onAbout={this.about.bind(this)} />:
                    null
                }
                {
                    this.state.isLogout?
                    <LogoutDialog onNext={this.goLogout.bind(this)}/>:
                    null
                }
                {
                    this.state.isDelete?
                    <DeleteAccountDialog onNext={this.goDeleteAccount.bind(this)}/>:
                    null
                }
            </View>
        );
    }
}

export default ActivateDialog

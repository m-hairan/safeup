import React, { Component } from 'react';
import {Animated,Text,View,TouchableOpacity,Image} from 'react-native';
import Styles from '../../common/style';


const { styles } = Styles;
var self= null;
class MenuGuardian extends Component {

    constructor(props) {
        super(props)
        self = this;
        this.vwTop = new Animated.Value(-350);
        this.state = {
            enterCode: false,
            spinner: false,
            countryCode : 'AX',
            phoneCode : '1',
            isSmsSent:false
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

    render() {
        return (
            <Animated.View style={[{position:'absolute',backgroundColor:'#2A3139',width:350,height:'100%',marginLeft:this.vwTop}]}>
                <View>
                    <TouchableOpacity style={{position:'absolute',right:20,top:20}} onPress={()=> this.props.onClose()}>
                        <Image style={{width:20,height:20}} source={require('../../assets/ic_close.png')}/>
                    </TouchableOpacity>
                    <View style={{marginTop:30,flexDirection:'row',alignItems:'center'}}>
                        <Image resizeMode="stretch" style={{marginLeft:20,width:90,height:90,borderRadius:45,backgroundColor:'#2A292B',borderWidth:2,borderColor:'#CB9CF0'}} source={global.photo}/>
                        <View style={{flex:1,justifyContent:'center',marginLeft:20}}>
                            <Text style={{color:'#fff'}}>{global.fName} {global.lName}</Text>
                            <Text style={{color:'#fff',marginTop:10}}>{global.phoneNum}</Text>
                        </View>
                    </View>
                    <View style={{backgroundColor:'#fff',marginLeft:30,marginRight:30,height:2,marginTop:20}}></View>
                    <View style={{marginTop:20,marginLeft:30,marginRight:30}}>
                        <TouchableOpacity>
                            <View style={{flexDirection:'row',alignItems:'center'}}>
                                <Text style={{color:'#fff',flex:1}}>Invite a friend</Text>
                                <TouchableOpacity style={{marginLeft:10}}>
                                    <View style={{width:80,height:30,backgroundColor:'#9723F2',borderRadius:15,flexDirection:'row',alignItems:'center'}}>
                                        <Image resizeMode="stretch" style={{marginLeft:10,width:20,height:20}}source={require('../../assets/ic_share.png')}/>
                                        <Text style={{flex:1,color:'#fff',textAlign:'center',fontSize:10,fontWeight:'bold'}}>Invite</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={{marginTop:10,height:40}}>
                            <View style={{flexDirection:'row',alignItems:'center'}}>
                                <Text style={{color:'#fff',flex:1}}>Be a Guardian</Text>
                                <TouchableOpacity style={{marginLeft:10}}>
                                    <View style={{width:80,height:30,backgroundColor:'#495159',borderRadius:15,flexDirection:'row',alignItems:'center'}}>
                                        <View style={[{backgroundColor:'#2A3139',height:20,marginLeft:10,width:40,marginRight:10,borderRadius:10},styles.centerScreen]}>
                                            
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={{marginTop:10,height:40}}>
                            <View style={{flexDirection:'row',alignItems:'center'}}>
                                <Text style={{color:'#fff',flex:1}}>My Personal Guardians </Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={{marginTop:10,height:40}} onPress={()=> this.props.onAbout()}>
                            <View style={{flexDirection:'row',alignItems:'center'}}>
                                <Text style={{color:'#fff',flex:1}}>About us</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={{marginTop:10,height:40}} onPress={()=> this.props.onLogout()}>
                            <View style={{flexDirection:'row',alignItems:'center'}}>
                                <Text style={{color:'#fff',flex:1}}>Log out</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={{marginTop:10,height:40}} onPress={()=> this.props.onDelete()}>
                            <View style={{flexDirection:'row',alignItems:'center'}}>
                                <Text style={{color:'#fff',flex:1}}>Delete my account</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </Animated.View>
        );
    }
}

export default MenuGuardian

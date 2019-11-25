import React, { Component } from 'react';
import { Text,View,TouchableOpacity} from 'react-native';
import Styles from '../../common/style';

const { styles } = Styles;

class VerifyDialogFb extends Component {

    constructor(props) {
        super(props)
        this.state = {
            refreshing: false,
        }
    }
    shouldComponentUpdate(nextProps) {
        return nextProps.items !== this.props.items
    }

    render() {
        return (
            <View style={[{position:'absolute',width:'100%',height:'100%'},styles.centerScreen]}>
                <View style={{backgroundColor:'rgba(0,0,0,0.8)',position:'absolute',width:'100%',height:'100%'}}>

                </View>
                <View style={{padding:20}}>
                    <Text style={{color:'#fff',textAlign:'center',fontSize:18,lineHeight:26}}>Your zone is high/mid/low safefy </Text>
                    <View style={{flexDirection:'row',justifyContent:'center',marginTop:10}}>
                        <View style={[styles.textWarning,{backgroundColor:'#777777'}]}>
                            <Text style={{color:'#fff'}}>Safe</Text>
                        </View>
                        <View style={[styles.textWarning,{backgroundColor:'#EC8E37'}]}>
                            <Text style={{color:'#fff'}}>Not sure</Text>
                        </View>
                        <View style={[styles.textWarning,{backgroundColor:'#D83865'}]}>
                            <Text style={{color:'#fff'}}>Dangerous</Text>
                        </View>
                    </View>
                    <Text style={{color:'#fff',marginTop:20,textAlign:'center',fontSize:18,lineHeight:26}}>Let’s get you protected. Complete your verification so other women can trust you</Text>
                    
                    <TouchableOpacity style={[{marginTop:200,backgroundColor:'#9723F2'},styles.btn]} onPress={()=> this.props.onNext()}>
                        <Text style={[styles.btnText]}>NEXT</Text>
                    </TouchableOpacity>
              </View>
            </View>
        );
    }
}

export default VerifyDialogFb

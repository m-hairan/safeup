import React, { Component } from 'react';
import { Text,View,TouchableOpacity} from 'react-native';
import Styles from '../../common/style';

const { styles } = Styles;

class LogoutDialog extends Component {

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
            <View style={[{position:'absolute',backgroundColor:'rgba(0, 0, 0, 0.8)',width:'100%',height:'100%'},styles.centerScreen]}>
                <View style={{padding:20,backgroundColor:'#2A3139',borderRadius:10}}>
                    <Text style={{color:'#fff',textAlign:'center',fontSize:18,lineHeight:26,marginTop:10}}>Are you sure you Wanna Log out?</Text>
                    <TouchableOpacity style={[{marginTop:20,backgroundColor:'#9723F2'},styles.btn]} onPress={()=> this.props.onNext()}>
                        <Text style={[styles.btnText]}>Not Now</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[{marginTop:10,backgroundColor:'#F55959'},styles.btn]} onPress={()=> this.props.onNext()}>
                        <Text style={[styles.btnText]}>Log Out</Text>
                    </TouchableOpacity>
              </View>
            </View>
        );
    }
}

export default LogoutDialog

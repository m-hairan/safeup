import React, { Component } from 'react';
import { Text,View,TouchableOpacity} from 'react-native';
import Styles from '../../common/style';

const { styles } = Styles;

class VerifyDialog extends Component {

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
                <View style={{padding:20}}>
                    <Text style={{color:'#fff',textAlign:'center',fontSize:18,lineHeight:26}}>To find your nearst guardians tell us where you are. please approve location permission</Text>
                    <TouchableOpacity style={[{marginTop:200,backgroundColor:'#9723F2'},styles.btn]} onPress={()=> this.props.onNext()}>
                        <Text style={[styles.btnText]}>NEXT</Text>
                    </TouchableOpacity>
              </View>
            </View>
        );
    }
}

export default VerifyDialog

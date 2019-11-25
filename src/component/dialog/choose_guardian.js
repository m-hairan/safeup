import React, { Component } from 'react';
import { Text,View,TouchableOpacity} from 'react-native';
import Styles from '../../common/style';

const { styles } = Styles;

class ChooseGuardianDialog extends Component {

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
                    <Text style={{color:'#fff',textAlign:'center',fontSize:18,lineHeight:26,marginTop:10}}>My Guardians is a list of your friend and family.{"\n"} You can share your location with them at any time, so they’ll know you’re fine {"\n"}(or when help is needed)</Text>
                    <TouchableOpacity style={[{marginTop:200,backgroundColor:'#9723F2'},styles.btn]} onPress={()=> this.props.onNext()}>
                        <Text style={[styles.btnText]}>Choose My Guardians</Text>
                    </TouchableOpacity>
              </View>
            </View>
        );
    }
}

export default ChooseGuardianDialog

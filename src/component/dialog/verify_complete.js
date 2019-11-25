import React, { Component } from 'react';
import { Text,View,TouchableOpacity} from 'react-native';
import Styles from '../../common/style';

const { styles } = Styles;

class VerifyCompleteDialog extends Component {

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
                    <Text style={{color:'#fff',fontSize:24,fontWeight:'bold',textAlign:'center'}}>Verification process</Text>
                    <Text style={{color:'#fff',textAlign:'center',fontSize:18,lineHeight:26,marginTop:10}}>How to start? {"\n"}Safe-Walk phone guardians is here for you 24/7, whenever you fill tiny bit unsafe, or just want to have a talk. {"\n"}While you get peace of mind, our technology also will monitor your situation and if needed call near by women to help you.</Text>
                    <TouchableOpacity style={[{marginTop:200,backgroundColor:'#9723F2'},styles.btn]} onPress={()=> this.props.onNext()}>
                        <Text style={[styles.btnText]}>Try Safe line now, it’s free</Text>
                    </TouchableOpacity>
              </View>
            </View>
        );
    }
}

export default VerifyCompleteDialog

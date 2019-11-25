import React, { Component } from 'react';
import { Text,View,TouchableOpacity} from 'react-native';
import Styles from '../../common/style';

const { styles } = Styles;

class DemoDialog extends Component {

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
                    <Text style={{color:'#fff',textAlign:'center',fontSize:18,lineHeight:26,marginTop:10}}>Just in case the swipe, was a mistake, there are 5 second to cancel it. Afterwards, the near by guardians will close it, once they made sure the woman is safe.</Text>
                    <TouchableOpacity style={[{marginTop:200,backgroundColor:'#9723F2'},styles.btn]} onPress={()=> this.props.onNext()}>
                        <Text style={[styles.btnText]}>See SafeUP in action! (demo)</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[{marginTop:10,backgroundColor:'#FF7373'},styles.btn]} onPress={()=> this.props.onCancel()}>
                        <Text style={[styles.btnText]}>You have 5 sec to cancel</Text>
                    </TouchableOpacity>
              </View>
            </View>
        );
    }
}

export default DemoDialog

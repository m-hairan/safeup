import React, {Component} from 'react';
import {Image,StatusBar, View,Text,TextInput,Animated,TouchableOpacity, FlatList, Dimensions, LayoutAnimation, ScrollView, StyleSheet} from 'react-native';
import Styles from '../../common/style';

import { PermissionsAndroid } from 'react-native';
import GradientCard from "react-native-gradient-card-view";
import Contacts from 'react-native-contacts';
import SearchBar from "react-native-dynamic-search-bar";
import { CustomLayoutSpring } from "react-native-animation-layout";

import {serviceInviteMyGuardians} from '../../service/api';


import staticData from "../../data/staticData";
// import { ScrollView } from 'react-native-gesture-handler';
const { width } = Dimensions.get("window");

const { styles } = Styles;

var self= null;
export default class ContactsListScreen extends Component {

  constructor(props) {
    super(props);    
    self = this;
    this.state = {
      query: "",
      dataSource: [],
      dataBackup: [],
      isLoading: true,
      page: 1,
      seed: 1,
      refreshing: false     
    };
    console.log("contacts............");
  }
  componentDidMount() { 
    //For ios
    // Contacts.getAll((err, contacts) => {
    //   if (err) {
    //     throw err;
    //   }
    //   // contacts returned
    // })
    //For android   
    PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
      {
        'title': 'Contacts',
        'message': 'This app would like to view your contacts.'
      }
    ).then(() => {
      Contacts.getAll((err, contacts) => {
        if (err === 'denied'){
          // error
        } else {
          console.log(JSON.stringify(contacts));
          // this.state.dataSource = contacts;
          // this.state.dataBackup = contacts;
          this.setState({dataSource:contacts});
          this.setState({dataBackup:contacts});
          this.forceUpdate();
        }
      })
    })
    // Contacts.getAll((err, contacts) => {
    //   if (err === 'denied'){
    //     console.error("error");
    //   } else {
    //     console.log(JSON.stringify(contacts));
    //   }
    // })
  }

  onBack()
  {
    this.props.navigation.goBack();
  }
  
  onNext()
  {
    console.log("Contacts............");    
  }

  inviteMyGuardian(phone) {
    var real_phone = phone.replace(/[\s+-]/g, '');
    serviceInviteMyGuardians(real_phone).then(res => {
      console.log("Successfully invited!");
    }).catch(err=>{
      console.warn(err);
    });
  }

  filterList = text => {
    var newData = this.state.dataBackup;
    newData = this.state.dataBackup.filter(item => {
      const itemData = item.givenName.toLowerCase();
      const textData = text.toLowerCase();
      return itemData.indexOf(textData) > -1;
    });
    LayoutAnimation.configureNext(CustomLayoutSpring(null, null, "scaleXY"));
    this.setState({
      query: text,
      dataSource: newData
    });
  };
  renderItem(item) {
    console.log("datasource===>",this.state.dataSource)
    return (
      <View style={in_styles.outerContainer}>
        <View style={in_styles.innerContainer}>
          <Image
              style={in_styles.imageStyle}
              source={require('../../assets/placeholder.png')}
              resizeMode='stretch'
            />
          <View style={in_styles.column}>
            <Text style={in_styles.titleStyle}>
              {item.givenName}
            </Text>
            <Text style={in_styles.subtitleStyle}>
              {item.phoneNumbers[0].number}
            </Text>
          </View>
        </View>
        <View style={in_styles.rightContainer}>
            <TouchableOpacity style={{width:74, height:25, borderRadius:40, backgroundColor:"#ffffff"}} onPress={() => this.inviteMyGuardian(item.phoneNumbers[0].number)}>
                <View style={{flexDirection:"row", alignContent: "center", justifyContent : "center"}}>
                    <Text style={color="#000000"}>Invite</Text> 
                </View>                
            </TouchableOpacity>                       
        </View>
      </View>      
    );
  }

  onRefresh = () => {
    this.setState({
      dataSource: [],
      isLoading: false,
      refreshing: true,
      seed: 1,
      page: 1
    });
    // this.fetchData();
  };

  loadMore = () => {
    this.setState({
      // refreshing: true,
      page: this.state.page + 1
    });
    // this.fetchData();
  };

  render() {

    return (
        <View style={[styles.fullScreen,styles.centerHorizontal,{backgroundColor:'#2A3139'}]}>
          <StatusBar hidden={true} />
          {global.deviceLocale == 'he-IL'?
          <View style={[styles.vwTopBar_he]}>
                <TouchableOpacity style={{height:50,marginLeft:20,justifyContent:'center'}} onPress={()=> this.onBack()}>
                    <View style={{flexDirection:'row'}}>
                        <Text style={{marginLeft:10,fontSize:18,color:'#fff'}}>Back</Text>
                        <Image style={{width:12,height:21, marginLeft:10, marginRight:10, marginTop:3}} source={require('../../assets/ic_back.png')}/>
                    </View>
                </TouchableOpacity>
          </View>
          :
          <View style={[styles.vwTopBar]}>
                <TouchableOpacity style={{height:50,marginLeft:20,justifyContent:'center'}} onPress={()=> this.onBack()}>
                    <View style={{flexDirection:'row'}}>
                        <Image style={{width:12,height:21}} source={require('../../assets/ic_back.png')}/>
                        <Text style={{marginLeft:10,fontSize:18,color:'#fff'}}>Back</Text>
                    </View>
                </TouchableOpacity>
          </View>
          }

          <View style={{alignItems:'center'}}>
              <Text style={{color:'#fff',fontSize:26,marginLeft:20,marginRight:20,marginTop:15,marginBottom:7,textAlign:'center'}}>My Guardians</Text>
              <Text style={{color:'#fff',fontSize:16,marginLeft:20,marginRight:20,marginTop:10,marginBottom:10,textAlign:'center'}}>Are my personal trusted people</Text>                          
              <SearchBar
                  onPressToFocus
                  autoFocus={false}
                  fontColor="#c6c6c6"
                  iconColor="#000000"
                  shadowColor="#282828"
                  cancelIconColor="#c6c6c6"
                  backgroundColor="#ffffff"
                  placeholder="Find my guardians"
                  onChangeText={text => {
                    this.filterList(text);
                  }}
                  onPressCancel={text => {
                    this.filterList("");
                  }}
                  style={{height:60}}
                  // onPressCancel={() => {
                  //   this.filterList("");
                  // }}
                  // onPress={() => alert("onPress")}
                />
                <View style={{flexDirection:"row", width:width*0.95, marginTop:5}}>
                  <Text style={{color:'#fff',fontSize:16,marginLeft:20,marginRight:20}}>All contacts</Text>
                </View>  
                <ScrollView style={{ top: 12 }}>
                  <FlatList
                    data={this.state.dataSource}
                    renderItem={({ item }) => this.renderItem(item)}
                    onEndReached={this.loadMore}
                    onRefresh={this.onRefresh}
                    refreshing={this.state.refreshing}
                  />
                </ScrollView>
          </View>
          
        </View>
    );
  }
}

const in_styles = StyleSheet.create({
  innerContainer: {
    flex: 1,
    marginLeft: 16,
    marginTop:10,
    flexDirection: "row",
    alignContent: "center",
    alignSelf: "flex-start",
    justifyContent: "center"
  },
  column: { flexDirection: "column", marginTop:8 },
  titleStyle: {
    width: 85,
    color: "white",
    marginLeft: 8,
    textAlign: "left",
    fontWeight: "bold"
  },
  subtitleStyle: {
    width: 85,
    fontSize: 12,
    marginLeft: 8,
    color: "#E2E2E2",
    textAlign: "left"
  },
  rightContainer: { position : "absolute", right : 10, top : 22, alignContent: "center", justifyContent: "center"},
  imageStyle : {
    width : 50,
    height : 50,
    borderRadius : 25
  },
  outerContainer : {
    height : 70,
    borderRadius : 5,
    marginBottom :2,
    width : width * 0.95,
    backgroundColor : "#000000",
  }
})

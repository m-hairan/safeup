import
{
  Dimensions,
  Platform,
  StyleSheet
} from 'react-native';

const { width, height } = Dimensions.get('window');
const bottomBarHeight = 150;
import {
    scale,
    verticalScale
} from './scale';
const styles = StyleSheet.create({
  loading: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:'#444',
        opacity:0.9,
        zIndex:999999999999999999
  },
  loaderView: {
        width:scale(250),
        height:verticalScale(60),
        backgroundColor:'#888',
        borderRadius:5,
        flexDirection:'row',
        alignItems:'center'
  },
  activityIndicator: {
        margin:scale(15)
  },
  loadingText:{
        color:'#fff',
        fontSize:scale(14),
  },
  primaryBg: {
    backgroundColor:'#444444',
  },
  fullScreen:{
    flex:1
  },
  centerScreen:{
    alignItems:'center',
    justifyContent:'center'
  },
  centerHorizontal:{
    alignItems:'center'
  },
  centerVertical:{
    justifyContent:'center'
  },
  bottomRadius:{
    borderBottomLeftRadius:20,
    borderBottomRightRadius:20
  },
  photoContainer:{
    borderWidth:1,
    borderStyle:'solid',
    borderColor:'#B141FB'
  },
  photoSize:{
    width:50,
    height:50,
    borderRadius:25
  },
  btn:{
    borderRadius:10,
    height:50,
    padding:10
  },
  btnText:{
    color:'#fff',
    fontWeight: 'bold',
    fontSize:16,
    lineHeight:26,
    flex:1,
    textAlign:'center'
  },
  inputSms:{
    height:40,marginLeft:5,fontSize:25
  },
  textWarning:{
    marginLeft:10,
    paddingLeft:20,
    paddingRight:20,
    borderRadius:10
  },
  vwTopBar:{
    height:70,width:'100%',flexDirection:'row',alignItems:'center'
  },
  btnToggle:{
    backgroundColor:'#9723F2',marginLeft:20,marginRight:20
  },
  btnToggleOn:{
    backgroundColor:'#CB9CF0',marginLeft:20,marginRight:20
  },
  btnAgreeOff:{
    width:30,height:30,borderRadius:15,backgroundColor:'rgba(212, 168, 247, 0.5)',alignItems:'center',justifyContent:'center'
  },
  btnAgreeOn:{
    width:30,height:30,borderRadius:15,backgroundColor:'#9723F2',alignItems:'center',justifyContent:'center'
  }
});

export var mapStyle=[
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#212121"
      }
    ]
  },
  {
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#212121"
      }
    ]
  },
  {
    "featureType": "administrative",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "administrative.country",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "administrative.locality",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#bdbdbd"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "poi.business",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#6c6c6c"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#181818"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#48bcb0"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#616161"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#1b1b1b"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#2c2c2c"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#8a8a8a"
      }
    ]
  },
  {
    "featureType": "road.arterial",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#373737"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#3c3c3c"
      }
    ]
  },
  {
    "featureType": "road.highway.controlled_access",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#4e4e4e"
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#616161"
      }
    ]
  },
  {
    "featureType": "transit",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#000000"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#59dff0"
      },
      {
        "lightness": -15
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#3d3d3d"
      }
    ]
  }
];

export default {
  styles
};

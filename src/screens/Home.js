import React, {useContext,useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient';
import { AppContext } from "../context/AppContext";
import AisInput from '../components/forms/AisInput';
import { FontAwesome } from "@expo/vector-icons";
const inputs = [
  {field:'phoneNumber',icon:{name:'phone',type:'Feather',min:5,color:'#009387'},keyboardType:null,placeholder:'ENTER PHONE NUMBER',color:'#009387'},
  {field:'password',icon:{name:'lock',type:'Feather',color:'#009387',min:6},keyboardType:'numeric',placeholder:'ENTER YOUR PASSWORD',color:'#009387'}
]
export default function Home({navigation}) {
  const {fontFamilyObj} = useContext(AppContext);
  const [loginTypes,setLoginTypes] = useState([{btnType:'STAFF',selected:true},{btnType:'RESIDENT',selected:false}]);
  const selectedLoginType = loginTypes.filter(item => item.selected === true)[0].btnType;

  const [formData,setFormData] = useState(null);
  const handleChange = (field,value) => setFormData(v =>({...v, [field] : value}));

  const login = () =>{
    navigation.navigate("Main")
  }

  if(fontFamilyObj){
    return (
      <ScrollView style={{backgroundColor:'#e8e9f5'}}>
        <View style={{padding:10,flex:1,backgroundColor:'#e8e9f5'}}>

          <LinearGradient colors={["#e44528","#b2e8fa","#d6a8e7","#f3bf4f"]} start={{ x: 0, y: 1 }} end={{ x: 1, y: 0 }} style={{height:300,alignItems:'center',justifyContent:'center',borderRadius:30}}>  
            <Animatable.Image animation="bounceIn" duration={1500} useNativeDriver={true} source={require('../../assets/logo.png')} style={{width:'70%'}} resizeMode="contain"/>
          </LinearGradient>

          <View style={{backgroundColor:'#fff',height:60,marginTop:15,borderRadius:30,padding:3,flexDirection:'row'}}>
            {loginTypes.map((btn,i) =>(
              <TouchableOpacity key={i} style={{flex:1,alignContent:'center',alignItems:'center',justifyContent:'center',backgroundColor:btn.selected ? '#b2e8fa' : '#fff',borderRadius:30,padding:5}} onPress={() => setLoginTypes(loginTypes.map(item => item.btnType === btn.btnType ? {...item,selected:true} : {...item,selected:false}))}>
                <Text style={{fontFamily: btn.selected ? (fontFamilyObj ? fontFamilyObj.fontBold : null) : (fontFamilyObj ? fontFamilyObj.fontLight : null),color:btn.selected ? '#fff' : '#757575'}}>{btn.btnType}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={{textAlign:'center',fontFamily:fontFamilyObj ? fontFamilyObj.fontBold : null,marginTop:15,color:'#757575',fontSize:20}}>{selectedLoginType } LOGIN</Text>
          
          {/**LOGIN FIELDS STARTS HERE */}
          <View>
            {inputs.map((item,i) =>(
              <AisInput attr={{...item,handleChange}} key={i} />
            ))}
          </View>
          {/**LOGIN FIELDS ENDS HERE */}


          <View style={{alignItems:'center',marginTop:30}}>
            <TouchableOpacity onPress={login}>
              <FontAwesome name='check-circle' size={120} color="green"></FontAwesome>
            </TouchableOpacity>
          </View>

        </View>
      </ScrollView>
    );
  }else{
    return(
      <View></View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

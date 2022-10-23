import { createStackNavigator } from '@react-navigation/stack';
import React, { useState, useCallback, useEffect } from 'react'
import { Col, Grid } from 'react-native-easy-grid';
import { StyleSheet, View, Dimensions ,ActivityIndicator,ScrollView, Platform,Text,Image} from "react-native";
import {Feather,FontAwesome,MaterialIcons,Ionicons} from "react-native-vector-icons";
import { AppContext } from "../context/AppContext";
import { LinearGradient } from 'expo-linear-gradient';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { createData } from '../context/Api';
import AisInput from '../components/forms/AisInput';
const RootStack = createStackNavigator();
const Register = ({route,navigation}) =>{
    const {fontFamilyObj,setModalState} = React.useContext(AppContext);
    return(
        <RootStack.Navigator screenOptions={{headerStyle: {elevation: 1,shadowOpacity: 0,backgroundColor: "#fff",borderBottomWidth: 0},headerTintColor: "#fff",headerTitleStyle: { fontWeight: "bold" }}}>
        <RootStack.Screen name="NotificationScreen" component={PageContent} options={{
            headerLeft: () => (
                <Feather.Button backgroundColor="#fff" name="arrow-left-circle" size={28} color="#757575" onPress={()=>{navigation.goBack()}}></Feather.Button>
            ), 
            title:"CREATE HOME ACCOUNT",
            headerTintColor: '#5586cc',
            headerTitleStyle: {
                fontWeight: '900',
                fontSize:14,
                fontFamily:fontFamilyObj.fontBold
            },
        }}/>
        </RootStack.Navigator>
    )
};
const PageContent = ({navigation}) => {
    const {fontFamilyObj,appState,showToast,setConfirmDialog,getLocation} = React.useContext(AppContext);
    const [formData,setFormData] = useState({fname:'',phoneNumber:'',idNumber:'',suburbName:'',streetName:'',houseNumber:'',postalCode:'',password:''});
    const handleChange = (field,value) => setFormData(v =>({...v, [field] : value}));
    const {phoneNoValidation,sendSms} = appState;
    
    const createAccount = () => {
        if(formData.fname !== '' && (formData.phoneNumber.length === 10) && formData.suburbName !== "" && (formData.password.length > 5 ) && formData.postalCode !== "" && formData.streetName !== ""){
            setConfirmDialog({isVisible:true,text:`Hi ${formData.fname}, Do you confirm that ${formData.phoneNumber} is the right phone number and any other details you have entered?, Press PROCEED to confirm`,okayBtn:'PROCEED',cancelBtn:'NOT NOW',isSuccess:0,response:(res) => { 
                if(res){
                    getLocation((location) => {
                        const confirmationCode = Math.floor(Math.random()*89999+10000).toString();
                        const obj = {...formData,location,date:Date.now(),confirmationCode}
                        sendSms(phoneNoValidation(formData.phoneNumber),`Hi ${formData.fname}, your confirmation code is ${confirmationCode}`)
                        navigation.navigate("Confirmation",obj)
                    })
                }
            }});
        }else{
            showToast("Carefully fill in to proceed!")
        }
    }
    return(
        <View style={styles.container}>
            <LinearGradient colors={["#fff","#fff","#fff","#f1f7fa"]} style={{flex:1,paddingTop:10,borderRadius:10}}>
                <ScrollView style={{padding:10}}>
                    <Text style={{fontFamily:fontFamilyObj.fontBold,color:'green',textAlign:'center',margin:10}}>Register below and get access to your bills, emergencies and whats happening in our area</Text>
                    <AisInput attr={{field:'fname',icon:{name:'user',type:'FontAwesome',min:5,color:'#5586cc'},keyboardType:null,placeholder:'Enter your full name',color:'#009387',handleChange}} />
                    <AisInput attr={{field:'phoneNumber',icon:{name:'phone',type:'FontAwesome',min:5,color:'#5586cc'},keyboardType:'phone-pad',placeholder:'Enter your phone number',color:'#009387',handleChange}} />
                    <AisInput attr={{field:'idNumber',icon:{name:'confirmation-number',type:'MaterialIcons',min:5,color:'#5586cc'},keyboardType:'numeric',placeholder:'ID number (optional)',color:'#009387',handleChange}} />
                    <AisInput attr={{field:'suburbName',icon:{name:'location-outline',type:'Ionicons',min:5,color:'#5586cc'},keyboardType:null,placeholder:'Enter your suburb',color:'#009387',handleChange}} />
                    <AisInput attr={{field:'streetName',icon:{name:'street-view',type:'FontAwesome',min:5,color:'#5586cc'},keyboardType:null,placeholder:'Enter your street name',color:'#009387',handleChange}} />
                    <AisInput attr={{field:'houseNumber',icon:{name:'business',type:'Ionicons',min:5,color:'#5586cc'},keyboardType:null,placeholder:'Enter your house number',color:'#009387',handleChange}} />
                    <AisInput attr={{field:'postalCode',icon:{name:'code',type:'FontAwesome',min:4,color:'#5586cc'},keyboardType:'numeric',placeholder:'Whats your postal code',color:'#009387',handleChange}} />
                    <AisInput attr={{field:'password',icon:{name:'lock',type:'FontAwesome',min:4,color:'#5586cc'},keyboardType:'numeric',placeholder:'Your password',color:'#009387',handleChange}} />
                    <View style={{alignItems:'center',marginTop:30}}>
                        <TouchableOpacity onPress={createAccount}>
                            <FontAwesome name='check-circle' size={120} color="green"></FontAwesome>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </LinearGradient>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "blue",
        marginTop:5,
        borderRadius:10,
        elevation:5
    },
    myBubble:{
        backgroundColor:'#7ab6e6',
        padding:5,
        minWidth:100,
    },
    preference: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
})
export default React.memo(Register)
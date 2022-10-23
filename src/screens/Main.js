import 'react-native-gesture-handler';
import React,{useState,useEffect,useContext} from 'react';
import { Text, View, Dimensions, Image, StyleSheet, TouchableOpacity } from 'react-native';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import { AppContext } from "../context/AppContext";
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient';

import { FontAwesome, AntDesign, Ionicons, MaterialCommunityIcons, Foundation, MaterialIcons, Feather } from "@expo/vector-icons";
let PARALLAX_HEIGHT = 0;
const Main = ({navigation}) =>{
    const {height} = Dimensions.get("screen");
    PARALLAX_HEIGHT = parseInt((0.475 * parseFloat(height)).toFixed(0));
    const [parallaxH,setParallaxH]= useState(PARALLAX_HEIGHT);
    return (
        <View style={styles.container}>
            <ParallaxScrollView
                backgroundColor="transparent"
                contentBackgroundColor="transparent"
                backgroundScrollSpeed={5}
                fadeOutForeground ={true}
                showsVerticalScrollIndicator ={false}
                parallaxHeaderHeight={parallaxH}
                renderForeground={() => <Foreground navigation={navigation}/>}
                renderBackground={() => <HeaderSection navigation={navigation}/>}
                renderContentBackground={() => <BodySection navigation={navigation} />}
            />
        </View>
    )
};
export default React.memo(Main);

const HeaderSection = () =>{
    return(
        <LinearGradient colors={["#e44528","#b2e8fa","#d6a8e7","#f3bf4f"]} start={{ x: 0, y: 1 }} end={{ x: 1, y: 0 }} style={{height:'100%',alignItems:'center',justifyContent:'center'}}>  
            <Animatable.Image animation="bounceIn" duration={1500} useNativeDriver={true} source={require('../../assets/logo.png')} style={{width:'70%'}} resizeMode="contain"/>
        </LinearGradient>
    )
}
const Foreground = (props) =>{
    const {navigation} = props;
    const {fontFamilyObj,accountInfo,setConfirmDialog,appState} = useContext(AppContext);
    const {logout} = appState;
    return(
        <View style={styles.headerStyle}>
            <TouchableOpacity style={{flex:1}} onPress={()=>{
                setConfirmDialog({isVisible:true,text:`Would you like to logout? Your phone number and password may be required the next time you sign in.`,okayBtn:'NOT NOW',cancelBtn:'LOGOUT',response:(res) => { 
                    if(!res){
                        navigation.navigate('Home')
                        logout();
                    }
                }})
            }} >
                <Feather name="lock" size={36} color="tomato"></Feather>
            </TouchableOpacity>
            <Text style={{fontFamily:fontFamilyObj && fontFamilyObj.fontBold,color:'#fff',marginTop:10}}>{accountInfo && accountInfo.fname} </Text>
        </View>
    )
}
const BodySection = (props) =>{
    const {fontFamilyObj,showToast} = useContext(AppContext);
    const btns = ['Directory','Notice Board','Complaints','FAQs','Emergencies','Inbox','Media','My Statements', 'Events']
    const {navigation} = props;
    const on_btn_pressed = btn =>{
        if(btn === 'Directory'){
            navigation.navigate("DirectoryScreen")
        }else if(btn === 'Notice Board'){
            navigation.navigate("NoticeBoardScreen")
        }else if(btn === 'FAQs'){
            navigation.navigate("FaqScreen")
        }else if(btn === 'My Statements'){
            navigation.navigate("Statements")
        }else if(btn === 'Emergencies'){
            navigation.navigate("Emergencies")
        }else if(btn === 'Complaints'){
            navigation.navigate("Complaints")
        }else if(btn === 'Media'){
            navigation.navigate("Media")
        }else if(btn === 'Inbox'){
            navigation.navigate("Chat")
        }else if(btn === 'Events'){
            navigation.navigate("Events")
        }else{
            showToast("We are currently reviewing your app and this feature will be live once approved!")
        }
    }
    return(
        <View style={styles.footerStyle}>
            <View><Text style={{fontFamily:fontFamilyObj.fontBold,color:'#757575',textAlign:'center',margin:15}}>WHAT WOULD YOU LIKE TO DO?</Text></View>
            <View style={{flexDirection:'row',alignContent:'center',alignItems:'center',display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',flexWrap: 'wrap'}}>
                {btns.map((btn,i) => {
                    return(
                        <TouchableOpacity onPress={()=>on_btn_pressed(btn)} key={i} style={{backgroundColor:'#5586cc',width:'32%',borderRadius:10,alignContent:'center',alignItems:'center',justifyContent:'center',padding:5,minHeight:120,marginTop:10}}>
                            {render_btn_icons(btn)}
                            <Text style={{fontFamily:fontFamilyObj.fontBold,color:'#fff',textAlign:'center'}}>{btn}</Text>
                        </TouchableOpacity>
                    )
                })}
            </View>
        </View>
    )
}

const render_btn_icons = btn =>{
    if(btn === 'Directory'){
        return <AntDesign name='contacts' color='#fff' size={72} />
    }else if(btn === 'Notice Board'){
        return <Ionicons name='book' color='#fff' size={72} />
    }else if(btn === 'Complaints'){
        return <AntDesign name='notification' color='#fff' size={72} />
    }else if(btn === 'FAQs'){
        return <Ionicons name='help-circle' color='#fff' size={72} />
    }else if(btn === 'Emergencies'){
        return <FontAwesome name='warning' color='tomato' size={72} />
    }else if(btn === 'Inbox'){
        return <Ionicons name='chatbubble-ellipses-sharp' color='#fff' size={72} />
    }else if(btn === 'Media'){
        return <MaterialIcons name='photo-library' color='#fff' size={72} />
    }else if(btn === 'My Statements'){
        return <Foundation name='dollar-bill' color='#fff' size={72} />
    }else if(btn === 'Events'){
        return <MaterialIcons name='event' color='#fff' size={72} />
    }else{
        return <FontAwesome name='check-circle' color='#fff' size={72} />
    }
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#e8e9f5',
    },
    footerStyle: {
        flex: 2,
        backgroundColor: "#fff",
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingVertical: 10,
        paddingHorizontal: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        elevation: 10,
        paddingBottom:30,
        marginTop:-30
    },
    headerStyle:{
        position:'absolute',
        top:0,
        width:'100%',
        backgroundColor: 'rgba(0, 0, 0, 0.1)', 
        padding:10,
        flexDirection:'row'
    }
});
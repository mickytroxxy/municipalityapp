import React,{useState,useMemo} from 'react';
export const AppContext = React.createContext();
import AsyncStorage from "@react-native-async-storage/async-storage";
import geohash from "ngeohash";
import {Alert,ToastAndroid,Platform } from 'react-native';
import * as Font from "expo-font";
import Constants from 'expo-constants';
//Store categories
const unitType = ['KG','LT','SIZE'];
const itemColor = ['NO COLOR','GREEN','BLACK','RED','ORANGE','WHITE','YELLOW','GRAY','DARK BLUE'];
const hasMultipleColors = true;
//store categories ends here
export const AppProvider = (props) =>{
    const [fontFamilyObj,setFontFamilyObj] = useState(null);
    const [storeCategories,setStoreCategories] = useState([
        {category:'ALL',selected:true},
        {
            category:'FAST FOOD',
            selected:false,
            item:{itemName:'',itemDescription:'',unitType,hasMultipleColors,itemColor}
        },
        {
            category:'GROCERY',
            selected:false,
            item:{itemName:'',itemDescription:'',unitType,hasMultipleColors,itemColor}
        },{
            category:'FASHION',
            selected:false,
            item:{itemName:'',itemDescription:'',unitType:['SIZE'],hasMultipleColors,itemColor}
        }
    ])
    let customFonts = {
        'fontLight': require('..//../fonts/MontserratAlternates-Light.otf'),
        'fontBold': require('..//../fonts/MontserratAlternates-Bold.otf'),
    };
    React.useEffect(()=>{
        loadFontsAsync();
    },[]);
    const loadFontsAsync = async ()=> {
        await Font.loadAsync(customFonts);
        setFontFamilyObj({fontLight:'fontLight',fontBold:'fontBold'})
    }
    const appState = useMemo(()=>({
        fontFamilyObj,storeCategories,setStoreCategories
    }),[])
    return(
        <AppContext.Provider value={{appState,fontFamilyObj,storeCategories,setStoreCategories}}>
            {props.children}
        </AppContext.Provider>
    )
}
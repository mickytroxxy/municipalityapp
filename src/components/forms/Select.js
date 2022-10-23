import React, { useState } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { AppContext } from '../../context/AppContext';
import RNPickerSelect from 'react-native-picker-select';


const SelectInput = (props) =>{
    const {fontFamilyObj} = React.useContext(AppContext);
    const [newGender,setNewGender]=React.useState("GENDER");
    const handleChange = item =>{
        alert(item)
    }
    return(
        <View style={{borderWidth:1,borderColor:'#757575',padding:10,borderRadius:10}}> 
            <RNPickerSelect
                onValueChange={(value) => props.attr.handleChange(props.attr.field,value)}
                items={props.attr.list}
            />
        </View>
    )
}
export default SelectInput;
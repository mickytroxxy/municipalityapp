import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';

import Home from './Home';
import Main from './Main';
import DirectoryScreen from './DirectoryScreen';

const RootStack = createStackNavigator();

const Navigation = props => {
  return (
    <NavigationContainer>
      <RootStack.Navigator initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            elevation: 0,
            shadowOpacity: 0,
            backgroundColor: "#009387",
            borderBottomWidth: 0,
          },
          headerTintColor: "#fff",
          headerTitleStyle: { fontWeight: "bold" },
          headerShown: false
        }}
      >
        <RootStack.Screen
          name="Home"
          component={Home}
        />
        <RootStack.Screen
          name="Main"
          component={Main}
        />
        <RootStack.Screen
          name="DirectoryScreen"
          component={DirectoryScreen}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};
export default React.memo(Navigation);
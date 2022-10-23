import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';

import Home from './Home';
import Main from './Main';
import BusinessProfile from './BusinessProfile';
import DirectoryScreen from './DirectoryScreen';
import NoticeBoardScreen from './NoticeBoard';
import FaqScreen from './FaqScreen';
import Register from './Register';
import Confirmation from './Confirmation';
import Statements from './Statements';
import Emergencies from './Emergencies';
import Sending from './Sending';
import Complaints from './Complaints';
import AddComplaints from '../components/Modals/AddComplaints';
import Media from './Media';
import AddMedia from '../components/Modals/AddMedia';
import Chat from './Chat';
import Events from './Events';
import AddEvent from '../components/Modals/AddEvent';
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
        <RootStack.Screen
          name="BusinessProfile"
          component={BusinessProfile}
        />
        <RootStack.Screen
          name="NoticeBoardScreen"
          component={NoticeBoardScreen}
        />
        <RootStack.Screen
          name="FaqScreen"
          component={FaqScreen}
        />
        <RootStack.Screen
          name="Register"
          component={Register}
        />
        <RootStack.Screen
          name="Confirmation"
          component={Confirmation}
        />
        <RootStack.Screen
          name="Statements"
          component={Statements}
        />
        <RootStack.Screen
          name="Emergencies"
          component={Emergencies}
        />
        <RootStack.Screen
          name="Sending"
          component={Sending}
        />
        <RootStack.Screen
          name="Complaints"
          component={Complaints}
        />
        <RootStack.Screen
          name="AddComplaints"
          component={AddComplaints}
        />
        <RootStack.Screen
          name="Media"
          component={Media}
        />
        <RootStack.Screen
          name="AddMedia"
          component={AddMedia}
        />
        <RootStack.Screen
          name="Chat"
          component={Chat}
        />
        <RootStack.Screen
          name="Events"
          component={Events}
        />
        <RootStack.Screen
          name="AddEvent"
          component={AddEvent}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};
export default React.memo(Navigation);
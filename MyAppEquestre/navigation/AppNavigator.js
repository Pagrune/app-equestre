import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";

import SignIn from '../screens/auth/SignIn';
import Home from '../screens/Home';
import Register from '../screens/auth/Register';

const Drawer = createDrawerNavigator();

function AppNavigator() {
  return (
    <Drawer.Navigator screenOptions={{ headerShown: true }}>
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="SignIn" component={SignIn} />
      <Drawer.Screen name="Register" component={Register} />
    </Drawer.Navigator>
  );
}

export default AppNavigator;
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignIn from './screens/auth/SignIn';
import Home from './screens/Home';
import Register from './screens/auth/Register';
import ChoixDiscipline from './screens/concours/ChoixDiscipline';
import EnregCSO from './screens/concours/EnregCSO';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ProtectedRoute from './components/Wrapper';

const Stack = createNativeStackNavigator();

// get the token from the local storage
const token = AsyncStorage.getItem('userToken');

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="SignIn" component={SignIn} options={{ title: 'Connexion' }}/>
        <Stack.Screen name="Home" component={Home} options={{ title: 'Accueil' }}/>
        <Stack.Screen name="Register" component={Register} options={{ title: 'Inscription' }}/>
        <Stack.Screen 
          name="ChoixDiscipline" 
          options={{ title: 'Choix de la discipline' }}>
          {props => <ProtectedRoute {...props} Component={ChoixDiscipline} />}
        </Stack.Screen>
        <Stack.Screen 
          name="EnregCSO" 
          options={{ title: 'Enregistrement CSO' }}>
          {props => <ProtectedRoute {...props} Component={EnregCSO} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

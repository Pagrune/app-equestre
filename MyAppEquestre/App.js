import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import AsyncStorage from '@react-native-async-storage/async-storage';
// Importez vos écrans ici...
import SignIn from './screens/auth/SignIn';
import Home from './screens/Home';
import Register from './screens/auth/Register';
import ChoixDiscipline from './screens/concours/ChoixDiscipline';
// Autres importations...
import base64 from 'react-native-base64'

const Drawer = createDrawerNavigator();



export default function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [token, setToken] = useState('');

  const verifyTokenInAsyncStorage = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      console.log('Token retrieved from AsyncStorage:', token);
      // Vous pouvez utiliser Alert.alert au lieu de console.log si vous voulez voir le token sur votre appareil
      // Alert.alert("Token", token);

      // base64 decode
      const payloadBase64 = token.split('.')[1];
      const payloadDecoded = base64.decode(payloadBase64);
      const payload = JSON.parse(payloadDecoded);
      console.log('Payload from token:', payload);

      // const payload = await getPayloadFromToken(token);
      const now = Date.now() / 1000; // Date actuelle en secondes
      // console.log("salut bg");
      if (payload && payload.exp > now) {
        setIsSignedIn(true);

      } else {
        setIsSignedIn(false);
      }
      console.log('isSignedIn:', isSignedIn);
    } catch (error) {
      console.error('Error retrieving the token from AsyncStorage:', error);
    }
  };

 



  useEffect(() => {
    console.log('App component mounted');

    verifyTokenInAsyncStorage();
  }, [token]);


  return (
    <NavigationContainer>
      <Drawer.Navigator>
        {isSignedIn ? (
          <>
            {/* Écrans pour les utilisateurs connectés */}
            <Drawer.Screen name="Home" component={Home} />
            <Drawer.Screen name="Choix Discipline" component={ChoixDiscipline} />
            {/* Ajoutez d'autres écrans ici si nécessaire */}
          </>
        ) : (
          <>
            {/* Écrans pour les utilisateurs non connectés */}
            <Drawer.Screen name="Home" component={Home} />
            <Drawer.Screen name="SignIn" component={SignIn} />
            <Drawer.Screen name="Register" component={Register} />
            {/* Vous pouvez ajouter l'écran Home ou tout autre écran public ici si nécessaire */}
          </>
        )}
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

import 'react-native-gesture-handler';
import React, { useState, useEffect , useContext} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator, DrawerItem } from '@react-navigation/drawer';
import AsyncStorage from '@react-native-async-storage/async-storage';
// Importez vos écrans ici...
import SignIn from './screens/auth/SignIn';
import Home from './screens/Home';
import HomeConnect from './screens/HomeConnect';
import Register from './screens/auth/Register';
import Logout from './screens/auth/Logout';
import Compte from './screens/compte/Compte';

import ChoixDiscipline from './screens/concours/ChoixDiscipline';
import EnregCSO from './screens/concours/EnregCSO';
import EnregDressage from './screens/concours/EnregDressage';
import EnregCCE from './screens/concours/EnregCCE';

import Resultat from './screens/concours/Resultat';
// Autres importations...
import base64 from 'react-native-base64'

const Drawer = createDrawerNavigator();

import { AuthProvider, useAuth } from './AuthProvider';


function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

function AppContent() {
  const { isSignedIn, verifyToken } = useAuth(); // Utilisez useAuth ici

    useEffect(() => {
      const onStateChange = async () => {
        await verifyToken();
      };
  
      // Appelée à chaque changement d'état de la navigation
      // Pas besoin d'ajouter ou de retirer manuellement des écouteurs
      onStateChange();
    }, [verifyToken]);

  return (
    <NavigationContainer
      onStateChange={async () => {
        // Appelée à chaque changement d'état de la navigation
        await verifyToken();
      }}
    >
    <Drawer.Navigator>
        {isSignedIn ? (
          <>
            {/* Écrans pour les utilisateurs connectés */}
            <Drawer.Screen name="Home" component={HomeConnect} />
            <Drawer.Screen name="Choix Discipline" component={ChoixDiscipline} />
            <Drawer.Screen name="EnregCSO" component={EnregCSO} />
            <Drawer.Screen name="EnregDressage" component={EnregDressage} />
            <Drawer.Screen name="EnregCCE" component={EnregCCE} />
            <Drawer.Screen name="Compte" component={Compte} />
            <Drawer.Screen name="Resultat" component={Resultat} />
            <Drawer.Screen name="Déconnexion" component={Logout} />
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

export default App;
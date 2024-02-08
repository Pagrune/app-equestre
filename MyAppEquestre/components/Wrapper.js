import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProtectedRoute = ({ Component, ...rest }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        if (token) {
          setIsAuthenticated(true);
        } else {
          // Utilisez rest.navigation au lieu de navigation directement
          rest.navigation.navigate('SignIn');
        }
      } catch (error) {
        console.error('Error retrieving the token:', error);
        // Utilisez rest.navigation au lieu de navigation directement
        rest.navigation.navigate('SignIn');
      } finally {
        setIsLoading(false);
      }
    };

    verifyToken();
  }, [rest.navigation]); // Utilisez rest.navigation dans le tableau de dépendances

  if (isLoading) {
    return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" />
    </View>;
  }

  // Assurez-vous de passer toutes les props à Component
  return isAuthenticated ? <Component {...rest} /> : null;
};

export default ProtectedRoute;
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProtectedRoute = ({ navigation, Component }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        if (token) {
          setIsAuthenticated(true);
        } else {
          navigation.navigate('SignIn');
        }
      } catch (error) {
        console.error('Error retrieving the token:', error);
        navigation.navigate('SignIn');
      } finally {
        setIsLoading(false);
      }
    };

    verifyToken();
  }, [navigation]);

  if (isLoading) {
    return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" />
    </View>;
  }

  return isAuthenticated ? <Component /> : null;
};

export default ProtectedRoute;
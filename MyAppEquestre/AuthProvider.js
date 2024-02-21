import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import base64 from 'react-native-base64';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isSignedIn, setIsSignedIn] = useState(false);

  const verifyToken = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (token) {
        const payloadBase64 = token.split('.')[1];
        const payloadDecoded = base64.decode(payloadBase64);
        const payload = JSON.parse(payloadDecoded);

        const now = Date.now() / 1000;
        if (payload.exp > now) {
          setIsSignedIn(true);
        } else {
          setIsSignedIn(false);
        }
      } else {
        setIsSignedIn(false);
      }
    } catch (error) {
      console.error('Error verifying token:', error);
    }
  };

  useEffect(() => {
    verifyToken();
  }, []);

  return (
    <AuthContext.Provider value={{ isSignedIn, verifyToken }}>
      {children}
    </AuthContext.Provider>
  );
};

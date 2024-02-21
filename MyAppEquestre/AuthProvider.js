import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { decode as atob } from 'react-native-base64';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isSignedIn, setIsSignedIn] = useState(false);

  const checkToken = async () => {
    const token = await AsyncStorage.getItem('userToken');
    if (token) {
      const payload = await getPayloadFromToken(token);
      const now = Date.now() / 1000;
      if (payload && payload.exp > now) {
        setIsSignedIn(true);
      } else {
        setIsSignedIn(false);
      }
    } else {
      setIsSignedIn(false);
    }
  };

  const getPayloadFromToken = async (token) => {
    const payloadBase64 = token.split('.')[1];
    const payloadDecoded = atob(payloadBase64);
    const payload = JSON.parse(payloadDecoded);
    return payload;
  };

  useEffect(() => {
    checkToken();
  }, []);

  return (
    <AuthContext.Provider value={{ isSignedIn, checkToken }}>
      {children}
    </AuthContext.Provider>
  );
};

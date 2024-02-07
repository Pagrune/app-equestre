import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from 'react-native-axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignIn = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://10.0.2.2:3000/auth/login', {
        email,
        password
      });

      console.log(response.data);
      Alert.alert("Succès", "Connexion réussie !");
      const token = response.data.token;
      console.log('mon petit token' +token);

      // Corrigez et appelez storeData ici
      AsyncStorage.setItem('userToken', token)
      .then(() => {
        console.log('Token saved successfully!');
      })
      .catch(error => {
        console.error('Error saving the token:', error);
      });

      // const verifyTokenInAsyncStorage = async () => {
      //   try {
      //     const token = await AsyncStorage.getItem('userToken');
      //     console.log('Token retrieved from AsyncStorage:', token);
      //     // Vous pouvez utiliser Alert.alert au lieu de console.log si vous voulez voir le token sur votre appareil
      //     // Alert.alert("Token", token);
      //   } catch (error) {
      //     console.error('Error retrieving the token from AsyncStorage:', error);
      //   }
      // };

      // verifyTokenInAsyncStorage();
    

      navigation.navigate('ChoixDiscipline');
    } catch (error) {
      console.error(error);
      Alert.alert("Erreur", "Échec de la connexion !");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Me connecter</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
      />
      <TextInput
        placeholder="Mot de passe"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry
      />
      <Button title="Se connecter" onPress={handleLogin} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    marginBottom: 15,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
  },
});

export default SignIn;
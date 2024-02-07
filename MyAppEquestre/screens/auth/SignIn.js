import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from 'react-native-axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignIn = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://monapi.com/auth/login', {
        email,
        password
      });

      // Gérer la réponse du serveur ici. Par exemple, sauvegarder le token, etc.
      console.log(response.data);
      Alert.alert("Succès", "Connexion réussie !");
      // Sauvegarder le token dans le stockage sécurisé/local
      await AsyncStorage.setItem('userToken', response.data.token);
      // Navigation vers une autre écran après la connexion réussie
      navigation.navigate('Home');

    } catch (error) {
      // Gérer les erreurs ici
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
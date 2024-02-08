import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ImageBackground } from 'react-native';
import axios from 'react-native-axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import bgImage from '../../img/fleur_background.png';

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
    <View style={styles.containerout}>
      <ImageBackground source={bgImage} resizeMode="cover" style={styles.image}>
        <View style={styles.container}>
      <Text style={styles.title}>Me connecter</Text>
      <View style={styles.connexdiv}>
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
      </View>
      
      <Button
        title="Connexion"
        onPress={handleLogin}
        color="#BA7868"
      />
      </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  containerout: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#EDDCD4',
    position: 'relative',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
    width: '100%',
    height: '60%',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  input: {
    marginBottom: 15,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    backgroundColor: '#EDDCD4',
    color: '#A68677',
  },
  connexdiv: {
    backgroundColor : '#A68677',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
});

export default SignIn;
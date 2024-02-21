import React, { useState } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';

import bgImage from '../../img/fleur_background.png';

import { View, Text, StyleSheet, Alert, ImageBackground, TouchableOpacity } from 'react-native';
import { useAuth } from '../../AuthProvider'; // Assurez-vous que le chemin est correct

const Logout = ({ navigation }) => {
  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout();

    // Optionnel : Naviguez vers l'écran de connexion ou un autre écran après la déconnexion
    navigation.navigate('SignIn');

    // Affichez une alerte pour confirmer la déconnexion
    Alert.alert("Déconnecté", "Vous avez été déconnecté avec succès.");
  };

  return (
    <View style={styles.containerout}>
      <ImageBackground source={bgImage} resizeMode="cover" style={styles.image}>
        <View style={styles.container}>
          <Text style={styles.title}>Me déconnecter</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={handleLogout}
          >    
            <Text style={styles.buttonText}>Oui</Text>
        </TouchableOpacity>
        <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.jumpTo('Home')}
        >            
            <Text style={styles.buttonText}>Non</Text>
        </TouchableOpacity>
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
  button: {
    backgroundColor: '#EDDCD4', // Couleur de fond du bouton
    padding: 10, // Ajoutez du padding selon votre design
    borderRadius: 10, // Arrondir les coins du bouton
    alignItems: 'center', // Centrer le texte du bouton
    marginVertical: 5, // Espacement vertical entre les boutons
  },
  buttonText: {
    color: '#A68677', // Couleur du texte du bouton
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default Logout;
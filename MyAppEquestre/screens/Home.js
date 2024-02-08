import React from 'react';
import { View, Text, Button, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';

import bgImage from '../img/cheval_home.png';

// Ajoutez `navigation` en tant que prop de votre composant Home
const Home = ({ navigation }) => {
    return (
        <View style={styles.containerout}>
          <ImageBackground source={bgImage} resizeMode="cover" style={styles.image}>
            <View style={styles.container}>
              <View style={styles.colorbg}>
                <Text style={styles.title}>Bienvenue sur MyAppEquestre</Text>
                {/* Utilisez `navigation.navigate` pour aller à l'écran de connexion */}
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => navigation.navigate('SignIn')}
                >
                  <Text style={styles.buttonText}>Se connecter</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.button}
                  onPress={() => navigation.navigate('Register')}
                >
                  <Text style={styles.buttonText}>S'inscrire</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ImageBackground>
        </View>
    );
}

// Assurez-vous que vos styles sont correctement définis
const styles = StyleSheet.create({
  containerout: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: '#EDDCD4',
    position: 'relative',
    height: '100vh',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#EDDCD4',
  },
  image: {
    flex: 1,
    justifyContent: 'flex-end',
    width: '100%',
    height: '100%',
  },
  colorbg: {
    backgroundColor: 'rgba(166, 134, 119, 0.8)',
    padding: 20,
    borderRadius: 10,
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

export default Home;

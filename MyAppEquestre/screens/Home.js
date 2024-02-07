import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

// Ajoutez `navigation` en tant que prop de votre composant Home
const Home = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Bienvenue sur MyAppEquestre</Text>
            {/* Utilisez `navigation.navigate` pour aller à l'écran de connexion */}
            <Button title="Se connecter" onPress={() => navigation.navigate('SignIn')} />
            {/* Utilisez `navigation.navigate` pour aller à l'écran d'inscription */}
            <Button title="S'inscrire" onPress={() => navigation.navigate('Register')} />
        </View>
    );
}

// Assurez-vous que vos styles sont correctement définis
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
  },
});

export default Home;

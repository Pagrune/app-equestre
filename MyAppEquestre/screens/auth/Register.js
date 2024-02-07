import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from 'react-native-axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useNavigation } from '@react-navigation/native';

const Register = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');

    const registerHandler = () => {
        // Vérifier si les champs sont valides
        if (email.trim() === '' || password.trim() === '' || passwordConfirm.trim() === '') {
            Alert.alert("Erreur", "Veuillez remplir tous les champs !");
            return;
        }
        else{
            if (password.length < 6) {
                Alert.alert("Erreur", "Le mot de passe doit contenir au moins 6 caractères !");
                return;
            }
            if (password !== passwordConfirm) {
                Alert.alert("Erreur", "Les mots de passe ne correspondent pas !");
                return;
            }
            else{
                // Requête POST à votre API pour enregistrer l'utilisateur
                axios.post('http://10.0.2.2:3000/auth/register', {
                    email,
                    password
                })
                .then(response => {
                    Alert.alert("Succès", "Inscription réussie !");
                    // get the token from the response
                    // const token = response.data.token;

                    // // save the token in the local storage
                    // AsyncStorage.setItem('userToken', token);

                    // navigate to the Home screen
                    navigation.navigate('ChoixDiscipline');
                })
                .catch(error => {
                    console.error(error);
                    Alert.alert("Erreur", "Échec de l'inscription");
                });
            }
            
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>S'inscrire</Text>
            <TextInput
                placeholder="Email"
                style={styles.input}
                keyboardType="email-address"
                value={email} // Liaison avec l'état local
                onChangeText={setEmail} // Mise à jour de l'état lors de la modification du texte
            />
            <TextInput
                placeholder="Mot de passe"
                style={styles.input}
                secureTextEntry
                value={password} // Liaison avec l'état local
                onChangeText={setPassword} // Mise à jour de l'état lors de la modification du texte
            />
            <TextInput
                placeholder="Confirmer le mot de passe"
                style={styles.input}
                secureTextEntry
                value={passwordConfirm} // Liaison avec l'état local
                onChangeText={setPasswordConfirm} // Mise à jour de l'état lors de la modification du texte
            />
            <Button title="S'inscrire" onPress={registerHandler} />
        </View>
    );
}

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

export default Register;

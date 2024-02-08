import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert, ImageBackground } from 'react-native';
import axios from 'react-native-axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useNavigation } from '@react-navigation/native';

import bgImage from '../../img/fleur_background.png';

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
        <View style={styles.containerout}>
            <ImageBackground source={bgImage} resizeMode="cover" style={styles.image}>
                <View style={styles.container}>
                    <Text style={styles.title}>S'inscrire</Text>
                    <View style={styles.connexdiv}>
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
                    </View>
                    <Button  color="#BA7868" title="S'inscrire" onPress={registerHandler} />
                </View>
            </ImageBackground>
        </View>
    );
}

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

export default Register;

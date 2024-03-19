import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, Image, TextInput , ImageBackground } from 'react-native';
import axios from 'react-native-axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


const InfosCavalier = ({ navigation }) => {
    const [nomcavalier, setNomCavalier] = useState({});
    const [prenomcavalier, setPrenomCavalier] = useState({});

    useEffect(() => {
    }, []);

    const handleInfosCavalier = async () => {
        if (nomcavalier.trim() === '' || prenomcavalier.trim() === '') {
            alert('Veuillez remplir tous les champs');
            return;
        } else {
            try {
                // get the token from the async storage
                const token = await AsyncStorage.getItem('userToken');
                await axios.post('http://10.0.2.2:3000/infoscompte/cavalier', {
                    nomcavalier,
                    prenomcavalier,
                    token
                });
                // Gestion de la réponse ou redirection ici
            } catch (error) {
                console.error(error);
                // Gérer l'erreur ici (affichage d'une alerte par exemple)
            }
        }
    }


    return (
        <View>
            <View>
                <Text style={styles.title}>Mes informations Cavalière</Text>
                <TextInput
                    style={styles.input}
                    placeholder='Nom'
                    onChangeText={(val) => setNomCavalier(val)}
                />
                <TextInput
                    style={styles.input}
                    placeholder='Prénom'
                    onChangeText={(val) => setPrenomCavalier(val)}  
                />
                <TouchableOpacity style={styles.button} onPress={handleInfosCavalier}>
                    <Text style={styles.buttonText}>Enregistrer mes informations</Text>
                </TouchableOpacity>
                
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imagebg: {
        flex: 1,
        justifyContent: 'center',
        width: '100%',
        height: '60%',
      },
    containerout: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: '#EDDCD4',
        position: 'relative',
        // height: '100vh',
      },
    title: {
        fontSize: 20,
        marginBottom: 20,
    },
    discipline: {
        alignItems: 'center',
        marginBottom: 20,
    },
    image: {
        width: 145, // Ajustez selon la taille désirée
        height: 150, // Ajustez selon la taille désirée
        marginBottom: 8, // Espace entre l'image et le texte
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
      button: {
        backgroundColor: '#C38D6B', 
        padding: 10, 
        borderRadius: 10, 
        alignItems: 'center', 
        marginVertical: 5,
        width: 250,
        alignSelf: 'center', 
      },
      buttonText: {
        color: '#EDDCD4',
      }, 
});

export default InfosCavalier;
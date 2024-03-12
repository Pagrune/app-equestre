import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, Image, TextInput , ImageBackground, Alert } from 'react-native';
import axios from 'react-native-axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const EnregCheval = ({ navigation }) => {
    const [nomcheval, setNomCheval] = useState('');

    const handleCheval = async () => {
        if (nomcheval.trim() === '') {
            Alert.alert('Attention', 'Veuillez remplir tous les champs');
            return;
        } else {
            try {
                // Récupérer le token depuis l'AsyncStorage
                const token = await AsyncStorage.getItem('userToken');
                const response = await axios.post('http://10.0.2.2:3000/infoscompte/cheval', {
                    nomcheval,
                    token
                });
                // Gérer la réponse ici, par exemple en naviguant vers un autre écran ou en affichant un message de succès
                Alert.alert('Succès', 'Cheval enregistré avec succès');
            } catch (error) {
                console.error(error);
                Alert.alert('Erreur', 'Un problème est survenu lors de l\'enregistrement du cheval');
            }
        }
    };

    return (
        <View>
            <View>
                <Text style={styles.title}>Ajouter un cheval</Text>
                <TextInput
                    placeholder="Nom du cheval"
                    style={styles.input}
                    onChangeText={setNomCheval} // Utilisez onChangeText pour mettre à jour l'état
                />
                <Button
                    title="Enregistrer mon cheval"
                    onPress={handleCheval}
                />
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
});

export default EnregCheval;
import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, Image, TextInput , ImageBackground } from 'react-native';
import axios from 'react-native-axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import EnregCheval from './EnregCheval';

const InfosCheval = ({ navigation }) => {
    const [meschevaux, setMesChevaux] = useState([]);

    useEffect(() => {
        const fetchResultats = async () => {
            try {
                const token = await AsyncStorage.getItem('userToken');
                // Assurez-vous d'envoyer le token si nécessaire pour votre endpoint
                const response = await axios.post('http://10.0.2.2:3000/infoscompte/meschevaux', { token });
                // console.log(response.data);
                setMesChevaux(response.data);
            } catch (error) {
                console.error('Erreur lors de la récupération des concours :', error);
            }
        };

        fetchResultats();
    }, []);

    return (
        <View>
            
                <View >
                <Text style={styles.title}>Mes chevaux</Text>
                {meschevaux.map(cheval => (
                    <View style={styles.discipline} key={cheval.cheval_id}>
                        <Text>{cheval.cheval_name}</Text>
                    </View>
                ))
                    
                }
                
                </View>
                <EnregCheval />
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
});

export default InfosCheval;
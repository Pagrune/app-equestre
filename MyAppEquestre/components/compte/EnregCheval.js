import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, Image, TextInput , ImageBackground } from 'react-native';
import axios from 'react-native-axios';


const EnregCheval = ({ navigation }) => {

    useEffect(() => {
    }, []);

    return (
        <View>
            
                <View >
                <Text style={styles.title}>Ajouter un cheval</Text>
                <TextInput
                    placeholder="Nom du cheval"
                    style={styles.input}
                />
                <TextInput
                    placeholder="Age du cheval"
                    style={styles.input}
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
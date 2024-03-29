import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, Image, TextInput , ImageBackground } from 'react-native';
import axios from 'react-native-axios';
import DropDownPicker from 'react-native-dropdown-picker';

import bgImage from '../../img/fleur_background.png';

import InfosCavalier from '../../components/compte/InfosCavalier';
import InfosCheval from '../../components/compte/InfosCheval';


const Compte = ({ navigation }) => {


    return (
        <View style={styles.containerout}>
            <ImageBackground source={bgImage} resizeMode="cover" style={styles.imagebg}>
                <View style={styles.container}>
                    <View style={styles.colorbg}>
                        <Text style={styles.title}>Mes informations</Text>
                        <InfosCavalier />
                        <InfosCheval />
                    </View>
                </View>
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    colorbg: {
        backgroundColor: 'rgba(166, 134, 119, 0.8)',
        padding: 20,
        borderRadius: 10,
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

export default Compte;
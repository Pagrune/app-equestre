import React from "react";
import { View, Text, Button, StyleSheet, TouchableOpacity, Image } from 'react-native';

import imgDressage from '../../img/img_dressage.png';
import imgCSO from '../../img/img_cso.png'; 
import imgCCE from '../../img/img_cce.png';


const ChoixDiscipline = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Choisissez une discipline</Text>
            <TouchableOpacity style={styles.discipline} onPress={() => navigation.navigate('Dressage')}>
                <Image source={imgDressage} style={styles.image} />
                <Text>Dressage</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.discipline} onPress={() => navigation.navigate('EnregCSO')}>
                <Image source={imgCSO} style={styles.image} />
                <Text>CSO</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.discipline} onPress={() => navigation.navigate('CCE')}>
                <Image source={imgCCE} style={styles.image} />
                <Text>CCE</Text>
            </TouchableOpacity>
        </View>
    );
}

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

export default ChoixDiscipline;
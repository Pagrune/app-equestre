import React from "react";
import { View, Text, Button, StyleSheet, TouchableOpacity, Image } from 'react-native';


const CreateCompteClient = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Renseigner mes informations cavalières</Text>
            
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

export default CreateCompteClient;
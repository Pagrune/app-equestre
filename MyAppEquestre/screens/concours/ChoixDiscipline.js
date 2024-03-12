import React from "react";
import { View, Text, Button, StyleSheet, TouchableOpacity, Image, ImageBackground } from 'react-native';

import imgDressage from '../../img/img_dressage.png';
import imgCSO from '../../img/img_cso.png'; 
import imgCCE from '../../img/img_cce.png';

import bgImage from '../../img/fleur_background.png';

const ChoixDiscipline = ({ navigation }) => {
    return (
        <View style={styles.containerout}>
            <ImageBackground source={bgImage} resizeMode="cover" style={styles.imagebg}>
                <View style={styles.container}>
                    <Text style={styles.title}>Choisissez une discipline</Text>
                    <TouchableOpacity style={styles.discipline} onPress={() => navigation.navigate('EnregDressage')}>
                        <Image source={imgDressage} style={styles.image} />
                        <Text>Dressage</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.discipline} onPress={() => navigation.navigate('EnregCSO')}>
                        <Image source={imgCSO} style={styles.image} />
                        <Text>CSO</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.discipline} onPress={() => navigation.navigate('EnregCCE')}>
                        <Image source={imgCCE} style={styles.image} />
                        <Text>CCE</Text>
                    </TouchableOpacity>
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

export default ChoixDiscipline;
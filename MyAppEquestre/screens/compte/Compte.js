import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, Image, TextInput , ImageBackground } from 'react-native';
import axios from 'react-native-axios';
import DropDownPicker from 'react-native-dropdown-picker';

import bgImage from '../../img/fleur_background.png';


const Compte = ({ navigation }) => {
    const [categorie, setCategorie] = useState("");

    useEffect(() => {
        // Récupération des catégories depuis le serveur
        axios.get('http://10.0.2.2:3000/cat/categories')
            .then(response => {
                // Conversion de la structure des données reçues pour qu'elles correspondent
                // à ce qui est attendu par DropDownPicker : [{label: 'Label', value: 'value'}, ...]
                const updatedItems = response.data.map(cat => ({
                    label: cat.categorie_name, // Utilisez cat.categorie_name ici
                    value: cat.categorie_id.toString() // Convertit categorie_id en chaîne pour la value
                }));
                setItems(updatedItems);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([]);

    return (
        <View style={styles.containerout}>
            <ImageBackground source={bgImage} resizeMode="cover" style={styles.imagebg}>
                <View style={styles.container}>
                <Text style={styles.title}>Mes informations</Text>
            {/* <TouchableOpacity style={styles.btn}>Général</TouchableOpacity>
            <TouchableOpacity style={styles.btn}>Cavalier</TouchableOpacity>
            <TouchableOpacity style={styles.btn}>Cheval</TouchableOpacity>
            <View style={styles.general}>
                <TextInput style={styles.input} placeholder="Email" />
                <TextInput style={styles.input} placeholder="Mot de Passe" />
                <TextInput style={styles.input} placeholder="Confirmer mot de passe" />

                <Button title="Enregistrer"/>

            </View>
            <View style={styles.cavalier}>
                <TextInput style={styles.input} placeholder="Nom" />
                <DropDownPicker
                        open={open}
                        value={value}
                        items={items}
                        setOpen={setOpen}
                        setValue={setValue}
                        setItems={setItems}
                        style={styles.dropdownPicker} // Styles pour le conteneur
                        dropDownContainerStyle={styles.dropdownContainer} // Styles pour le conteneur déroulant
                        labelStyle={{
                            color: '#EDDCD4', // Définissez la couleur du texte ici
                            // Vous pouvez ajouter d'autres styles de texte ici, par exemple :
                            // fontSize: 16,
                            fontWeight: 'bold',
                          }}
                        onChangeValue={(value) => {
                            // console.log("Valeur sélectionnée :", value);
                            setCategorie(value);
                        }}
                    />

            </View> */}

                
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

export default Compte;
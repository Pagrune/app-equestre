import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import axios from 'react-native-axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

import bgImage from '../../img/fleur_background.png';

const Resultat = ({ navigation }) => {
    const [resultats, setResultats] = useState([]);
    const [discipline, setDiscipline] = useState([]);
    const [selectedDiscipline, setSelectedDiscipline] = useState(null);

    useEffect(() => {
        const fetchResultats = async () => {
            try {
                const token = await AsyncStorage.getItem('userToken');
                // Assurez-vous d'envoyer le token si nécessaire pour votre endpoint
                const response = await axios.post('http://10.0.2.2:3000/concours/showconcours', { token });
                console.log(response.data);
                setResultats(response.data);
            } catch (error) {
                console.error('Erreur lors de la récupération des concours :', error);
            }
        };

        fetchResultats();
    }, []);
    // console.log(resultats);

    useEffect(() => {
        axios.get('http://10.0.2.2:3000/cat/discipline').then(response => {
            const discline = response.data.map(dis => ({
                label: dis.nom_discipline,
                value: dis.id_discipline.toString()
            }));
            setDiscipline(discline); 
        })
        .catch(error => {
            console.error(error);
        });
    }, []);

      console.log("discipline" + discipline);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        // Passer { locale: fr } comme troisième argument
        return format(date, "d MMMM yyyy", { locale: fr });
    }

    const handlefilter = (id) => {
        setSelectedDiscipline(id);
    }
    
      


    return (
        <View style={styles.containerout}>
            <ImageBackground source={bgImage} resizeMode="cover" style={styles.imagebg}>
                <View style={styles.container}>
                    <Text style={styles.title}>Mes concours enregistrés</Text>  
                    <View style={styles.flex}>
                        {discipline.map((dis, index) => (
                            <TouchableOpacity key={index} onPress={() => handlefilter(dis.value)} style={styles.btn}>
                                <Text style={styles.txt}>{dis.label}</Text>
                            </TouchableOpacity>
                        ))}
                        <TouchableOpacity onPress={() => setSelectedDiscipline(null)} style={styles.btn}>
                            <Text style={styles.txt}>Voir tous</Text>
                        </TouchableOpacity>
                    </View>                 
                    <View>
                        {resultats.filter(resultat => selectedDiscipline === null || resultat.discipline_id.toString() === selectedDiscipline)
                                .map((resultat, index) => (
                                    <View key={index} style={styles.resultatItem}>
                                        <Text style={styles.h2}>{resultat.concours_lieu}</Text>
                                        <View style={styles.flex}>
                                            <Text style={styles.txt}>{resultat.concours_classement}</Text>
                                            <Text style={styles.txt}>/</Text>
                                            <Text style={styles.txt}>{resultat.concours_participant}</Text>
                                        </View>
                                        <Text style={styles.txt}>{formatDate(resultat.concours_date)}</Text>
                                    </View>
                                ))}
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
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
    },
    btn: {
        backgroundColor: '#A68677', // Couleur de fond du bouton
        padding: 10, // Ajoutez du padding selon votre design
        borderRadius: 10, // Arrondir les coins du bouton
        alignItems: 'center', // Centrer le texte du bouton
        marginVertical: 5, // Espacement vertical entre les boutons
      },
    resultatItem: {
        backgroundColor: '#C38D6B',
        padding: 10,
        borderRadius: 10,
        margin: 10,
        color: 'white',
    },
    flex: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignSelf: 'stretch',
        alignItems: 'center',
      },
      h2: {
        fontSize: 18,
        color: 'white',
      },
      txt: {
        color: 'white',
      },
    // ... autres styles
});

export default Resultat;

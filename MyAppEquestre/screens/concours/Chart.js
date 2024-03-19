import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, Dimensions, ActivityIndicator } from 'react-native';
import axios from 'react-native-axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LineChart } from 'react-native-chart-kit';
import { format } from 'date-fns';

import bgImage from '../../img/fleur_background.png';

const Chart = ({ navigation }) => {
    const [resultats, setResultats] = useState([]);
    const [discipline, setDiscipline] = useState([]);
    const [selectedDiscipline, setSelectedDiscipline] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const token = await AsyncStorage.getItem('userToken');
                const resResultats = await axios.post('http://10.0.2.2:3000/concours/showconcours', { token });
                const resDiscipline = await axios.get('http://10.0.2.2:3000/cat/discipline');
                setResultats(resResultats.data);
                setDiscipline(resDiscipline.data.map(dis => ({
                    label: dis.nom_discipline,
                    value: dis.id_discipline.toString(),
                })));
            } catch (error) {
                console.error('Erreur lors de la récupération des données:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleFilter = (id) => {
        setSelectedDiscipline(id);
    };

    if (isLoading) {
        return (
            <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    const filteredResults = selectedDiscipline
        ? resultats.filter(r => r.discipline_id.toString() === selectedDiscipline)
        : resultats;

    const calculateQuartiles = () => {
        return filteredResults.map(resultat => {
            const pourcentage = (resultat.concours_classement / resultat.concours_participant) * 100;
            return pourcentage <= 25 ? 1 : pourcentage <= 50 ? 2 : pourcentage <= 75 ? 3 : 4;
        });
    };

    const quarts = calculateQuartiles();
    const datesFormatted = filteredResults.map(r => format(new Date(r.concours_date), 'dd-MM'));

    const dataForChart = {
        labels: datesFormatted,
        datasets: [
            {
                data: quarts,
                color: (opacity = 1) => `rgba(195, 141, 107, ${opacity})`,
                strokeWidth: 2,
            },
        ],
    };

    const screenWidth = Dimensions.get('window').width;
    const chartConfig = {
        backgroundGradientFrom: '#A68677',
        backgroundGradientTo: '#A68677',
        decimalPlaces: 2,
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        style: {
            borderRadius: 16,
        },
        propsForDots: {
            r: '6',
            strokeWidth: '2',
            stroke: '#ffa726',
        },
    };

    return (
        <View style={styles.container}>
            <ImageBackground source={bgImage} resizeMode="cover" style={styles.imagebg}>
                <Text style={styles.title}>Suivi des résultats</Text>
                <View style={styles.flex}>
                    {discipline.map((dis, index) => (
                        <TouchableOpacity
                            key={index}
                            onPress={() => handleFilter(dis.value)}
                            style={[
                                styles.btn,
                                selectedDiscipline === dis.value && styles.selectedBtn // Appliquer le style selectedBtn si la discipline est sélectionnée
                            ]}
                        >
                            <Text style={styles.txt}>{dis.label}</Text>
                        </TouchableOpacity>
                    ))}
                    <TouchableOpacity onPress={() => setSelectedDiscipline(null)} style={styles.btn}>
                        <Text style={styles.txt}>Voir tous</Text>
                    </TouchableOpacity>
                </View> 
                <LineChart
                    data={dataForChart}
                    width={screenWidth}
                    height={220}
                    chartConfig={chartConfig}
                />
            </ImageBackground>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imagebg: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
    },
    title: {
        fontSize: 24,
        marginBottom: 10,
    },
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    btn: {
        backgroundColor: '#A68677', // Couleur de fond du bouton par défaut
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
        marginVertical: 5,
    },
    selectedBtn: {
        backgroundColor: '#C38D6B', // Couleur de fond du bouton lorsqu'il est sélectionné
    },
    txt: {
        color: 'white',
    },
      flex: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignSelf: 'stretch',
        alignItems: 'center',
      },
    // Autres styles...
});

export default Chart;

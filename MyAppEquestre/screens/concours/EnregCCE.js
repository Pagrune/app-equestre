import React, { useState, useEffect, useCallback  } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ImageBackground, FlatList } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import DropDownPicker from 'react-native-dropdown-picker';
import axios from 'react-native-axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import bgImage from '../../img/fleur_background.png';


const EnregCCE = ({ navigation }) => {
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [categorie, setCategorie] = useState(null); // Use null for initial state when dealing with objects or arrays
  const [catname, setCatname] = useState('');
  const [open, setOpen] = useState(false);
  const [ouvert, setOuvert] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([]);
  const [openNiveau, setOpenNiveau] = useState(false);
  const [valueNiveau, setValueNiveau] = useState(null);
  const [itemsNiveau, setItemsNiveau] = useState([]);
  const [chevaux, setChevaux] = useState([]);
  const [selectedCheval, setSelectedCheval] = useState(null);

  const [lieu, setLieu] = useState('');
  const [jour, setJour] = useState('');
  const [mois, setMois] = useState('');
  const [annee, setAnnee] = useState('');
  const [classement, setClassement] = useState('');
  const [participant, setParticipant] = useState('');

  const dateEpreuve = `${annee}-${mois}-${jour}`;


  useFocusEffect(
    useCallback(() => {
      const fetchChevaux = async () => {
        const token = await AsyncStorage.getItem('userToken');
        try {
          const response = await axios.post('http://10.0.2.2:3000/infoscompte/propriete', { token });
          console.log('Chevaux:', response.data);
          // Ajustement ici : Mise à jour de la structure de l'array pour DropDownPicker
          const chevauxFormatted = response.data.map(cheval => ({
            label: cheval.cheval_name,
            value: cheval.cheval_id, // Supposant que chaque cheval a un identifiant unique `cheval_id`
          }));
          setChevaux(chevauxFormatted);
          // console.log('Chevaux formatted:', chevauxFormatted);
        } catch (error) {
          console.error(error);
        }
      };
      fetchChevaux();
    }, [])
  );

  useEffect(() => {
    axios.get('http://10.0.2.2:3000/cat/categories')
      .then(response => {
        const updatedItems = response.data.map(cat => ({
          label: cat.categorie_name,
          value: cat.categorie_id.toString()
        }));
        setItems(updatedItems);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    if (categorie) {
      axios.get(`http://10.0.2.2:3000/cat/niveau?categorie_id=${categorie}`)
        .then(response => {
          const updatedItemsNiveau = response.data.map(niv => ({
            label: `${catname} ${niv.niveau_name}`, // Prefix each level label with catname
            value: niv.niveau_id.toString()
          }));
          setItemsNiveau(updatedItemsNiveau);
        })
        .catch(error => {
          console.error(error);
        });
    }
  }, [categorie, catname]); // Add catname as a dependency to recalculate items when catname changes

  const onChange = (event, selectedDate) => {
    setShow(Platform.OS === 'ios');
    setDate(selectedDate || date); // Use selectedDate or current date if selectedDate is undefined
  };

  const handleCSO = async () => {
    const token = await AsyncStorage.getItem('userToken');
    const dateEpreuve = `${annee}-${mois}-${jour}`;
    try {
      const response = await axios.post('http://10.0.2.2:3000/enreg/cce', {
        token,
        concours_date: dateEpreuve,
        categorie_id: categorie,
        niveau_id: valueNiveau,
        classement,
        participant,
        selectedCheval,
        lieu
      });
      console.log(response.data);
      setDate(new Date());
      setCategorie(null);
      setCatname('');
      setValue(null); // Assurez-vous de réinitialiser les valeurs de DropDownPicker correctement
      setItemsNiveau([]);
      setSelectedCheval(null);
      setJour('');
      setMois('');
      setAnnee('');
      setClassement('');
      setParticipant('');
    } catch (error) {
      console.error(error);
    }
  }


  return (
    <ImageBackground source={bgImage} resizeMode="cover" style={styles.imageBackground}>
      <View style={styles.container}>
        <View style={styles.colorbg}>
          <Text style={styles.title}>Enregistrez votre concours complet</Text>
          <TextInput placeholder="Lieu du concours" style={styles.input} onChangeText={setLieu}/>

          <Text>Choisir mon cheval</Text>
          <DropDownPicker
            open={ouvert}
            value={selectedCheval} // Utilisation de l'état spécifique pour ce DropDown
            items={chevaux}
            setOpen={setOuvert}
            setValue={setSelectedCheval} // Mise à jour avec la fonction spécifique
            setItems={setChevaux}
            style={styles.dropdownPicker}
            dropDownContainerStyle={styles.dropdownContainer}
            labelStyle={styles.labelStyle}
            zIndex={3000}
            onChangeValue={(value) => {
              setSelectedCheval(value);
            }}
          />

          <Text>Choisir la date de l'épreuve</Text>
          <View style={styles.flex}>
            <TextInput 
              placeholder="JJ" 
              style={styles.input} 
              keyboardType="numeric" // Seuls des chiffres peuvent être entrés
              maxLength={2} // Limiter la saisie à 2 chiffres pour le jour
              onChangeText={setJour}
            />
            <TextInput 
              placeholder="MM" 
              style={styles.input} 
              keyboardType="numeric" // Seuls des chiffres peuvent être entrés
              maxLength={2} // Limiter la saisie à 2 chiffres pour le mois
              onChangeText={setMois}
            />
            <TextInput 
              placeholder="AAAA" 
              style={styles.input} 
              keyboardType="numeric" // Seuls des chiffres peuvent être entrés
              maxLength={4} // Limiter la saisie à 4 chiffres pour l'année
              onChangeText={setAnnee}
            />
          </View>

          

          <Text>Choisir ma catégorie d'épreuve</Text>
          <DropDownPicker
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            style={styles.dropdownPicker}
            dropDownContainerStyle={styles.dropdownContainer}
            labelStyle={styles.labelStyle}
            zIndex={9000}
            onChangeValue={(value) => {
              setCategorie(value);
              const selectedItem = items.find(item => item.value === value);
              setCatname(selectedItem ? selectedItem.label : '');
            }}
          />
          {categorie && (
            <View>
              <Text>Choisir le niveau</Text>
              <DropDownPicker
                open={openNiveau}
                value={valueNiveau}
                items={itemsNiveau}
                setOpen={setOpenNiveau}
                setValue={setValueNiveau}
                setItems={setItemsNiveau}
                style={styles.dropdownPicker2}
                dropDownContainerStyle={styles.dropdownContainer1}
                labelStyle={styles.labelStyle}
                zIndex={6000}
              />
            </View>
          )}

          <Text>Mon classement</Text>
          <View style={styles.flex}>
            <TextInput placeholder="4" style={styles.input} keyboardType="numeric" onChangeText={setClassement} />
            <Text>/</Text>
            <TextInput placeholder="47" style={styles.input} keyboardType="numeric" onChangeText={setParticipant}/>
          </View>
          <TouchableOpacity style={styles.button} onPress={handleCSO}>
            <Text style={styles.buttonText}>Enregistrer</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
    imageBackground: {
        flex: 1,
        justifyContent: 'center',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
    colorbg: {
        backgroundColor: 'rgba(166, 134, 119, 0.8)',
        padding: 20,
        borderRadius: 10,
    },
    title: {
        fontSize: 20,
        marginBottom: 20,
        color: '#EDDCD4',
        fontWeight: 'bold',
        textAlign: 'center',
    },

    connexdiv: {
        backgroundColor : '#A68677',
        padding: 20,
        borderRadius: 10,
        marginBottom: 20,
      },
      input: {
        marginBottom: 15,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 10,
        padding: 10,
        backgroundColor: 'white',
        color: '#A68677',
      },
      button: {
        backgroundColor: '#C38D6B', 
        padding: 10, 
        borderRadius: 10, 
        alignItems: 'center', 
        marginVertical: 5,
        width: 250,
        alignSelf: 'center', 
      },
      btndate: {
        backgroundColor: '#EDDCD4', 
        padding: 10, 
        borderRadius: 10, 
        alignItems: 'center',
        marginVertical: 5,
        width: 250,
        alignSelf: 'center',
      },
      dropdownPicker: {
        // Personnalisation du sélecteur
        backgroundColor: '#EDDCD4', 
        zIndex: 9000, 
       
      },
      dropdownPicker2: {
        // Personnalisation du sélecteur
        backgroundColor: '#EDDCD4', 
        zIndex: 6000, 
       
      },
      dropdownContainer: {
        // Personnalisation du conteneur déroulant
        backgroundColor: '#C38D6B', 
        zIndex: 9000, 
      },
      dropdownContainer1: {
        // Personnalisation du conteneur déroulant
        backgroundColor: '#C38D6B', 
        zIndex: 6000,
        position : 'absolute', 
      },
      flex: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignSelf: 'stretch',
        alignItems: 'center',
      },
      
    // Assurez-vous d'inclure la définition pour styles.input ici si elle est utilisée
});

export default EnregCCE;

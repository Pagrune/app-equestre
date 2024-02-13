import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Platform, TextInput, TouchableOpacity, ImageBackground } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import DropDownPicker from 'react-native-dropdown-picker';


import bgImage from '../../img/fleur_background.png';

const EnregCSO = ({ navigation }) => {
    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(false);
    const [selectedValue, setSelectedValue] = useState("select");

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        {label: 'Poney', value: 'poney'},
        {label: 'Club', value: 'club'},
        {label: 'Amateur', value: 'amateur'},
        {label: 'Pro', value: 'pro'},
    ]);

    const [openNiveau, setOpenNiveau] = useState(false);
    const [valueNiveau, setValueNiveau] = useState(null);
    const [itemsNiveau, setItemsNiveau] = useState([
        {label: '4', value: '4'},
        {label: '3', value: '3'},
        {label: '2', value: '2'},
        {label: '1', value: '1'},
        {label: 'Elite', value: 'elite'}
        // Ajoutez d'autres niveaux ici
    ]);
    


    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
    };

    const showDatepicker = () => {
        setShow(true);
    };

    return (
        <View style={styles.containerout}>
            <ImageBackground source={bgImage} resizeMode="cover" style={styles.image}>
            <View style={styles.container}>
                <Text style={styles.title}>Enregistrez votre concours de CSO</Text>
                <View>
                    <View >
                        <Text>Lieu</Text>
                        <TextInput
                            placeholder="Lieu du concours"
                            style={styles.input}
                        />
                    </View>
                    <Button title="Choisir une date" onPress={showDatepicker} />
                    {show && (
                        <DateTimePicker
                            value={date}
                            mode="date"
                            display="default"
                            onChange={onChange}
                        />
                    )}
                    <Text>Choisir ma catégorie d'épreuve</Text>
                   
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
                          zIndex={5000}
                          zIndexInverse={6000}
                    />
                    <Text>Choisir le niveau</Text>
                    <DropDownPicker
                        // style={styles.dropdownPicker2}
                        open={openNiveau}
                        value={valueNiveau}
                        items={itemsNiveau.map(item => ({
                            label: value ? `${value} ${item.label}` : item.label,
                            value: item.value
                        }))}
                        setOpen={setOpenNiveau}
                        setValue={setValueNiveau}
                        setItems={setItemsNiveau}
                        style={styles.dropdownPicker2}
                        dropDownContainerStyle={styles.dropdownContainer1}
                        labelStyle={{
                            color: '#EDDCD4',
                            fontWeight: 'bold',
                            // Autres styles de texte ici
                        }}
                        zIndex={1}
                        zIndexInverse={6000}
                        // position="absolute"
                    />

                </View>
                <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('ChoixDiscipline')}
                >
                    <Text style={styles.buttonText}>Enregistrer</Text>
                </TouchableOpacity>
            </View>
            </ImageBackground>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
      },
    image: {
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
        borderRadius: 5,
        padding: 10,
        backgroundColor: '#EDDCD4',
        color: '#A68677',
      },
      button: {
        backgroundColor: '#EDDCD4', // Couleur de fond du bouton
        padding: 10, // Ajoutez du padding selon votre design
        borderRadius: 10, // Arrondir les coins du bouton
        alignItems: 'center', // Centrer le texte du bouton
        marginVertical: 5, // Espacement vertical entre les boutons
      },
      dropdownPicker: {
        // Personnalisation du sélecteur
        backgroundColor: '#A68677', 
        zIndex: 9000, 
       
      },
      dropdownPicker2: {
        // Personnalisation du sélecteur
        backgroundColor: '#A68677', 
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
    // Assurez-vous d'inclure la définition pour styles.input ici si elle est utilisée
});

export default EnregCSO;

import React from "react";
import { View, Text, Button, StyleSheet } from 'react-native';

const EnregCSO = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Enregistrez votre concours de CSO</Text>
            <Button title="Enregistrer" onPress={() => navigation.navigate('ChoixDiscipline')} />
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
});


export default EnregCSO;
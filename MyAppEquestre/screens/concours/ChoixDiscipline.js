import React from "react";
import { View, Text, Button, StyleSheet } from 'react-native';

const ChoixDiscipline = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Choisissez une discipline</Text>
            <Button title="Dressage" onPress={() => navigation.navigate('Dressage')} />
            <Button title="CSO" onPress={() => navigation.navigate('CSO')} />
            <Button title="CCE" onPress={() => navigation.navigate('CCE')} />
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

export default ChoixDiscipline;
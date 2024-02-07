import React from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';

const Register = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>S'inscrire</Text>
            <TextInput
                placeholder="Nom complet"
                style={styles.input}
            />
            <TextInput
                placeholder="Email"
                style={styles.input}
                keyboardType="email-address"
            />
            <TextInput
                placeholder="Mot de passe"
                style={styles.input}
                secureTextEntry
            />
            <TextInput
                placeholder="Confirmer le mot de passe"
                style={styles.input}
                secureTextEntry
            />
            <Button title="S'inscrire" />
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      padding: 20,
    },
    title: {
      fontSize: 24,
      marginBottom: 20,
      textAlign: 'center',
    },
    input: {
      marginBottom: 15,
      borderWidth: 1,
      borderColor: 'gray',
      borderRadius: 5,
      padding: 10,
    },
  });

export default Register;
import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, Platform, TextInput, TouchableOpacity, ImageBackground } from 'react-native';

const SettingsScreen = () => {
    return (
        <View style={styles.container}>
            <Text>Settings</Text>
        </View>
    );
};

export default SettingsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
      },
});
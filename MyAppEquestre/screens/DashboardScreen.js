import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, Platform, TextInput, TouchableOpacity, ImageBackground } from 'react-native';

const DashboardScreen = () => {
    return (
        <View style={styles.container}>
            <Text>Dashboard</Text>
        </View>
    );
};

export default DashboardScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
      },
});
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function index() {
    return (
        <View style={styles.container}>
            <Text>云商店</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});

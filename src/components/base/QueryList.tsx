import React from 'react';
import { FlatListProps, StyleSheet, Text, View } from 'react-native';

export interface QueryListProps extends FlatListProps {
    renderItem: Function;
    dataOptionChain?: string;
    style?: ViewStyle;
}
export default function QueryList() {
    return (
        <View>
            <Text>111</Text>
        </View>
    );
}

const styles = StyleSheet.create({});

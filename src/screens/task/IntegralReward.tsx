import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavBarHeader } from '~/components';

export default function IntegralReward() {
    return (
        <View style={styles.container}>
            <NavBarHeader title={'积分签到'} />
            
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});

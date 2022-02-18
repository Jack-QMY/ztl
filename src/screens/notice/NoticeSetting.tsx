import React, { useCallback, useState } from 'react';
import { StyleSheet, Switch, Text, View } from 'react-native';
import { NavBarHeader } from '~/components';

export default function NoticeSetting() {
    const [isEnabled, setIsEnabled] = useState(true);
    const [isSong, setIsSong] = useState(true);
    const [isVibration, setIsVibration] = useState(true);

    const onValueChange = useCallback(() => {
        setIsEnabled(!isEnabled);
    }, [isEnabled]);
    const onValueChange1 = useCallback(() => {
        setIsSong(!isSong);
    }, [isSong]);
    const onValueChange2 = useCallback(() => {
        setIsVibration(!isVibration);
    }, [isVibration]);
    return (
        <View style={styles.container}>
            <NavBarHeader title="新消息通知" />
            <View style={styles.listItem}>
                <Text style={styles.title}>横幅消息通知</Text>
                <Switch value={isEnabled} onValueChange={onValueChange} />
            </View>
            <View style={[styles.listItem, { marginTop: pixel(14) }]}>
                <Text style={styles.title}>系统声音</Text>
                <Switch value={isSong} onValueChange={onValueChange1} />
            </View>
            <View style={styles.listItem}>
                <Text style={styles.title}>系统振动</Text>
                <Switch value={isVibration} onValueChange={onValueChange2} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    listItem: {
        backgroundColor: '#fff',
        padding: pixel(Theme.edgeDistance),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    title: {
        fontSize: font(14),
        color: '#000',
    },
});

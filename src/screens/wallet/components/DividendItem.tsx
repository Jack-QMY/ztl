import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Row } from '~/components';

interface Props {
    dividend: any;
    type?: 'add' | 'reduce';
}
export default function DividendItem(props: Props) {
    const { dividend, type } = props;
    return (
        <View style={styles.container}>
            <Row style={{ justifyContent: 'space-between' }}>
                <Text style={styles.title}>{dividend.title}</Text>
                {type === 'add' ? (
                    <Text style={styles.num1}>+ {dividend.num}</Text>
                ) : (
                    <Text style={styles.num2}>- {dividend.num}</Text>
                )}
            </Row>
            <Text style={styles.creat_time}>{dividend.creat_time}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        padding: pixel(14),
        borderRadius: pixel(6),
    },
    title: {
        color: '#000',
        fontSize: font(14),
        fontWeight: 'bold',
    },
    creat_time: {
        color: 'grey',
        marginTop: pixel(10),
    },
    num1: {
        color: '#F93137',
        fontSize: font(16),
        fontWeight: 'bold',
    },
    num2: {
        color: '#000',
        fontSize: font(16),
        fontWeight: 'bold',
    },
});

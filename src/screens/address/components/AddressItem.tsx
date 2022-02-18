import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Row, SvgIcon, SvgPath } from '~/components';

export default function AddressItem({ address }) {
    const navigation = useNavigation();
    const arrName = address?.name.split('', 1);

    return (
        <View style={styles.container}>
            <Row>
                <View style={styles.addRessBorder}>
                    <Text style={styles.addRessBorderText}>{arrName[0]}</Text>
                </View>
                <View style={styles.other}>
                    <Row>
                        <Text>{address?.name}</Text>
                        <Text style={styles.phone}>{address?.phone}</Text>
                    </Row>
                    <Row style={{ marginTop: pixel(10) }}>
                        <SvgIcon name={SvgPath.address1} size={20} color="#FF4D3A" />
                        <Text style={styles.address} numberOfLines={2}>
                            {address?.address}
                        </Text>
                    </Row>
                </View>
            </Row>
            <Pressable onPress={() => navigation.navigate('EditAddress', { address })}>
                <SvgIcon name={SvgPath.edit} size={24} color="#B0B0B0" />
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        padding: pixel(14),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    addRessBorder: {
        width: pixel(40),
        height: pixel(40),
        borderRadius: pixel(20),
        backgroundColor: '#FF4D3A',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: pixel(14),
    },
    addRessBorderText: {
        color: '#FFF',
        fontSize: font(14),
        fontWeight: 'bold',
    },
    phone: {
        color: 'grey',
        marginLeft: pixel(10),
        fontSize: font(12),
    },
    other: {
        width: '70%',
    },
    address: {
        marginLeft: pixel(4),
    },
});

import { useNavigation } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Row, SvgIcon, SvgPath } from '~/components';

interface Props {
    address: any;
    addRecordAddress: Function;
    setSelectAddress: Function;
}

export default function SerachAddressItem(props: Props) {
    const { address, addRecordAddress, setSelectAddress } = props;
    const navigation = useNavigation();
    const addressDetails = address?.pname + address?.cityname + address?.adname + address?.address + address?.name;
    const onPress = useCallback(() => {
        addRecordAddress();
        setSelectAddress(addressDetails);
        navigation.goBack();
    }, [addressDetails, addRecordAddress, setSelectAddress, navigation]);

    return (
        <View>
            <TouchableOpacity style={styles.container} onPress={onPress}>
                <Row>
                    <SvgIcon name={SvgPath.address} color={'#FF4D3A'} size={20} />
                    <Text style={styles.title}>{address?.name}</Text>
                </Row>
                <Text style={styles.addressDetails}>{addressDetails}</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        borderBottomWidth: 1,
        marginVertical: pixel(14),
        paddingBottom: pixel(10),
        borderColor: '#EEEEEE',
    },
    title: {
        fontSize: font(14),
        color: '#191919',
        marginLeft: pixel(8),
    },
    addressDetails: {
        marginTop: pixel(6),
        color: '#9A9A9A',
        marginLeft: pixel(28),
    },
});

import Clipboard from '@react-native-community/clipboard';
import React, { useCallback } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import QRCode from 'react-native-qrcode-svg';
import { NavBarHeader } from '~/components';

export default function PayAddress() {
    // 复制用户id
    const clipboard = useCallback((res) => {
        Clipboard.setString(res.toString() || '0x00');
        Toast.show({ content: '复制成功' });
    }, []);
    return (
        <View style={styles.container}>
            <NavBarHeader title="收款" />
            <View style={styles.content}>
                <View style={styles.QRContainer}>
                    <QRCode
                        value="https://reactnative.cn/docs/0.66/pressable"
                        size={pixel(140)}
                        color={'#000'}
                        backgroundColor={'#FFF'}
                    />
                    <View style={styles.addressContainer}>
                        <Text style={styles.addressTitle}>收款地址</Text>
                        <Text style={styles.address}>0x0x0x0x0x0ss12234c00xs</Text>
                    </View>
                    <LinearGradient
                        style={styles.linearGradientStyle}
                        start={{ x: 1, y: 0 }}
                        end={{ x: 0, y: 1 }}
                        colors={['#FE4949', '#FD7420']}>
                        <Pressable style={styles.button} onPress={() => clipboard('1')}>
                            <Text style={styles.buttonText}>复制</Text>
                        </Pressable>
                    </LinearGradient>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Theme.groundColour,
    },
    content: {
        backgroundColor: '#F93137',
        flex: 1,
        paddingHorizontal: pixel(14),
        paddingTop: pixel(20),
    },
    QRContainer: {
        backgroundColor: '#FFF',
        width: Device.width - pixel(28),
        paddingHorizontal: pixel(14),
        paddingVertical: pixel(30),
        borderRadius: pixel(6),
        alignItems: 'center',
    },
    qrtImage: {
        width: pixel(200),
        height: pixel(200),
    },
    addressContainer: {
        backgroundColor: '#F6F5F3',
        padding: pixel(14),
        width: Device.width - pixel(56),
        marginTop: pixel(30),
        alignItems: 'center',
        borderRadius: pixel(6),
    },
    addressTitle: {
        fontSize: font(14),
        color: '#bbbbbb',
    },
    address: {
        marginTop: pixel(14),
    },
    linearGradientStyle: {
        marginTop: pixel(30),
        borderRadius: 8,
        marginHorizontal: pixel(14),
    },
    button: {
        height: pixel(48),
        width: pixel(200),
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: font(14),
        fontWeight: 'bold',
    },
});

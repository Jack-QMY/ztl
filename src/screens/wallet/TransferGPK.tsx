import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { NavBarHeader, Row } from '~/components';

export default function TransferGPK() {
    const navigation = useNavigation();
    const [formData, setFormData] = useState({
        phone: '',
        num: '',
        password: '',
    });
    return (
        <View style={styles.container}>
            <NavBarHeader
                title="GPK转赠"
                rightComponent={
                    <Pressable style={{ marginRight: pixel(14) }}>
                        <Text>转赠记录</Text>
                    </Pressable>
                }
            />
            <View style={[styles.row, styles.list]}>
                <Text style={styles.leftTitle}>赠送对象</Text>
                <TextInput
                    placeholder="请输入收款人手机号"
                    maxLength={11}
                    value={formData.phone}
                    onChangeText={(value) =>
                        setFormData({
                            ...formData,
                            phone: value,
                        })
                    }
                />
            </View>
            <View style={[styles.row1, styles.list]}>
                <Row>
                    <Text style={styles.leftTitle}>转账数量</Text>
                    <TextInput
                        placeholder="请输入转账数量"
                        maxLength={11}
                        value={formData.num}
                        onChangeText={(value) =>
                            setFormData({
                                ...formData,
                                num: value,
                            })
                        }
                    />
                </Row>
                <Pressable>
                    <Text style={styles.rightTitle}>全部</Text>
                </Pressable>
            </View>
            <View style={[styles.row1, styles.list]}>
                <Row>
                    <Text style={styles.leftTitle}>支付密码</Text>
                    <TextInput
                        placeholder="请输入支付密码"
                        secureTextEntry={true}
                        maxLength={11}
                        value={formData.password}
                        onChangeText={(value) =>
                            setFormData({
                                ...formData,
                                password: value,
                            })
                        }
                    />
                </Row>
                <Pressable onPress={() => navigation.navigate('AccountScreen')}>
                    <Text style={styles.rightTitle}>设置支付密码</Text>
                </Pressable>
            </View>
            <View style={[styles.row, styles.list]}>
                <Text style={styles.leftTitle}>手续费用</Text>
                <Text>0.00 GPK</Text>
            </View>
            <View style={[styles.row, styles.list]}>
                <Text style={styles.leftTitle}>到账GPK</Text>
                <Text>0.00 GPK</Text>
            </View>
            <LinearGradient
                style={styles.linearGradientStyle}
                start={{ x: 1, y: 0 }}
                end={{ x: 0, y: 1 }}
                colors={['#FE4949', '#FD7420']}>
                <Pressable style={styles.button}>
                    <Text style={styles.buttonText}>确认转赠</Text>
                </Pressable>
            </LinearGradient>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Theme.groundColour,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    row1: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    rightTitle: {
        color: '#FE4949',
        fontWeight: 'bold',
    },
    leftTitle: {
        color: '#000',
        marginRight: pixel(10),
        width: Device.width - (Device.width - pixel(60)),
    },
    list: {
        borderBottomWidth: 1,
        paddingHorizontal: pixel(14),
        borderBottomColor: '#EEEEEE',
        height: pixel(60),
        backgroundColor: '#fff',
    },
    linearGradientStyle: {
        marginTop: pixel(30),
        borderRadius: 8,
        marginHorizontal: pixel(14),
    },
    button: {
        height: pixel(48),
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: font(14),
        fontWeight: 'bold',
    },
});

import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { NavBarHeader, Row, ScanQRCodeModal } from '~/components';

export default function ExchangeGPK() {
    const navigation = useNavigation();
    const [visible, setVisiable] = useState(false);
    const [formData, setFormData] = useState({
        password: '',
        num: '',
    });
    const [address, setAddess] = useState('');
    return (
        <View style={styles.container}>
            <NavBarHeader
                title="GPK闪兑"
                rightComponent={
                    <Pressable style={{ marginRight: pixel(14) }}>
                        <Text>闪兑记录</Text>
                    </Pressable>
                }
            />
            <View style={[styles.row, styles.list]}>
                <Text style={styles.leftTitle}>GPK总量</Text>
                <Text>998.008878</Text>
            </View>
            <View style={[styles.row1, styles.list]}>
                <Row>
                    <Text style={styles.leftTitle}>闪兑地址</Text>
                    <TextInput
                        placeholder="请输入钱包地址"
                        value={address}
                        style={styles.textInput}
                        onChangeText={(value) => setAddess(value)}
                    />
                </Row>
                <Pressable onPress={() => setVisiable(true)}>
                    <Text style={styles.rightTitle}>扫码</Text>
                </Pressable>
            </View>
            <View style={[styles.row, styles.list]}>
                <Text style={styles.leftTitle}>转账数量</Text>
                <TextInput
                    placeholder="请输入转账数量"
                    value={formData.num}
                    onChangeText={(value) =>
                        setFormData({
                            ...formData,
                            num: value,
                        })
                    }
                />
            </View>
            <View style={[styles.row1, styles.list]}>
                <Row>
                    <Text style={styles.leftTitle}>支付密码</Text>
                    <TextInput
                        placeholder="请输入支付密码"
                        secureTextEntry={true}
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
                    <Text style={styles.buttonText}>确认闪兑</Text>
                </Pressable>
            </LinearGradient>
            <ScanQRCodeModal visible={visible} toggleVisible={() => setVisiable(false)} setContent={setAddess} />
        </View>
    );
}

const styles = StyleSheet.create({
    textInput: {
        width: Device.width - pixel(120),
    },
    container: {
        flex: 1,
        backgroundColor: Theme.groundColour,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
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
    row1: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    rightTitle: {
        color: '#FE4949',
        fontWeight: 'bold',
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

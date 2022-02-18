import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { DialogModal, NavBarHeader, Row } from '~/components';

const data = [
    {
        id: 1,
        price: 50,
        new_price: 49.8,
    },
    {
        id: 2,
        price: 100,
        new_price: 99.6,
    },
    {
        id: 3,
        price: 200,
        new_price: 199.2,
    },
    {
        id: 4,
        price: 500,
        new_price: 498,
    },
    {
        id: 5,
        price: 1000,
        new_price: 996,
    },
];

export default function PhoneRecharge() {
    const navigation = useNavigation();
    const [visible, setVisible] = useState(false);
    const [phone, setPhone] = useState();
    const [subview, setSubview] = useState(data);
    const [indexOf, setIndexOf] = useState(-1);
    const [pay, setPay] = useState();
    const SelectIndex = useCallback(
        (num) => {
            setIndexOf(num);
            setPay(subview[num].new_price);
        },
        [subview],
    );
    const onPress = useCallback(() => {
        if (!phone || !pay) {
            Toast.show({ content: !phone ? '请输入手机号码' : '请选择话费充值金额' });
        } else {
            setVisible(true);
        }
    }, [phone, pay]);

    const [password, setPassword] = useState('');
    const renderText = useMemo(() => {
        let inputs = [];
        for (let i = 0; i < 6; i++) {
            inputs.push(
                <Text style={[styles.text, password.length === i ? styles.focusText : null]} key={i}>
                    {password[i]}
                </Text>,
            );
        }
        return inputs;
    }, [password]);
    const onConfirm = useCallback(() => {
        if (password.length < 6) {
            Toast.show({ content: '请输入支付密码', layout: 'top' });
        } else {
            setVisible(false);
            setPassword('');
            Toast.show({ content: '支付成功' });
            navigation.goBack();
        }
    }, [password, navigation]);
    return (
        <View style={styles.container}>
            <NavBarHeader title="话费充值" />
            <View style={styles.inputView}>
                <TextInput
                    placeholder="请输入手机号码"
                    maxLength={11}
                    keyboardType="numeric"
                    value={phone}
                    onChangeText={(value) => setPhone(value)}
                />
            </View>
            <View style={styles.selectContainer}>
                {subview.map((item, index) => {
                    return (
                        <Pressable
                            key={index}
                            style={[
                                styles.pressableBorder,
                                {
                                    backgroundColor: index === indexOf ? '#FE4949' : '#F7F5F6',
                                },
                            ]}
                            onPress={() => SelectIndex(index)}>
                            <Text style={[styles.price, indexOf === index && styles.other]}>¥{item.price}</Text>
                            <Text style={[styles.new_price, indexOf === index && styles.other]}>
                                售价:{item.new_price}元
                            </Text>
                        </Pressable>
                    );
                })}
            </View>
            <LinearGradient
                style={styles.linearGradientStyle}
                start={{ x: 1, y: 0 }}
                end={{ x: 0, y: 1 }}
                colors={['#FE4949', '#FD7420']}>
                <Pressable style={styles.button} onPress={onPress}>
                    <Text style={styles.buttonText}>确认充值</Text>
                </Pressable>
            </LinearGradient>
            <DialogModal
                visible={visible}
                toggleVisible={() => setVisible(false)}
                title="请输入支付密码"
                onCancel={() => {
                    setVisible(false);
                    setPassword('');
                }}
                onConfirm={onConfirm}>
                <View style={styles.codeContainer}>
                    <Row style={{ justifyContent: 'center' }}>{renderText}</Row>
                    <TextInput
                        value={password}
                        onChangeText={(text) => setPassword(text)}
                        maxLength={6}
                        autoFocus={true}
                        keyboardType="numeric"
                        style={styles.intextInputStyle}
                        selectionColor="transparent"
                    />
                </View>
            </DialogModal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
    },
    inputView: {
        margin: pixel(14),
        backgroundColor: '#F7F5F6',
        height: pixel(40),
        justifyContent: 'center',
        paddingHorizontal: pixel(10),
    },
    selectContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: pixel(14),
        flexWrap: 'wrap',
    },
    pressableBorder: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: pixel(20),
        paddingVertical: pixel(10),
        marginRight: pixel(10),
        marginVertical: pixel(10),
        borderRadius: pixel(6),
    },
    price: {
        fontSize: font(16),
        fontWeight: 'bold',
        color: '#000',
    },
    new_price: {
        fontSize: font(12),
        marginTop: pixel(10),
    },
    linearGradientStyle: {
        marginTop: pixel(24),
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
    other: {
        color: '#fff',
    },
    codeContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: pixel(20),
    },
    text: {
        height: pixel(40),
        width: pixel(40),
        borderWidth: 1,
        borderColor: '#BBBBBB',
        color: '#000',
        fontSize: font(16),
        padding: pixel(10),
        marginLeft: pixel(10),
    },
    intextInputStyle: {
        width: 400,
        height: pixel(20),
        fontSize: 25,
        color: 'transparent',
    },
});

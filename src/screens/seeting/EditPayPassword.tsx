import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { NavBarHeader } from '~/components';
import { userStore } from '~/store';

export default function EditPayPassword() {
    const navigation = useNavigation();

    const userInfo = userStore.me.userinfo;
    const [password, setPassWord] = useState('');
    const onPress = useCallback(() => {
        if (password.length < 6) {
            Toast.show({ content: '密码长度必须6位以上!' });
        } else {
            navigation.popToTop();
            Toast.show({ content: '修改密码成功' });
        }
    }, [password, navigation]);

    return (
        <View style={styles.container}>
            <NavBarHeader />
            <View style={styles.content}>
                <Text style={styles.title}>修改{userInfo?.username}的支付密码</Text>
                <View style={styles.inputBody}>
                    <TextInput
                        placeholder="请填写您的新支付密码"
                        value={password}
                        onChangeText={(text) => setPassWord(text)}
                        secureTextEntry={true}
                        style={{ height: pixel(60) }}
                    />
                </View>
                <Pressable
                    onPress={onPress}
                    style={[styles.button, { backgroundColor: password.length <= 0 ? '#F0F0F0' : Theme.primaryColor }]}
                    disabled={password.length <= 0}>
                    <Text style={[styles.buttonText, { color: password.length <= 0 ? '#BBBBBB' : '#fff' }]}>
                        修改支付密码
                    </Text>
                </Pressable>
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
        marginHorizontal: pixel(Theme.edgeDistance) * 2,
        marginTop: pixel(Theme.edgeDistance) * 4,
    },
    title: {
        fontSize: font(16),
        fontWeight: 'bold',
        color: '#000',
    },
    inputBody: {
        backgroundColor: '#F0F0F0',
        marginTop: pixel(Theme.edgeDistance) * 4,
        paddingHorizontal: pixel(10),
        borderRadius: 6,
    },
    button: {
        marginTop: pixel(Theme.edgeDistance) * 2,
        height: pixel(40),
        borderRadius: 6,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        fontSize: font(14),
    },
});

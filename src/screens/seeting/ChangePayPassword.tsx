import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useMemo, useState } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { useAuthCode } from '~/common';
import { NavBarHeader, Row } from '~/components';
import { userStore } from '~/store';

export default function ChangePayPassword() {
    const navigation = useNavigation();
    const userInfo = userStore.me.userinfo;
    const [code, setCode] = useState('');
    const getCode = '123456'; //测试验证码
    const renderText = useMemo(() => {
        let inputs = [];
        for (let i = 0; i < 6; i++) {
            inputs.push(
                <Text style={[styles.text, code.length === i ? styles.focusText : null]} key={i}>
                    {code[i]}
                </Text>,
            );
        }
        return inputs;
    }, [code]);
    const onEndEditing = useCallback(() => {
        if (code === getCode) {
            navigation.navigate('EditPayPassword');
        } else {
            Toast.show({ content: '验证码输入不正确，请重新输入' });
        }
    }, [code, getCode]);

    // 获取验证码
    const { fetchAuthCode, countDown, loading } = useAuthCode();
    return (
        <View style={styles.container}>
            <NavBarHeader />
            <View style={styles.content}>
                <Text style={styles.title}>请输入短信验证码</Text>
                <Text style={styles.codeNumber}>短信验证码将发至{userInfo?.mobile}</Text>

                <View style={styles.codeContainer}>
                    <Row style={{ justifyContent: 'center' }}>{renderText}</Row>
                    <TextInput
                        value={code}
                        onChangeText={(text) => setCode(text)}
                        maxLength={6}
                        autoFocus={true}
                        underlineColorAndroid="transparent"
                        keyboardType="numeric"
                        style={styles.intextInputStyle}
                        selectionColor="transparent"
                        onEndEditing={onEndEditing}
                    />
                </View>
                <Pressable onPress={() => fetchAuthCode(userInfo?.mobile)} disabled={loading || !!countDown}>
                    {loading ? (
                        <ActivityIndicator size={'small'} color={Theme.primaryColor} />
                    ) : (
                        <Text style={[styles.grayText, !countDown && { color: Theme.primaryColor }]}>
                            {countDown == 0 ? '重新发送' : `${countDown}秒后重新发送`}
                        </Text>
                    )}
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
    codeNumber: {
        marginTop: pixel(10),
        color: '#BBBBBB',
        fontSize: font(10),
    },
    codeContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: pixel(20),
    },
    text: {
        height: pixel(40),
        width: pixel(40),
        lineHeight: pixel(40),
        backgroundColor: '#bbbbbb',
        color: '#FFF',
        fontSize: font(16),
        marginRight: 16,
        textAlign: 'center',
    },
    focusText: {
        backgroundColor: Theme.primaryColor,
    },
    intextInputStyle: {
        width: 400,
        height: pixel(60),
        fontSize: 25,
        color: 'transparent',
    },
    grayText: {
        fontSize: font(13),
        color: '#909090',
    },
});

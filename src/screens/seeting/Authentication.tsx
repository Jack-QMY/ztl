import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { NavBarHeader } from '~/components';

export default function Authentication() {
    const navigation = useNavigation();
    const [formData, setFormData] = useState({
        name: '',
        number: '',
    });

    const onPress = useCallback(() => {
        if (formData.name.length > 0 && formData.number.length > 0) {
            Toast.show({ content: '认证成功' });
            navigation.goBack();
        } else {
            Toast.show({ content: '资料没有填写完善~' });
        }
    }, [formData]);

    return (
        <View style={styles.container}>
            <NavBarHeader title="实名认证" />
            <View style={styles.inputView}>
                <Text style={styles.title}>真实姓名</Text>
                <TextInput
                    placeholderTextColor={'#bbbbbb'}
                    placeholder="请填写姓名"
                    value={formData.name}
                    onChangeText={(text) => {
                        setFormData({
                            ...formData,
                            name: text,
                        });
                    }}
                />
            </View>
            <View style={styles.inputView}>
                <Text style={styles.title}>身份证号码</Text>
                <TextInput
                    placeholderTextColor={'#bbbbbb'}
                    placeholder="请填写身份证号码"
                    value={formData.number}
                    onChangeText={(text) => {
                        setFormData({
                            ...formData,
                            number: text,
                        });
                    }}
                />
            </View>
            <LinearGradient
                style={{ marginHorizontal: pixel(14), marginTop: pixel(20), borderRadius: 8 }}
                start={{ x: 1.5, y: 0 }}
                end={{ x: 0, y: 0.6 }}
                colors={['#FD4A22', '#FE0102']}>
                <Pressable style={styles.button} onPress={onPress}>
                    <Text style={styles.buttonText}>提交</Text>
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
    inputView: {
        borderWidth: 1,
        borderColor: '#EEEEEE',
        flexDirection: 'row',
        alignItems: 'center',
        height: pixel(60),
        paddingHorizontal: pixel(14),
    },
    title: {
        fontSize: font(12),
        color: '#000',
        marginRight: pixel(10),
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

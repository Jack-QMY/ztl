import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { ItemSeparator, ListItem, NavBarHeader, SvgIcon, SvgPath } from '~/components';
import { userStore } from '~/store';

export default function AccountScreen() {
    const navigation = useNavigation();
    const [visiable, setVisiable] = useState(false);
    const [code, setCode] = useState('');
    const onConfirm = useCallback(() => {
        setVisiable(false);
        userStore.signOut();
        Toast.show({ content: '注销成功' });
        navigation.navigate('Main', null, navigation.navigate('MallScreeen'));
    }, [navigation]);
    return (
        <View style={styles.container}>
            <NavBarHeader title="账户与安全" />
            <ListItem
                onPress={() => navigation.navigate('Register', { type: 'forgotPwd' })}
                style={styles.list}
                leftComponent={<Text style={styles.leftTitle}>修改登录密码</Text>}
                rightComponent={<SvgIcon name={SvgPath.rightArrow} size={28} color="#bbbbbb" />}
            />
            <ListItem
                onPress={() => navigation.navigate('ChangePayPassword')}
                style={styles.list}
                leftComponent={<Text style={styles.leftTitle}>修改支付密码</Text>}
                rightComponent={<SvgIcon name={SvgPath.rightArrow} size={28} color="#bbbbbb" />}
            />
            <ItemSeparator height={16} />
            <ListItem
                onPress={() => setVisiable(true)}
                style={styles.list}
                leftComponent={<Text style={styles.leftTitle}>注销账户</Text>}
                rightComponent={<SvgIcon name={SvgPath.rightArrow} size={28} color="#bbbbbb" />}
            />
            <Modal
                visible={visiable}
                animationType="fade"
                animated={true}
                transparent={true}
                statusBarTranslucent={true}
                hardwareAccelerated={true}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.title}>注销账户</Text>
                        <View style={styles.inputBorder}>
                            <TextInput
                                placeholder="请输入注销密码"
                                value={code}
                                style={{ height: pixel(40) }}
                                onChangeText={(text) => setCode(text)}
                            />
                        </View>
                        <View style={styles.footer}>
                            <TouchableOpacity style={styles.button} onPress={() => setVisiable(false)}>
                                <Text style={styles.buttonText}>取消</Text>
                            </TouchableOpacity>
                            <View style={styles.line} />
                            <TouchableOpacity style={styles.button} onPress={onConfirm}>
                                <Text style={[styles.buttonText, { color: Theme.primaryColor }]}>确定</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}
const modalWidth = Device.width * 0.84;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Theme.groundColour,
    },
    list: {
        paddingHorizontal: pixel(Theme.edgeDistance),
        height: pixel(60),
        borderBottomWidth: 0.6,
        alignItems: 'center',
        borderColor: '#eeeeee',
        backgroundColor: '#fff',
    },
    leftTitle: {
        color: '#000',
    },
    inputBorder: {
        borderWidth: 1,
        borderColor: '#eeeeee',
        marginVertical: pixel(6),
        width: '90%',
        alignSelf: 'center',
        paddingHorizontal: pixel(10),
        borderRadius: pixel(8),
    },
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.4)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        width: modalWidth,
        backgroundColor: '#fff',
        borderRadius: pixel(5),
        paddingTop: pixel(20),
        paddingBottom: pixel(5),
        paddingHorizontal: pixel(18),
    },
    title: {
        fontSize: font(18),
        color: '#212121',
        alignSelf: 'center',
    },
    bodyText: {
        marginVertical: pixel(20),
        fontSize: font(14),
        lineHeight: font(22),
        color: '#212121',
        textAlign: 'center',
    },
    footer: {
        height: pixel(46),
        flexDirection: 'row',
        alignItems: 'stretch',
        borderTopWidth: pixel(1),
        borderTopColor: '#f0f0f0',
    },
    button: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        fontSize: font(16),
        color: '#b2b2b2',
    },
    line: {
        width: pixel(1),
        marginVertical: pixel(10),
        alignSelf: 'stretch',
        backgroundColor: '#f0f0f0',
    },
});

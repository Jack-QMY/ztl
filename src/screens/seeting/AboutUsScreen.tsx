import { displayName, Version } from '!/app.json';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { NavBarHeader, SvgIcon, SvgPath } from '~/components';

export default function AboutUsScreen() {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <NavBarHeader title="关于我们" />
            <View style={styles.header}>
                <Image source={require('!/Logo.png')} style={styles.logo} />
                <Text style={styles.displayName}>{displayName}</Text>
                <Text style={styles.version}>v{Version}</Text>
            </View>
            <View style={{ marginTop: pixel(30) }}>
                <Pressable style={styles.button} onPress={() => navigation.navigate('CreatFeedback')}>
                    <Text>意见与反馈</Text>
                    <SvgIcon name={SvgPath.rightArrow} color="#bbbbbb" />
                </Pressable>
                <Pressable style={styles.button} onPress={() => Toast.show({ content: '暂未上架' })}>
                    <Text>去评分</Text>
                    <SvgIcon name={SvgPath.rightArrow} color="#bbbbbb" />
                </Pressable>
                <Pressable style={styles.button}>
                    <Text>版本更新</Text>
                    <SvgIcon name={SvgPath.rightArrow} color="#bbbbbb" />
                </Pressable>
            </View>
            <View style={styles.bottomContent}>
                <Text>
                    <Text style={styles.privacyText} onPress={() => navigation.navigate('UserAgreement')}>
                        《用户协议》
                    </Text>
                    和
                    <Text style={styles.privacyText} onPress={() => navigation.navigate('PrivacyPolicy')}>
                        《隐私权保护声明》
                    </Text>
                </Text>
                <Text style={{ color: '#bbbbbb', marginVertical: pixel(10) }}>{displayName} 版权所有</Text>
                <Text style={{ color: '#bbbbbb' }}>Copyright©2021{displayName}有限公司</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Theme.groundColour,
    },
    header: {
        alignSelf: 'center',
        alignItems: 'center',
        marginTop: pixel(30),
    },
    logo: {
        width: pixel(80),
        height: pixel(80),
        borderRadius: pixel(10),
    },
    displayName: {
        fontSize: font(18),
        fontWeight: 'bold',
        color: '#000',
        marginVertical: pixel(6),
    },
    version: {
        color: '#BBBBBB',
        fontSize: font(14),
    },
    button: {
        borderBottomWidth: 1,
        borderBottomColor: '#EEEEEE',
        paddingBottom: 6,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: pixel(20),
        paddingVertical: pixel(20),
    },
    bottomContent: {
        position: 'absolute',
        bottom: '6%',
        alignSelf: 'center',
        alignItems: 'center',
    },
    privacyText: {
        color: '#FE0102',
    },
});

import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { NavBarHeader, SvgIcon, SvgPath } from '~/components';

export default function FeedBackResult() {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <NavBarHeader title="反馈完成" />
            <View style={styles.content}>
                <View style={{ alignSelf: 'center', alignItems: 'center' }}>
                    <View style={styles.successBorder}>
                        <SvgIcon name={SvgPath.success} color="#FFF" size={60} />
                    </View>
                    <Text style={{ marginTop: pixel(10), color: '#000' }}>反馈完成</Text>
                </View>
                <LinearGradient
                    style={{ marginTop: pixel(24), borderRadius: 8 }}
                    start={{ x: 1.5, y: 0 }}
                    end={{ x: 0, y: 0.6 }}
                    colors={['#FE4949', '#FD7420']}>
                    <Pressable style={styles.button} onPress={() => navigation.navigate('FeedBackScreen')}>
                        <Text style={styles.buttonText}>查看反馈</Text>
                    </Pressable>
                </LinearGradient>
                <Pressable
                    style={styles.button1}
                    onPress={() => navigation.navigate('Main', null, navigation.navigate('MallScreeen'))}>
                    <Text style={styles.buttonText1}>返回首页</Text>
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
    successBorder: {
        backgroundColor: '#2AA309',
        width: pixel(80),
        height: pixel(80),
        borderRadius: pixel(40),
        alignItems: 'center',
        justifyContent: 'center',
    },
    content: {
        marginHorizontal: pixel(14),
        marginTop: pixel(30),
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
    button1: {
        borderWidth: 1,
        borderColor: '#bbbbbb',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: pixel(10),
        borderRadius: 8,
        height: pixel(50),
    },
    buttonText1: {
        color: '#BBBBBB',
        fontSize: font(14),
        fontWeight: 'bold',
    },
});

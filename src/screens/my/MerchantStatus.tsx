import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { NavBarHeader } from '~/components';

export default function MerchantStatus() {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <NavBarHeader title="申请状态" />
            <View style={styles.content}>
                <Image source={require('~/assets/me/2.png')} style={styles.statusImage} />
                <Text style={styles.title}>申请已经提交成功</Text>
                <Text style={styles.noticeTitle}>请等待一到三个工作日完成审核</Text>
                <LinearGradient
                    style={styles.linearGradientStyle}
                    start={{ x: 1, y: 0 }}
                    end={{ x: 0, y: 1 }}
                    colors={['#FE4949', '#FD7420']}>
                    <Pressable style={styles.button} onPress={() => navigation.goBack()}>
                        <Text style={styles.buttonText}>返回个人中心</Text>
                    </Pressable>
                </LinearGradient>
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
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '20%',
    },
    statusImage: {
        width: pixel(120),
        height: pixel(140),
    },
    title: {
        fontSize: font(16),
        fontWeight: 'bold',
        color: '#000',
        marginVertical: pixel(20),
    },
    noticeTitle: {
        color: '#BBBBBB',
        fontSize: font(12),
        marginTop: pixel(10),
        textAlign: 'center',
    },
    linearGradientStyle: {
        marginTop: pixel(30),
        borderRadius: 8,
        width: Device.width / 1.2,
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

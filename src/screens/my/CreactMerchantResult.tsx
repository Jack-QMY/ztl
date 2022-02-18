import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { NavBarHeader, Row } from '~/components';

export default function CreactMerchantResult() {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <NavBarHeader title="商家入驻" />
            <View style={styles.content}>
                <Row>
                    <Image source={require('~/assets/me/submit_ok.png')} style={styles.submit_ok} />
                    <Text style={styles.title}>提交成功</Text>
                </Row>
                <Text style={styles.noticeTitle}>我们会在1～3个工作日审核</Text>
                <Text style={styles.noticeTitle}>审核成功我们将以短信的形式通知你</Text>
                <LinearGradient
                    style={styles.linearGradientStyle}
                    start={{ x: 1, y: 0 }}
                    end={{ x: 0, y: 1 }}
                    colors={['#FE4949', '#FD7420']}>
                    <Pressable
                        style={styles.button}
                        onPress={() => navigation.navigate('Main', null, navigation.navigate('MallScreeen'))}>
                        <Text style={styles.buttonText}>完成</Text>
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
        marginTop: '40%',
    },
    submit_ok: {
        width: pixel(50),
        height: pixel(50),
    },
    title: {
        fontSize: font(16),
        fontWeight: 'bold',
        color: '#000',
        marginLeft: pixel(6),
    },
    noticeTitle: {
        color: '#000',
        fontSize: font(12),
        marginTop: pixel(10),
        textAlign: 'center',
    },
    linearGradientStyle: {
        marginTop: pixel(30),
        borderRadius: 8,
        width: Device.width - pixel(40),
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

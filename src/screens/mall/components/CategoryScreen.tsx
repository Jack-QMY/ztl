import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Animated, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { useCirculationAnimation } from '~/common';
import { Row } from '~/components';

const data = [
    { id: 1, title: '话费充值', image: require('~/assets/home/42.png'), router: 'PhoneRecharge' },
    { id: 2, title: '油卡充值', image: require('~/assets/home/43.png'), router: '' },
    { id: 3, title: '酒店预定', image: require('~/assets/home/44.png'), router: '' },
    { id: 4, title: '特权充值', image: require('~/assets/home/45.png'), router: '' },
    { id: 5, title: '淘好车', image: require('~/assets/home/46.png'), router: '' },
    { id: 6, title: '直升专区', image: require('~/assets/home/46.png'), router: '' },
    { id: 7, title: '出行购票', image: require('~/assets/home/47.png'), router: '' },
    { id: 8, title: '召淘盲盒', image: require('~/assets/home/48.png'), router: '' },
    { id: 9, title: '淘分团', image: require('~/assets/home/49.png'), router: '' },
    { id: 10, title: '全部分类', image: require('~/assets/home/50.png'), router: '' },
];

export default function CategoryScreen() {
    const navigation = useNavigation();
    const animation = useCirculationAnimation({ duration: 3000, start: true });
    const scale = animation.interpolate({
        inputRange: [0, 0.1, 0.2, 0.3, 0.4, 1],
        outputRange: [1, 1.09, 1.03, 1.09, 1, 1],
    });

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                {data.map((item, index) => {
                    return (
                        <Pressable
                            key={item.id}
                            style={styles.pressableButton}
                            onPress={() => navigation.navigate(item.router)}>
                            <Image source={item.image} style={styles.icons} />
                            <Text style={styles.title}>{item.title}</Text>
                        </Pressable>
                    );
                })}
            </View>
            <Animated.View style={{ transform: [{ scale }] }}>
                <Pressable style={styles.mangheContainer}>
                    <Image source={require('~/assets/home/home_manghe.png')} style={styles.manghe} />
                </Pressable>
            </Animated.View>
            <View style={styles.border}>
                <Row>
                    <Image source={require('~/assets/home/52.png')} style={styles.ztImage} resizeMode="contain" />
                    <View style={styles.line} />
                    <View>
                        <Text style={styles.title}>召淘拼团隆重上线!</Text>
                        <Text style={styles.NoticeContent}>最低价等你来抢</Text>
                    </View>
                </Row>
                <Pressable style={styles.allButton}>
                    <Text style={styles.allButtonText}>查看更多</Text>
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: pixel(Theme.edgeDistance),
        marginHorizontal: pixel(Theme.edgeDistance),
    },
    content: {
        flexGrow: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        width: Device.width - pixel(Theme.edgeDistance) * 2,
    },
    pressableButton: {
        width: pixel(60),
        alignItems: 'center',
        marginTop: pixel(Theme.edgeDistance) * 2,
    },
    icons: {
        width: pixel(28),
        height: pixel(28),
    },
    title: {
        fontSize: font(10),
        color: '#000',
        marginTop: pixel(6),
    },
    mangheContainer: {
        alignSelf: 'center',
        marginTop: pixel(Theme.edgeDistance),
        marginBottom: pixel(8),
    },
    manghe: {
        width: Device.width - pixel(Theme.edgeDistance) * 2,
        height: pixel(100),
    },
    border: {
        backgroundColor: '#fff',
        marginVertical: pixel(Theme.edgeDistance),
        padding: pixel(14),
        borderRadius: 6,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    ztImage: {
        width: pixel(30),
        height: pixel(30),
    },
    line: {
        width: 1,
        height: pixel(26),
        backgroundColor: '#BBBBBB',
        marginHorizontal: pixel(20),
    },
    NoticeContent: {
        fontSize: font(8),
        color: 'rgba(0,0,0,0.5)',
        marginTop: pixel(4),
    },
    allButton: {
        borderWidth: 1,
        height: pixel(24),
        alignItems: 'center',
        justifyContent: 'center',
        width: pixel(90),
        borderRadius: pixel(15),
        borderColor: '#656565',
    },
    allButtonText: {
        fontSize: font(9),
        color: '#696969',
    },
});

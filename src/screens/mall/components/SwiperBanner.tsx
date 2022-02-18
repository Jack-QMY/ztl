import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Swiper from 'react-native-swiper';

const data = [
    { id: 1, source: require('~/assets/banner/banner_1.jpeg') },
    { id: 2, source: require('~/assets/banner/banner_1.jpeg') },
    { id: 3, source: require('~/assets/banner/banner_1.jpeg') },
];

export default function SwiperBanner() {
    const navigation = useNavigation();
    return (
        <LinearGradient
            style={styles.container}
            start={{ x: 1.5, y: 0 }}
            end={{ x: 0, y: 0.6 }}
            colors={['#FC4E4D', '#FC4E4D']}>
            <View style={styles.headerSwiper}>
                <Swiper
                    style={styles.swiperStyle}
                    width={POSTER_WIDTH}
                    height={POSTER_HEIGHT}
                    horizontal={true}
                    autoplay={true}
                    loop={true}
                    index={0}
                    autoplayTimeout={5}
                    showsPagination={true}
                    removeClippedSubviews={false}
                    dotStyle={styles.dotStyle}
                    activeDotStyle={styles.activeDotStyle}
                    paginationStyle={styles.paginationStyle}>
                    {data?.map((item, index) => {
                        return (
                            <Pressable key={index} activeOpacity={0.8}>
                                <Image source={item.source} style={styles.swiperCover} />
                            </Pressable>
                        );
                    })}
                </Swiper>
            </View>
            <View style={styles.border} />
        </LinearGradient>
    );
}
const POSTER_WIDTH = Device.width - pixel(Theme.edgeDistance) * 2;
const POSTER_HEIGHT = Device.height * 0.2;
const styles = StyleSheet.create({
    container: {
        marginBottom: pixel(12),
        overflow: 'hidden',
        height: '22%',
        justifyContent: 'flex-end',
        backgroundColor: '#000',
    },
    headerSwiper: {
        position: 'absolute',
        zIndex: 999,
        marginHorizontal: pixel(Theme.edgeDistance),
    },
    border: {
        backgroundColor: '#F4F4F2',
        height: pixel(60),
        width: Device.width,
        marginBottom: -1,
        borderTopLeftRadius: pixel(40),
        borderTopRightRadius: pixel(40),
    },
    swiperStyle: {
        height: POSTER_HEIGHT,
        borderRadius: pixel(10),
    },
    swiperCover: {
        height: POSTER_HEIGHT,
        width: POSTER_WIDTH,
        borderRadius: pixel(10),
    },
    dotStyle: {
        width: pixel(10),
        height: pixel(10),
        borderRadius: pixel(5),
        backgroundColor: '#FF8989',
    },
    activeDotStyle: {
        width: pixel(10),
        height: pixel(10),
        borderRadius: pixel(5),
        backgroundColor: '#fff',
    },
    paginationStyle: {
        bottom: 10,
        justifyContent: 'center',
    },
});

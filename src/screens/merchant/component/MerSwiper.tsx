import React, { useRef } from 'react';
import { Animated, Image, Pressable, StyleSheet, View } from 'react-native';
import Swiper from 'react-native-swiper';

const data = [
    { id: 1, source: require('~/assets/banner/banner_1.jpeg') },
    { id: 2, source: require('~/assets/banner/banner_1.jpeg') },
    { id: 3, source: require('~/assets/banner/banner_1.jpeg') },
];
export default function MerSwiper() {
    const swiperRef = useRef();
    if (!data) {
        return <SwiperPlaceholder />;
    }
    return (
        <View style={styles.container}>
            <Swiper
                ref={swiperRef}
                style={styles.swiperStyle}
                width={POSTER_WIDTH}
                height={POSTER_HEIGHT}
                horizontal={true}
                autoplay={true}
                loop={true}
                index={0}
                autoplayTimeout={5}
                showsPagination={false}>
                {data?.map((item, index) => {
                    return (
                        <Pressable key={index} activeOpacity={0.8}>
                            <Image source={item.source} style={styles.cover} />
                        </Pressable>
                    );
                })}
            </Swiper>
        </View>
    );
}
function SwiperPlaceholder() {
    const animation = new Animated.Value(0.5);
    const animationStyle = { opacity: animation };

    (function startAnimation() {
        Animated.loop(
            Animated.sequence([
                Animated.timing(animation, {
                    toValue: 1,
                    duration: 600,
                    useNativeDriver: true,
                }),
                Animated.timing(animation, {
                    toValue: 0.5,
                    duration: 600,
                    useNativeDriver: true,
                }),
            ]),
        ).start();
    })();

    return (
        <View style={styles.container}>
            <Animated.View style={[styles.cover, animationStyle]} />
        </View>
    );
}
const POSTER_WIDTH = Device.width - pixel(Theme.edgeDistance) * 2;
const POSTER_HEIGHT = Device.height * 0.2;

const styles = StyleSheet.create({
    container: {
        marginTop: pixel(8),
        marginBottom: pixel(12),
        marginHorizontal: pixel(Theme.edgeDistance),
        borderRadius: pixel(10),
        alignSelf: 'center',
        height: POSTER_HEIGHT,
        overflow: 'hidden',
    },
    swiperStyle: {
        height: POSTER_HEIGHT,
        borderRadius: pixel(6),
        backgroundColor: '#fff',
    },
    cover: {
        width: POSTER_WIDTH,
        height: POSTER_HEIGHT,
        borderRadius: pixel(10),
        backgroundColor: '#f0f0f0',
        overflow: 'hidden',
    },
});

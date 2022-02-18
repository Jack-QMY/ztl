import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { MarqueeVertical } from 'react-native-marquee-ab';
import { FocusAwareStatusBar, Row, SvgIcon, SvgPath } from '~/components';
import CategoryScreen from './components/CategoryScreen';
import SwiperBanner from './components/SwiperBanner';

const textList = [
    { value: '木林森冰箱净化器' },
    { value: '骊佳儿童防蓝光护' },
    { value: '北丹尊贵武夷山岩' },
    { value: '新款车载充电器一' },
    { value: '北丹韵武夷山正岩' },
];

export default function index() {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <FocusAwareStatusBar backgroundColor={'#FC4E4D'} />
            <LinearGradient
                style={styles.header}
                start={{ x: 1.5, y: 0 }}
                end={{ x: 0, y: 0.6 }}
                colors={['#FC4E4D', '#FC4E4D']}>
                <Row style={styles.row}>
                    <Image source={require('~/assets/home/home_ztl.png')} style={styles.home_ztl} resizeMode="center" />
                    <View style={styles.postionSerach}>
                        <SvgIcon name={SvgPath.serach} color="#fff" size={20} />
                    </View>
                    <MarqueeVertical
                        width={Device.width * 0.6}
                        height={pixel(34)}
                        delay={1500}
                        direction="up"
                        textList={textList}
                        onTextClick={(item) => navigation.navigate('SerachScreen', { keyword: item.value })}
                        bgContainerStyle={styles.bgContainerStyle}
                        textStyle={{ color: '#fff', textAlign: 'center', fontSize: font(12) }}
                    />
                    <Pressable onPress={() => navigation.navigate('IntegralReward')}>
                        <Image source={require('~/assets/home/home_sign.png')} style={styles.icons} />
                    </Pressable>
                    <Pressable onPress={() => navigation.navigate('NoticeScreen', { title: '系统消息' })}>
                        <Image source={require('~/assets/home/home_message.png')} style={styles.icons} />
                    </Pressable>
                </Row>
            </LinearGradient>
            <SwiperBanner />
            <CategoryScreen />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Device.isIOS ? 0 : Device.statusBarHeight,
    },
    header: {
        backgroundColor: '#FE1D1B',
        paddingTop: Device.isIOS ? Device.statusBarHeight * 1.4 : 0,
        paddingHorizontal: Theme.edgeDistance,
        paddingBottom: pixel(Theme.edgeDistance),
    },
    row: {
        justifyContent: 'space-between',
    },
    home_ztl: {
        width: pixel(40),
        height: pixel(40),
    },
    postionSerach: {
        position: 'absolute',
        left: '18%',
        zIndex: 9999,
    },
    bgContainerStyle: {
        backgroundColor: '#FF8989',
        borderRadius: pixel(40),
        marginHorizontal: pixel(3),
    },
    icons: {
        width: pixel(22),
        height: pixel(22),
    },
});

import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Avatar, FocusAwareStatusBar, Row, SvgIcon, SvgPath } from '~/components';
import { observer, userStore } from '~/store';

const orderData = [
    {
        id: 1,
        icons: require('~/assets/me/18.png'),
        title: '待支付',
        router: 'Order',
        type: 'PAY',
    },
    {
        id: 2,
        icons: require('~/assets/me/19.png'),
        title: '待发货',
        router: 'Order',
        type: 'SHIP',
    },
    {
        id: 3,
        icons: require('~/assets/me/20.png'),
        title: '待收货',
        router: 'Order',
        type: 'RECEIPT',
    },
    {
        id: 4,
        icons: require('~/assets/me/21.png'),
        title: '待评价',
        router: 'Order',
        type: 'COMMENT',
    },
    {
        id: 5,
        icons: require('~/assets/me/22.png'),
        title: '退货/售后',
        router: 'Order',
        type: '',
    },
];

const utilData = [
    {
        id: 1,
        icons: require('~/assets/me/23.png'),
        title: '钱包',
        router: 'Wallet',
    },
    {
        id: 2,
        icons: require('~/assets/me/24.png'),
        title: '购物车',
        router: 'ShoppingCart',
    },
    {
        id: 3,
        icons: require('~/assets/me/25.png'),
        title: '邀请好友',
        router: '',
    },
    {
        id: 4,
        icons: require('~/assets/me/26.png'),
        title: '我的团队',
        router: '',
    },
    {
        id: 5,
        icons: require('~/assets/me/27.png'),
        title: '召淘卡',
        router: '',
    },
    {
        id: 6,
        icons: require('~/assets/me/28.png'),
        title: '淘分团记录',
        router: '',
    },
    {
        id: 7,
        icons: require('~/assets/me/29.png'),
        title: '盲盒记录',
        router: '',
    },
    {
        id: 8,
        icons: require('~/assets/me/30.png'),
        title: '优惠券',
        router: '',
    },
    {
        id: 9,
        icons: require('~/assets/me/31.png'),
        title: '商户入驻',
        router: 'CreatMerchant', // MerchantStatus申请状态
    },
    {
        id: 10,
        icons: require('~/assets/me/34.png'),
        title: '意见反馈',
        router: 'FeedBackScreen',
    },
    {
        id: 11,
        icons: require('~/assets/me/35.png'),
        title: '关于我们',
        router: 'AboutUsScreen',
    },
];
export default observer(() => {
    const navigation = useNavigation();
    const userInfo = userStore.me;
    return (
        <View style={styles.container}>
            <FocusAwareStatusBar backgroundColor={'#F7F7F9'} />
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ flexGrow: 1, paddingBottom: 100 }}>
                <Row style={{ justifyContent: 'flex-end' }}>
                    <Pressable onPress={() => Toast.show({ content: '暂未开放' })} style={{ marginRight: pixel(14) }}>
                        <SvgIcon name={SvgPath.saoQR} size={22} />
                    </Pressable>
                    <Pressable style={{ marginRight: pixel(14) }}>
                        <SvgIcon name={SvgPath.kefu} size={22} />
                    </Pressable>
                    <Pressable onPress={() => navigation.navigate('SeetingScreen')}>
                        <SvgIcon name={SvgPath.setting} size={22} />
                    </Pressable>
                </Row>
                <Pressable style={styles.userInfo} onPress={() => navigation.navigate('EditUserInfo')}>
                    <Avatar source={userInfo?.userinfo?.avatar} size={60} />
                    <View style={styles.userInfoRight}>
                        <Text style={styles.nickname}>{userInfo?.userinfo?.nickname}</Text>
                        <Row>
                            <View style={styles.userBorder}>
                                <Text style={styles.userInfoText}>ID:{userInfo?.userinfo?.user_id}</Text>
                            </View>
                            <View style={[styles.userBorder, { marginLeft: pixel(8) }]}>
                                <Text style={styles.userInfoText}>{userInfo?.level_name}</Text>
                            </View>
                        </Row>
                    </View>
                </Pressable>
                <View style={styles.userVipBorder}>
                    <Row>
                        <Image source={require('~/assets/me/16.png')} style={styles.icons} />
                        <Text style={styles.userVipText}>升级召淘会员 享受更多福利</Text>
                    </Row>
                    <Pressable style={styles.userVipButton}>
                        <Text style={styles.userVipButtonText}>立即升级</Text>
                    </Pressable>
                </View>
                <View style={styles.card}>
                    <View style={styles.dayTask}>
                        <Text style={{ color: '#F1CCAE' }}>每日签到领取多重奖励</Text>
                        <Pressable style={styles.dayTaskButton} onPress={() => navigation.navigate('IntegralReward')}>
                            <Text style={{ color: '#F1CCAE', fontSize: font(10) }}>立即签到</Text>
                        </Pressable>
                    </View>
                    <Row style={styles.card1}>
                        <Pressable style={{ alignItems: 'center' }}>
                            <Text style={styles.cardText}>0</Text>
                            <Text style={styles.cardText}>优惠券</Text>
                        </Pressable>
                        <View style={styles.line} />
                        <Pressable style={{ alignItems: 'center' }}>
                            <Text style={styles.cardText}>0</Text>
                            <Text style={styles.cardText}>召淘卡</Text>
                        </Pressable>
                        <View style={styles.line} />
                        <Pressable style={{ alignItems: 'center' }}>
                            <Text style={styles.cardText}>0</Text>
                            <Text style={styles.cardText}>购物卡</Text>
                        </Pressable>
                        <View style={styles.line} />
                        <Pressable style={{ alignItems: 'center' }}>
                            <Text style={styles.cardText}>0</Text>
                            <Text style={styles.cardText}>收藏记录</Text>
                        </Pressable>
                    </Row>
                </View>
                <View style={styles.card}>
                    <Row style={styles.myOrder}>
                        <Text style={styles.myOrderTitlte}>我的订单</Text>
                        <Pressable onPress={() => navigation.navigate('Order', { type: 'ALL' })}>
                            <Row>
                                <Text>全部订单</Text>
                                <SvgIcon name={SvgPath.rightArrow} size={24} color="#bbbbbb" />
                            </Row>
                        </Pressable>
                    </Row>
                    <Row style={styles.card1}>
                        {orderData.map((item, index) => {
                            return (
                                <Pressable
                                    style={{ alignItems: 'center' }}
                                    key={item.id}
                                    onPress={() => navigation.navigate(item.router, { category: item.type })}>
                                    <Image source={item.icons} style={styles.icons1} />
                                    <Text style={styles.cardText}>{item.title}</Text>
                                </Pressable>
                            );
                        })}
                    </Row>
                </View>
                <View style={styles.card}>
                    <Row style={styles.myOrder}>
                        <Text style={styles.myOrderTitlte}>我的工具</Text>
                    </Row>
                    <View style={styles.utilContainer}>
                        {utilData.map((item, index) => {
                            return (
                                <Pressable
                                    style={styles.utilsButton}
                                    key={item.id}
                                    onPress={() => navigation.navigate(item.router)}>
                                    <Image source={item.icons} style={styles.icons1} />
                                    <Text style={styles.cardText}>{item.title}</Text>
                                </Pressable>
                            );
                        })}
                    </View>
                </View>
            </ScrollView>
        </View>
    );
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F7F7F9',
        paddingTop: Device.statusBarHeight * 1.2,
        paddingHorizontal: pixel(14),
    },
    userInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginTop: pixel(Theme.edgeDistance) * 1.2,
    },
    userInfoRight: {
        marginLeft: pixel(14),
        height: pixel(60),
        justifyContent: 'space-around',
    },
    nickname: {
        fontSize: font(14),
        fontWeight: 'bold',
        color: '#000',
    },
    userBorder: {
        borderWidth: 1,
        borderColor: '#EF535C',
        borderRadius: pixel(4),
        paddingHorizontal: pixel(4),
    },
    userInfoText: {
        color: '#EF535C',
        fontSize: font(8),
    },
    userVipBorder: {
        marginTop: pixel(Theme.edgeDistance) * 1.2,
        backgroundColor: '#FEE6D4',
        padding: pixel(10),
        borderRadius: pixel(10),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    icons: {
        width: pixel(28),
        height: pixel(25),
    },
    icons1: {
        width: pixel(28),
        height: pixel(28),
    },
    userVipText: {
        color: '#B56959',
        fontSize: font(10),
        marginLeft: pixel(10),
    },
    userVipButton: {
        backgroundColor: '#FABF95',
        alignItems: 'center',
        justifyContent: 'center',
        width: pixel(80),
        height: pixel(30),
        borderRadius: pixel(15),
    },
    userVipButtonText: {
        color: '#AD532E',
        fontSize: font(10),
    },
    card: {
        backgroundColor: '#fff',
        marginTop: pixel(Theme.edgeDistance) * 1.2,
        borderRadius: pixel(10),
        paddingBottom: pixel(20),
    },
    dayTask: {
        backgroundColor: '#000',
        borderTopLeftRadius: pixel(10),
        borderTopRightRadius: pixel(10),
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: pixel(15),
        paddingVertical: pixel(8),
    },
    dayTaskButton: {
        borderColor: '#F1CCAE',
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: pixel(80),
        height: pixel(30),
        borderRadius: pixel(15),
    },
    cardText: {
        color: '#69696B',
        fontSize: font(10),
        fontWeight: 'bold',
        marginTop: pixel(4),
    },
    card1: {
        justifyContent: 'space-around',
        marginTop: pixel(20),
    },
    line: {
        width: 1,
        height: 30,
        backgroundColor: '#bbbbbb',
    },
    myOrder: {
        justifyContent: 'space-between',
        margin: pixel(10),
    },
    myOrderTitlte: {
        fontSize: font(14),
        fontWeight: 'bold',
        color: '#000',
    },
    utilContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
        flexGrow: 1,
        marginTop: pixel(14),
    },
    utilsButton: {
        alignItems: 'center',
        marginTop: pixel(16),
        marginRight: pixel(10),
        width: pixel(76),
    },
});

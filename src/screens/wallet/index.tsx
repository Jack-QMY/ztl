import { useNavigation } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { Image, ImageBackground, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { NavBarHeader } from '~/components';

const listData = [
    {
        id: 1,
        title: '余额提现',
        icons: require('~/assets/wallet/1.png'),
        router: '',
        routerParams: '',
    },
    {
        id: 2,
        title: '余额明细',
        icons: require('~/assets/wallet/2.png'),
        router: '',
        routerParams: '',
    },
    {
        id: 3,
        title: '积分转赠',
        icons: require('~/assets/wallet/3.png'),
        router: 'PointTransfer',
        routerParams: '',
    },
    {
        id: 4,
        title: 'GPK转赠',
        icons: require('~/assets/wallet/5.png'),
        router: 'TransferGPK',
        routerParams: '',
    },
    {
        id: 5,
        title: 'GPK销毁',
        icons: require('~/assets/wallet/6.png'),
        router: 'DestroyGPK',
        routerParams: '',
    },
    {
        id: 6,
        title: '积分明细',
        icons: require('~/assets/wallet/7.png'),
        router: 'ScoreDetailes',
        routerParams: 'SCORE',
    },
    {
        id: 7,
        title: 'GPK明细',
        icons: require('~/assets/wallet/8.png'),
        router: 'ScoreDetailes',
        routerParams: 'GPK',
    },
    {
        id: 8,
        title: 'GPK质押',
        icons: require('~/assets/wallet/9.png'),
        router: '',
        routerParams: '',
    },
    {
        id: 9,
        title: 'GPK闪兑',
        icons: require('~/assets/wallet/11.png'),
        router: 'ExchangeGPK',
        routerParams: '',
    },
    {
        id: 10,
        title: '召淘地址',
        icons: require('~/assets/wallet/12.png'),
        router: 'PayAddress',
        routerParams: '',
    },
];

export default function index() {
    const navigation = useNavigation();
    const onPress = useCallback(
        (router, type) => {
            if (router == '') {
                Toast.show({ content: '待开放' });
            } else if (type !== '') {
                navigation.navigate(router, { type: type });
            } else {
                navigation.navigate(router);
            }
        },
        [navigation],
    );

    return (
        <View style={styles.container}>
            <NavBarHeader title="钱包" />
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.content}>
                    <ImageBackground
                        source={require('~/assets/wallet/4.png')}
                        style={styles.backgroundImage}
                        resizeMode="center">
                        <Text>余额钱包</Text>
                        <Text style={styles.backGroundText}>¥ 0.00</Text>
                    </ImageBackground>
                    <View style={styles.listContainer}>
                        <View>
                            <Text style={styles.text}>0</Text>
                            <Text style={styles.text1}>我的积分总数</Text>
                        </View>
                        <View style={{ marginVertical: pixel(20) }}>
                            <Text style={styles.text}>0</Text>
                            <View style={styles.row}>
                                <Text style={styles.text1}>我的GPK总数</Text>
                                <Text style={styles.text1}>GPK行情≈4.72(RMB)</Text>
                            </View>
                        </View>
                        <View style={styles.border}>
                            <View style={styles.row1}>
                                <View style={styles.commen}>
                                    <Text style={styles.backGroundText1}>0</Text>
                                    <Text style={styles.text1}>积分冻结</Text>
                                </View>
                                <View style={styles.commen}>
                                    <Text style={styles.backGroundText1}>0</Text>
                                    <Text style={styles.text1}>GPK冻结</Text>
                                </View>
                            </View>
                            <View style={styles.row1}>
                                <Pressable
                                    style={styles.commen}
                                    onPress={() => navigation.navigate('Dividend', { type: 'fenhong' })}>
                                    <Text style={styles.backGroundText1}>202011.00222</Text>
                                    <Text style={styles.text1}>召淘分红</Text>
                                </Pressable>
                                <Pressable
                                    style={styles.commen}
                                    onPress={() => navigation.navigate('Dividend', { type: 'gongyi' })}>
                                    <Text style={styles.backGroundText1}>323811.38383</Text>
                                    <Text style={styles.text1}>召淘公益</Text>
                                </Pressable>
                            </View>
                        </View>
                    </View>
                    <View style={[styles.listContainer, styles.listItem]}>
                        {listData.map((item, index) => {
                            return (
                                <Pressable
                                    key={item.id}
                                    style={styles.listButton}
                                    onPress={() => onPress(item.router, item.routerParams)}>
                                    <Image source={item.icons} style={styles.icons} />
                                    <Text style={styles.listTitle}>{item.title}</Text>
                                </Pressable>
                            );
                        })}
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Theme.groundColour,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    row1: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    content: {
        margin: pixel(14),
    },
    backgroundImage: {
        padding: pixel(14),
        width: Device.width - pixel(28),
    },
    backGroundText: {
        color: '#BC7644',
        fontSize: font(20),
        fontWeight: 'bold',
        marginTop: pixel(14),
    },
    backGroundText1: {
        color: '#BC7644',
        fontSize: font(14),
        fontWeight: 'bold',
        marginTop: pixel(14),
    },
    listContainer: {
        backgroundColor: '#fff',
        marginTop: pixel(14),
        padding: pixel(14),
        borderRadius: pixel(6),
    },
    text: {
        fontSize: font(16),
        color: '#000',
        fontWeight: 'bold',
    },
    text1: {
        color: '#A1A1A1',
        marginTop: pixel(10),
    },
    border: {
        backgroundColor: '#F9F0E9',
        padding: pixel(14),
        borderRadius: pixel(4),
    },
    commen: {
        alignItems: 'center',
    },
    listItem: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        paddingHorizontal: pixel(-14),
    },
    listButton: {
        alignItems: 'center',
        marginTop: pixel(16),
        marginHorizontal: pixel(12),
        width: pixel(60),
    },
    icons: {
        width: pixel(48),
        height: pixel(48),
    },
    listTitle: {
        color: '#929191',
        fontSize: font(10),
        marginTop: pixel(6),
    },
});

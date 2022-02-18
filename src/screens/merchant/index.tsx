import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useRef, useState } from 'react';
import { Animated, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { ProductItem, Row, ScrollableTabBar, ScrollTabView, SvgIcon, SvgPath } from '~/components';
import { userStore } from '~/store';
import MerSwiper from './component/MerSwiper';
import MerTypeTable from './component/MerTypeTable';
const data = [
    {
        id: 1,
        url: 'https://img95.699pic.com/photo/50105/7812.jpg_wh300.jpg',
        title: '超市饮料柜台[媒体用图]超市饮料柜台[媒体用图]超市饮料柜台[媒体用图]',
        price: 30,
    },
    {
        id: 2,
        url: 'https://img95.699pic.com/photo/50050/0515.jpg_wh300.jpg',
        title: '超市饮料柜台[媒体用图]',
        price: 30,
    },
    {
        id: 3,
        url: 'https://img95.699pic.com/element/40074/2069.png_300.png',
        title: '超市饮料柜台[媒体用图]',
        price: 30,
    },
    {
        id: 4,
        url: 'https://img95.699pic.com/element/40074/2069.png_300.png',
        title: '超市饮料柜台[媒体用图]',
        price: 30,
    },
    {
        id: 5,
        url: 'https://img95.699pic.com/element/40074/2069.png_300.png',
        title: '超市饮料柜台[媒体用图]',
        price: 30,
    },
];
const NAV_BAR_HEIGHT = pixel(Device.navBarHeight + Device.statusBarHeight);
export default function index() {
    const navigation = useNavigation();
    const [headerHeight, setHeaderHeight] = useState(pixel(418));
    const headerOnLayout = useCallback((event: any) => {
        const { height } = event.nativeEvent.layout;
        setHeaderHeight(height);
    }, []);
    const _renderScrollHeader = useCallback(() => {
        return (
            <View onLayout={headerOnLayout}>
                <Row style={styles.header}>
                    <Pressable>
                        <Row>
                            <SvgIcon name={SvgPath.address} color="#666666" size={20} />
                            <Text style={styles.address}>{userStore?.postion?.city}</Text>
                        </Row>
                    </Pressable>
                    <Pressable style={styles.serachBorder}>
                        <SvgIcon name={SvgPath.serach} color="#666666" size={20} />
                        <Text style={styles.address}>请输入你要搜索的商户名称</Text>
                    </Pressable>
                    <Pressable style={{ alignItems: 'center' }} onPress={() => navigation.navigate('NoticeMain')}>
                        <SvgIcon name={SvgPath.message} color="#191919" size={20} />
                        <Text style={styles.address}>消息</Text>
                    </Pressable>
                </Row>
                <MerSwiper />
                <Pressable>
                    <Row style={styles.recommend}>
                        <Text style={styles.recommendTitle}>精选商品</Text>
                        <Row>
                            <Text
                                style={{
                                    color: '#9E9E9E',
                                    fontSize: font(10),
                                }}>
                                更多产品
                            </Text>
                            <SvgIcon name={SvgPath.rightArrow} color="#9E9E9E" size={26} />
                        </Row>
                    </Row>
                </Pressable>
                <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ marginHorizontal: pixel(Theme.edgeDistance), flexGrow: 1 }}>
                    {data.map((item, index) => {
                        return <ProductItem data={item} key={item.id} />;
                    })}
                </ScrollView>
            </View>
        );
    }, [headerOnLayout]);
    const contentOffset = useRef(new Animated.Value(0)).current;
    const _onContentScroll = useCallback((e) => {
        contentOffset.setValue(e.value);
    }, []);
    const navBarOpacity = contentOffset.interpolate({
        inputRange: [0, NAV_BAR_HEIGHT / 10, NAV_BAR_HEIGHT],
        outputRange: [0, 0, 1],
    });
    const navBarScale = contentOffset.interpolate({
        inputRange: [0, NAV_BAR_HEIGHT / 10],
        outputRange: [0.1, 1],
        extrapolate: 'clamp',
    });

    const _renderNavBar = useCallback((): React.ReactElement => {
        return (
            <Animated.View style={[styles.navBarWrap, { opacity: navBarOpacity, transform: [{ scale: navBarScale }] }]}>
                <Row style={styles.header}>
                    <Pressable>
                        <Row>
                            <SvgIcon name={SvgPath.address} color="#666666" size={20} />
                            <Text style={styles.address}>长沙市</Text>
                        </Row>
                    </Pressable>
                    <Pressable style={styles.serachBorder}>
                        <SvgIcon name={SvgPath.serach} color="#666666" size={20} />
                        <Text style={styles.address}>请输入你要搜索的商户名称</Text>
                    </Pressable>
                    <Pressable style={{ alignItems: 'center' }}>
                        <SvgIcon name={SvgPath.message} color="#191919" size={20} />
                        <Text style={styles.address}>消息</Text>
                    </Pressable>
                </Row>
            </Animated.View>
        );
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            {_renderNavBar()}
            <ScrollTabView
                onContentScroll={_onContentScroll}
                headerHeight={headerHeight}
                insetValue={NAV_BAR_HEIGHT}
                renderScrollHeader={_renderScrollHeader}
                renderTabBar={(tabBarProps: any) => (
                    <ScrollableTabBar
                        {...tabBarProps}
                        style={{
                            backgroundColor: '#fff',
                            borderColor: '#EEEEEE',
                            marginTop: pixel(10),
                            // height: NAV_BAR_HEIGHT,
                        }}
                        tabUnderlineWidth={20}
                        activeTextColor={Theme.primaryColor}
                        inactiveTextColor={'#898E96'}
                        underlineStyle={styles.underlineStyle}
                    />
                )}>
                <MerTypeTable tabLabel="全部" />
                <MerTypeTable tabLabel="房产经纪" />
                <MerTypeTable tabLabel="婚纱摄影" />
                <MerTypeTable tabLabel="文化工作品" />
                <MerTypeTable tabLabel="家庭建材" />
                <MerTypeTable tabLabel="玩具乐器" />
                <MerTypeTable tabLabel="生鲜果实" />
                <MerTypeTable tabLabel="食品饮料" />
                <MerTypeTable tabLabel="医药保健" />
                <MerTypeTable tabLabel="美妆护肤" />
                <MerTypeTable tabLabel="日用百货" />
                <MerTypeTable tabLabel="养生足道" />
                <MerTypeTable tabLabel="美妆服饰" />
                <MerTypeTable tabLabel="数码手机" />
                <MerTypeTable tabLabel="电脑办公" />
                <MerTypeTable tabLabel="皮具箱包" />
                <MerTypeTable tabLabel="黄金珠宝" />
                <MerTypeTable tabLabel="保险代理" />
                <MerTypeTable tabLabel="汽车销售" />
                <MerTypeTable tabLabel="家用电器" />
                <MerTypeTable tabLabel="母婴童装" />
            </ScrollTabView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    navBarWrap: {
        position: 'absolute',
        top: Device.isIOS ? Device.statusBarHeight * 1.2 : 0,
        left: 0,
        right: 0,
        zIndex: 1,
        height: NAV_BAR_HEIGHT,
    },
    container: {
        flex: 1,
        paddingTop: pixel(6),
        backgroundColor: '#F8F8F8',
        marginBottom: Device.tabBarHeight,
    },
    header: {
        justifyContent: 'space-between',
        marginBottom: pixel(10),
        marginHorizontal: pixel(Theme.edgeDistance),
    },
    address: {
        fontSize: font(10),
        color: '#666666',
        marginHorizontal: pixel(2),
    },
    serachBorder: {
        borderWidth: 1,
        borderColor: Theme.primaryColor,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingHorizontal: pixel(Theme.edgeDistance),
        height: pixel(34),
        borderRadius: pixel(20),
        backgroundColor: '#fff',
    },
    recommend: {
        justifyContent: 'space-between',
        marginHorizontal: pixel(Theme.edgeDistance),
        marginTop: pixel(Theme.edgeDistance),
    },
    recommendTitle: {
        color: '#9E9E9E',
        fontSize: font(14),
    },
    underlineStyle: {
        backgroundColor: 'red',
    },
});

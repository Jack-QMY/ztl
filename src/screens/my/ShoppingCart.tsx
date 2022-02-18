import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect } from 'react';
import { FlatList, Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ItemSeparator, NavBarHeader, Row, SvgIcon, SvgPath } from '~/components';
import { cartStore, observer } from '~/store';

const shoppingCartData = [
    {
        shopName: '店铺名称1',
        shopItems: [
            {
                itemName: '商品的总金额和总数量商品的总金额和总数量',
                itemId: '10001',
                itemimg: 'https://pic1.zhimg.com/v2-3b4fc7e3a1195a081d0259246c38debc_720w.jpg?source=172ae18b',
                itemPrice: 100.0,
                minQuantity: 1,
                maxQuantity: 10,
                itemDes: '这个测试商品',
            },
            {
                itemName: '商品2',
                itemId: '10002',
                itemimg: 'https://img.iplaysoft.com/wp-content/uploads/2019/free-images/free_stock_photo.jpg',
                itemPrice: 110.0,
                minQuantity: 1,
                maxQuantity: 20,
                itemDes: '这个测试商品',
            },
            {
                itemName: '商品3',
                itemId: '10003',
                itemimg: 'https://img95.699pic.com/photo/40094/7630.jpg_wh300.jpg',
                itemPrice: 120.0,
                minQuantity: 1,
                maxQuantity: 30,
                itemDes: '这个测试商品',
            },
            {
                itemName: '商品4',
                itemId: '10004',
                itemimg: 'https://img.syt5.com/2021/0716/20210716093839415.jpg.420.420.jpg',
                itemPrice: 130.0,
                minQuantity: 5,
                maxQuantity: 40,
                itemDes: '这个测试商品',
            },
        ],
    },
    {
        shopName: '店铺名称2',
        shopItems: [
            {
                itemName: '商品1',
                itemId: '10001',
                itemimg: 'https://tu.sioe.cn/gj/qiege/image.jpg',
                itemPrice: 140.0,
                minQuantity: 2,
                maxQuantity: 5,
                itemDes: '这个测试商品',
            },
            {
                itemName: '商品2',
                itemId: '10002',
                itemimg: 'https://img.iplaysoft.com/wp-content/uploads/2019/free-images/free_stock_photo.jpg',
                itemPrice: 110.0,
                minQuantity: 1,
                maxQuantity: 20,
                itemDes: '这个测试商品',
            },
            {
                itemName: '商品3',
                itemId: '10003',
                itemimg: 'https://img95.699pic.com/photo/40094/7630.jpg_wh300.jpg',
                itemPrice: 120.0,
                minQuantity: 5,
                maxQuantity: 30,
                itemDes: '这个测试商品',
            },
            {
                itemName: '商品4',
                itemId: '10004',
                itemimg: 'https://img.syt5.com/2021/0716/20210716093839415.jpg.420.420.jpg',
                itemPrice: 130.0,
                minQuantity: 2,
                maxQuantity: 40,
                itemDes: '这个测试商品',
            },
        ],
    },
    {
        shopName: '店铺名称3',

        shopItems: [
            {
                itemName: '商品1',
                itemId: '10001',
                itemimg: 'https://qq.yh31.com/tp/fj/202109021300505745.jpg',
                itemPrice: 180.0,
                minQuantity: 2,
                maxQuantity: 6,
                itemDes: '这个测试商品',
            },
            {
                itemName: '商品2',
                itemId: '10002',
                itemimg: 'https://qq.yh31.com/tp/fj/202109021300505745.jpg',
                itemPrice: 100.0,
                minQuantity: 2,
                maxQuantity: 8,
                itemDes: '这个测试商品',
            },
            {
                itemName: '商品3',
                itemId: '10003',
                itemimg: 'https://qq.yh31.com/tp/fj/202109021300505745.jpg',
                itemPrice: 100.0,
                minQuantity: 2,
                maxQuantity: 10,
                itemDes: '这个测试商品',
            },
            {
                itemName: '商品4',
                itemId: '10004',
                itemimg: 'https://qq.yh31.com/tp/fj/202109021300505745.jpg',
                itemPrice: 100.0,
                minQuantity: 2,
                maxQuantity: 100,
                itemDes: '这个测试商品',
            },
        ],
    },
    {
        shopName: '店铺名称4',
        shopId: '0001',
        shopItems: [
            {
                itemName: '商品1',
                itemId: '10001',
                itemimg:
                    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnSFnZP_-gZkGdpkV9frPnidtHWHrh_A74qw&usqp=CAU',
                itemPrice: 100.0,
                minQuantity: 1,
                maxQuantity: 3,
                itemDes: '这个测试商品',
            },
            {
                itemName: '商品2',
                itemId: '10002',
                itemimg:
                    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnSFnZP_-gZkGdpkV9frPnidtHWHrh_A74qw&usqp=CAU',
                itemPrice: 100.0,
                minQuantity: 3,
                maxQuantity: 9,
                itemDes: '这个测试商品',
            },
        ],
    },
    {
        shopName: '店铺名称5',

        shopItems: [
            {
                itemName: '商品3',
                itemId: '10003',
                itemimg:
                    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-FHjQI8zJTyi8yAPepM1VOUrh0vq7JO3BTA&usqp=CAU',
                itemPrice: 100.0,
                minQuantity: 1,
                maxQuantity: 20,
                itemDes: '这个测试商品',
            },
        ],
    },
];

export default observer(() => {
    const navigation = useNavigation();
    useEffect(() => {
        cartStore.addStorageCart(shoppingCartData);
    }, []);
    // console.log('cartStorecartStore', cartStore.count, toJS(shoppingCartData.shopItems));
    console.log('item.shopItemsitem.shopItemsitem.shopItems', cartStore.count);

    const _renderItem = useCallback(
        ({ item, index }) => {
            return (
                <View style={styles.cartContainer}>
                    <Pressable style={styles.row}>
                        <Row>
                            <Pressable>
                                <SvgIcon name={SvgPath.check} color="#BBBBBB" size={24} />
                            </Pressable>
                            <Text style={{ marginLeft: pixel(10) }}>{item.shopName}</Text>
                        </Row>
                        <SvgIcon name={SvgPath.rightArrow} color="#BBBBBB" size={30} />
                    </Pressable>
                    {item.shopItems.map((cart, indexs) => {
                        return (
                            <Pressable
                                key={indexs}
                                onPress={() => navigation.navigate('MallDetails', { mail: cart })}
                                style={[styles.row, styles.cartItem]}>
                                <Row>
                                    <SvgIcon name={SvgPath.check} color="#BBBBBB" />
                                    <Image source={{ uri: cart?.itemimg }} style={styles.cover} />
                                </Row>
                                <View style={styles.cartItemContent}>
                                    <Text style={{ fontSize: font(14) }} numberOfLines={1}>
                                        {cart?.itemName}
                                    </Text>
                                    <View style={styles.maskBorder}>
                                        <Text style={{ color: 'grey' }}>规格：{cart.itemDes}</Text>
                                    </View>
                                    <Row>
                                        <Text style={{ color: 'red' }}>¥{cart.itemPrice}</Text>
                                        <Row style={styles.other}>
                                            <View style={[styles.bottomAddButton, styles.row]}>
                                                <Pressable
                                                    style={styles.addButton}
                                                    onPress={() => cartStore.decCartNum()}>
                                                    <SvgIcon name={SvgPath.reduce} size={16} color="#000" />
                                                </Pressable>
                                                <Text style={{ marginHorizontal: pixel(20) }}> {cartStore.count}</Text>
                                                <TouchableOpacity
                                                    style={styles.addButton}
                                                    onPress={() => cartStore.addCartNum()}>
                                                    <SvgIcon name={SvgPath.add} size={16} color="#000" />
                                                </TouchableOpacity>
                                            </View>
                                        </Row>
                                    </Row>
                                </View>
                            </Pressable>
                        );
                    })}
                </View>
            );
        },
        [navigation],
    );

    return (
        <View style={styles.container}>
            <NavBarHeader
                title={`购物车(共${cartStore?.cart?.shopItems?.length}件宝贝)`}
                rightComponent={
                    <Pressable style={{ marginRight: pixel(14) }}>
                        <Text>管理</Text>
                    </Pressable>
                }
            />
            <FlatList
                data={cartStore?.cart}
                renderItem={_renderItem}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.contentStyle}
                keyExtractor={(item, index) => String(item.id || index)}
                ItemSeparatorComponent={() => <ItemSeparator height={pixel(14)} />}
            />
            <View style={styles.bottom}>
                <Pressable>
                    <Row>
                        <SvgIcon name={SvgPath.check} color="#EEEEEE" />
                        <Text style={{ marginLeft: pixel(6) }}>全选</Text>
                    </Row>
                </Pressable>
                <Row>
                    <View>
                        <Text>
                            合计：<Text style={{ color: 'red' }}>¥100</Text>
                        </Text>
                        <Text style={styles.freight}>不含运费</Text>
                    </View>
                    <Pressable style={[styles.payButton]}>
                        <Text style={[styles.freight]}>去结算</Text>
                    </Pressable>
                </Row>
            </View>
        </View>
    );
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Theme.groundColour,
    },
    contentStyle: {
        flexGrow: 1,
        marginHorizontal: pixel(14),
        paddingBottom: pixel(100),
    },
    cartContainer: {
        backgroundColor: '#fff',
        borderRadius: pixel(6),
        padding: pixel(10),
    },
    cartItem: {
        marginTop: pixel(14),
        borderTopWidth: 1,
        paddingTop: pixel(14),
        borderColor: '#EEEEEE',
    },
    cartItemContent: {
        height: pixel(100),
        justifyContent: 'space-between',
        width: '56%',
        marginLeft: pixel(16),
    },
    maskBorder: {
        backgroundColor: '#F7F5F6',
        padding: pixel(4),
        borderRadius: 6,
        width: pixel(140),
    },
    cover: {
        width: pixel(100),
        height: pixel(100),
        borderRadius: pixel(8),
        marginLeft: pixel(10),
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    bottom: {
        position: 'absolute',
        bottom: 0,
        width: Device.width,
        backgroundColor: '#fff',
        padding: pixel(14),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    payButton: {
        borderWidth: 1,
        height: pixel(40),
        alignItems: 'center',
        justifyContent: 'center',
        width: pixel(80),
        borderRadius: pixel(20),
        marginLeft: pixel(14),
        borderColor: '#EEEEEE',
    },
    freight: {
        marginTop: pixel(6),
        color: 'rgba(0,0,0,0.4)',
    },
    bottomAddButton: {
        borderWidth: 1,
        borderRadius: pixel(20),
        borderColor: '#F1F1F1',
    },
    addButton: {
        width: pixel(24),
        height: pixel(24),
        backgroundColor: '#F1F1F1',
        borderRadius: pixel(15),
        justifyContent: 'center',
        alignItems: 'center',
    },
    other: {
        justifyContent: 'space-between',
        paddingHorizontal: pixel(14),
    },
});

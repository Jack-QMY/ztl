import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { NavBarHeader, Row, SvgIcon, SvgPath } from '~/components';
import OrderItem from './components/OrderItem';

export default function OrderDetailes() {
    return (
        <View style={styles.container}>
            <NavBarHeader title="订单详情" />
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.contentStyle}>
                <LinearGradient
                    style={styles.linearGradientStyle}
                    start={{ x: 1, y: 0 }}
                    end={{ x: 0, y: 1 }}
                    colors={['#FD7420', '#FE4949']}>
                    <View style={[styles.row, styles.header]}>
                        <Text style={styles.statusText}>等待您付款</Text>
                        <SvgIcon name={SvgPath.wallet} color={'#fff'} size={30} />
                    </View>
                </LinearGradient>
                <View style={styles.addressContainer}>
                    <Row>
                        <View style={styles.addRessBorder}>
                            <SvgIcon name={SvgPath.address1} color={'#FFF'} />
                        </View>
                        <View style={styles.other}>
                            <Row>
                                <Text>姓名</Text>
                                <Text style={styles.phone}>12345678901</Text>
                            </Row>
                            <Text style={styles.address} numberOfLines={2}>
                                湖南省长沙市岳麓区梅溪湖街道东方路附近嘉和苑
                            </Text>
                        </View>
                    </Row>
                </View>
                <View style={styles.shoppingContainer}>
                    <OrderItem type="detailes" />
                    <View style={styles.priceContainer}>
                        <View style={styles.row}>
                            <Text style={styles.price}>商品总价</Text>
                            <Text style={styles.price}>¥888.00</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.price}>运费</Text>
                            <Text style={styles.price}>¥0.00</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.price}>优惠</Text>
                            <Text style={styles.price}>¥0.00</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.price}>总价</Text>
                            <Text style={styles.price}>¥888.00</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.shoppingContainer}>
                    <View style={styles.row}>
                        <Text>订单详情</Text>
                        <SvgIcon name={SvgPath.downArrow} color={'#BBBBBB'} size={18} />
                    </View>
                    <Row>
                        <Text style={styles.price2}>订单编号:</Text>
                        <Text style={styles.price1}>443383838383888388388</Text>
                    </Row>
                    <Row>
                        <Text style={styles.price2}>支付交易号:</Text>
                        <Text style={styles.price1}>443383838383888388388</Text>
                    </Row>
                    <Row>
                        <Text style={styles.price2}>创建时间:</Text>
                        <Text style={styles.price1}>2021-02-09 18:00:14</Text>
                    </Row>
                    <View style={styles.border} />
                    <Pressable style={styles.messageContainer}>
                        <Row>
                            <SvgIcon name={SvgPath.message2} color="#006CC2" size={20} />
                            <Text style={{ marginLeft: pixel(10) }}>联系卖家</Text>
                        </Row>
                    </Pressable>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    border: {
        borderWidth: 1,
        borderColor: '#eeeeee',
        marginVertical: pixel(14),
    },
    messageContainer: {
        alignSelf: 'center',
    },
    container: {
        flex: 1,
        backgroundColor: Theme.groundColour,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    contentStyle: {
        flexGrow: 1,
    },
    header: {
        height: pixel(80),
        padding: pixel(14),
    },
    statusText: {
        color: '#fff',
        fontSize: font(16),
    },
    addressContainer: {
        backgroundColor: '#fff',
        padding: pixel(14),
    },
    addRessBorder: {
        width: pixel(48),
        height: pixel(48),
        borderRadius: pixel(24),
        backgroundColor: '#FF4D3A',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: pixel(14),
    },
    phone: {
        color: 'grey',
        marginLeft: pixel(10),
        fontSize: font(12),
    },
    address: {
        marginTop: pixel(6),
        color: 'rgba(0,0,0,0.6)',
    },
    other: {
        width: '80%',
    },
    shoppingContainer: {
        marginTop: pixel(14),
        backgroundColor: '#fff',
        padding: pixel(14),
    },
    priceContainer: {
        marginTop: pixel(14),
    },
    price: {
        color: '#6F6F6F',
        marginTop: pixel(6),
    },
    price1: {
        color: '#6F6F6F',
        marginTop: pixel(14),
        marginLeft: pixel(20),
    },
    price2: {
        color: '#6F6F6F',
        marginTop: pixel(14),
    },
});

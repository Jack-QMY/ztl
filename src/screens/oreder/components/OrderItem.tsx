import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Row, SvgIcon, SvgPath } from '~/components';

interface Props {
    order: any;
    category?: number;
    type?: 'detailes' | 'normal';
}

export default function OrderItem(props: Props) {
    const { order, category, type } = props;
    const navigation = useNavigation();
    return (
        <Pressable style={styles.container} onPress={() => navigation.navigate('OrderDetailes', { order: order })}>
            <Pressable style={styles.row}>
                <Row>
                    <SvgIcon name={SvgPath.dianpu} color="#8C8C8C" size={24} />
                    <Text style={styles.shoppingName}>商店名字</Text>
                    <SvgIcon name={SvgPath.rightArrow} color="#8C8C8C" />
                </Row>
                {type === 'normal' ? <Text style={styles.status}>等待支付</Text> : null}
            </Pressable>
            <View style={{ marginVertical: pixel(14) }}>
                <Row>
                    <Image
                        source={{
                            uri: 'https://pic1.zhimg.com/v2-3b4fc7e3a1195a081d0259246c38debc_720w.jpg?source=172ae18b',
                        }}
                        style={styles.cover}
                    />
                    <View style={styles.content}>
                        <Row style={{ justifyContent: 'space-between' }}>
                            <Text style={styles.title} numberOfLines={1}>
                                超市饮料柜台[媒体用图]
                            </Text>
                            <Text style={{ color: '#A0A0A0' }}>¥888.00</Text>
                        </Row>
                        <Row style={{ justifyContent: 'space-between', marginTop: pixel(14) }}>
                            <Text style={styles.mask}>超市饮料柜台[媒体用图]超市饮料柜台</Text>
                            <Text style={{ color: '#A0A0A0' }}>*1</Text>
                        </Row>
                    </View>
                </Row>
            </View>
            <Text style={[styles.price, { color: type === 'detailes' ? '#FE4949' : '#000' }]}>实付款：¥888</Text>
            {type === 'normal' ? (
                <View style={styles.bottomButton}>
                    <Pressable style={[styles.button]} onPress={() => navigation.navigate('MyAddressSecreen')}>
                        <Text style={styles.buttonText}>修改地址</Text>
                    </Pressable>
                    <Pressable style={[styles.button]}>
                        <Text style={styles.buttonText}>取消订单</Text>
                    </Pressable>
                    <LinearGradient
                        style={styles.linearGradientStyle}
                        start={{ x: 1, y: 0 }}
                        end={{ x: 0, y: 1 }}
                        colors={['#FE4949', '#FD7420']}>
                        <Pressable
                            style={styles.button1}
                            onPress={() => navigation.navigate('PayOrder', { price: 888 })}>
                            <Text style={styles.buttonText1}>立即支付</Text>
                        </Pressable>
                    </LinearGradient>
                </View>
            ) : null}
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        // backgroundColor: '#fff',
        // margin: pixel(14),
        // padding: pixel(14),
        // borderRadius: pixel(6),
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    shoppingName: {
        marginLeft: pixel(6),
    },
    status: {
        color: '#F64442',
        fontSize: font(12),
        fontWeight: 'bold',
    },
    content: {
        height: pixel(100),
        marginLeft: pixel(14),
    },
    cover: {
        width: pixel(100),
        height: pixel(100),
        borderRadius: pixel(8),
    },
    title: {
        width: '50%',
        fontSize: font(12),
    },
    mask: {
        width: '60%',
        color: '#A0A0A0',
        fontSize: font(10),
    },
    price: {
        textAlign: 'right',
    },
    bottomButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginTop: pixel(14),
    },
    button: {
        borderWidth: 1,
        borderColor: '#A2A2A2',
        height: pixel(30),
        alignItems: 'center',
        justifyContent: 'center',
        width: pixel(80),
        borderRadius: pixel(15),
        marginRight: pixel(10),
    },
    linearGradientStyle: {
        borderRadius: 15,
    },
    button1: {
        height: pixel(30),
        width: pixel(80),
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: '#333333',
        fontSize: font(10),
    },
    buttonText1: {
        color: '#fff',
        fontSize: font(10),
    },
});

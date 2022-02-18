import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useCallback, useMemo, useState } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { NavBarHeader, Row, SvgIcon, SvgPath } from '~/components';

export default function PayOrder() {
    const navigation = useNavigation();
    const router = useRoute();
    const price = router.params.price;
    const payData = useMemo(
        () => [
            {
                id: 1,
                title: '余额支付',
                mask: `余额不足，可用余额${price}`,
                icons: require('~/assets/images/81.png'),
            },
            {
                id: 2,
                title: 'GPK付款',
                mask: `可用GPK${price}`,
                icons: require('~/assets/images/81.png'),
            },
            {
                id: 3,
                title: '微信支付',
                mask: '推荐使用微信支付',
                icons: require('~/assets/images/WECHAT.png'),
            },
            {
                id: 4,
                title: '支付宝',
                mask: '',
                icons: require('~/assets/images/ALIPAY.png'),
            },
        ],
        [price],
    );

    const [payIndex, setPayIndex] = useState(0);
    const [pay, setPay] = useState();
    const SelectIndex = useCallback(
        (index: number) => {
            setPayIndex(index);
            setPay(payData[index].id);
        },
        [payData],
    );
    const onPress = useCallback(() => {
        Toast.show({ content: '支付成功' });
    }, []);
    return (
        <View style={styles.container}>
            <NavBarHeader title="收银台" />
            <View style={styles.header}>
                <Text style={styles.orderNumber}>订单号：123456833333-3---3=</Text>
                <Text style={styles.price}>¥{price}</Text>
            </View>
            <View style={{ marginTop: pixel(20) }}>
                {payData.map((item, index) => {
                    return (
                        <Pressable key={item.id} style={styles.selectButton} onPress={() => SelectIndex(index)}>
                            <Row>
                                <Image source={item.icons} style={styles.icons} />
                                <View
                                    style={{
                                        marginLeft: pixel(14),
                                        justifyContent: 'space-around',
                                    }}>
                                    <Text>{item.title}</Text>
                                    {item.mask ? <Text style={styles.mask}>{item.mask}</Text> : null}
                                </View>
                            </Row>
                            <SvgIcon name={payIndex === index ? SvgPath.isCheck : SvgPath.check} color="#6E6E6E" />
                        </Pressable>
                    );
                })}
                <LinearGradient
                    style={{ marginTop: pixel(24), borderRadius: 8, marginHorizontal: pixel(14) }}
                    start={{ x: 1, y: 0 }}
                    end={{ x: 0, y: 1 }}
                    colors={['#FF0503', '#FD7420']}>
                    <Pressable style={styles.button} onPress={onPress}>
                        <Text style={styles.buttonText}>确认支付</Text>
                    </Pressable>
                </LinearGradient>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        alignSelf: 'center',
        marginTop: pixel(40),
        alignItems: 'center',
    },
    orderNumber: {
        fontSize: font(12),
        color: '#6E6E6E',
    },
    price: {
        fontSize: font(26),
        color: '#000',
        marginTop: pixel(10),
    },
    icons: {
        width: pixel(30),
        height: pixel(30),
    },
    selectButton: {
        margin: pixel(14),
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    mask: {
        color: 'grey',
        marginTop: pixel(6),
    },
    button: {
        height: pixel(48),
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: font(14),
        fontWeight: 'bold',
    },
});

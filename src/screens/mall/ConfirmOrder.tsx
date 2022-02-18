import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { Image, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { AnimatedBottomModal, ListItem, NavBarHeader, Row, SvgIcon, SvgPath } from '~/components';

export default function ConfirmOrder() {
    const navigation = useNavigation();
    const router = useRoute();
    const order = router.params.order; // 购买商品订单参数
    const num = router.params.num; // 购买数量
    const price = order?.number * num;
    const [address, setAddress] = useState('点击此处填写地址');
    const [remark, setRemark] = useState('');
    const [visiable, setVisiable] = useState(false);
    const onPress = useCallback(() => {
        /* 地址逻辑添加完善 */
        navigation.navigate('PayOrder', { price });
    }, [price, navigation]);

    return (
        <View style={styles.container}>
            <NavBarHeader title="确认订单" />
            <Pressable
                style={[styles.header, styles.row]}
                onPress={() => navigation.navigate('CreatAddress', { setAddress: setAddress })}>
                <Row>
                    <View style={styles.addRessBorder}>
                        <SvgIcon name={SvgPath.address1} color={'#FFFF'} size={20} />
                    </View>
                    <Text>{address}</Text>
                </Row>
                <SvgIcon name={SvgPath.rightArrow} color="#BBBBBB" size={30} />
            </Pressable>
            <View style={styles.content}>
                <Row>
                    <SvgIcon name={SvgPath.dianpu1} color="#FF1403" size={20} />
                    <Text style={{ marginLeft: pixel(10) }}>厨具（商铺名）</Text>
                </Row>
                <Row style={styles.order}>
                    <Image source={{ uri: order?.url }} style={styles.cover} />
                    <View style={styles.orderMask}>
                        <Row style={styles.priceCommen}>
                            <Text>{order?.title}</Text>
                            <Text>¥ {price}</Text>
                        </Row>
                        <Row style={[styles.priceCommen, { marginTop: pixel(14) }]}>
                            <Text style={{ color: '#bbbbbb' }}>{order?.title}</Text>
                            <Text style={{ color: '#bbbbbb' }}>x {num}</Text>
                        </Row>
                    </View>
                </Row>
                <ListItem
                    style={styles.list}
                    leftComponent={<Text style={styles.leftTitle}>快递运费</Text>}
                    rightComponent={<Text>小件偏远地区不包邮¥ 10.00</Text>}
                />
                <ListItem
                    onPress={() => setVisiable(true)}
                    style={styles.list}
                    leftComponent={<Text style={styles.leftTitle}>优惠折扣</Text>}
                    rightComponent={
                        <Row>
                            <Text style={styles.leftTitle}>请选择</Text>
                            <SvgIcon name={SvgPath.rightArrow} size={28} color="#bbbbbb" />
                        </Row>
                    }
                />
                <View style={styles.inputBorder}>
                    <Text style={[styles.leftTitle]}>备注 </Text>
                    <TextInput
                        value={remark}
                        onChangeText={(value) => setRemark(value)}
                        style={styles.inputBody}
                        placeholder="订单备注可选"
                        multiline={true}
                        maxLength={50}
                    />
                </View>
                <View style={{ marginTop: pixel(10), alignSelf: 'flex-end' }}>
                    <Text>
                        {`共${num}件，小计: `}
                        <Text style={{ color: 'red' }}> ¥{price}</Text>
                    </Text>
                </View>
            </View>

            <View style={styles.bottomContent}>
                <Text>
                    {`共${num}件，合计: `}
                    <Text style={{ color: 'red' }}> ¥{price}</Text>
                </Text>
                <Pressable style={styles.submit} onPress={onPress}>
                    <Text style={styles.submitText}>提交订单</Text>
                </Pressable>
            </View>
            <AnimatedBottomModal visible={visiable} toggleVisible={() => setVisiable(false)}>
                <View style={styles.modalContainer}>
                    <Text style={styles.modalTitle}>优惠券</Text>
                    <Pressable style={styles.modalOnpress}>
                        <Text style={styles.bottomRightButtonText}>完成</Text>
                    </Pressable>
                </View>
            </AnimatedBottomModal>
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
    header: {
        padding: pixel(10),
        backgroundColor: '#fff',
        borderRadius: pixel(8),
        marginHorizontal: pixel(14),
    },
    addRessBorder: {
        width: pixel(40),
        height: pixel(40),
        borderRadius: pixel(20),
        backgroundColor: '#FF4D3A',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: pixel(14),
    },
    content: {
        marginTop: pixel(14),
        padding: pixel(10),
        backgroundColor: '#fff',
        borderRadius: pixel(8),
        marginHorizontal: pixel(14),
    },
    order: {
        marginTop: pixel(10),
    },
    cover: {
        width: pixel(100),
        height: pixel(100),
        borderRadius: pixel(10),
    },
    orderMask: {
        height: pixel(100),
        marginLeft: pixel(14),
    },
    priceCommen: {
        alignItems: 'center',
        justifyContent: 'space-between',
        width: Device.width - pixel(100) - pixel(62),
    },
    list: {
        marginTop: pixel(30),
        alignItems: 'center',
    },
    leftTitle: {
        color: '#BBBBBB',
    },
    inputBorder: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        height: pixel(60),
    },
    inputBody: {
        width: Device.width - pixel(100),
        marginLeft: pixel(14),
    },
    bottomContent: {
        position: 'absolute',
        bottom: 0,
        width: Device.width,
        paddingVertical: pixel(14),
        backgroundColor: '#fff',
        justifyContent: 'flex-end',
        alignItems: 'center',
        flexDirection: 'row',
    },
    submit: {
        width: pixel(100),
        height: pixel(40),
        borderRadius: pixel(20),
        backgroundColor: '#FF1403',
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: pixel(14),
    },
    submitText: {
        fontSize: font(12),
        color: '#fff',
        fontWeight: 'bold',
    },
    modalContainer: {
        height: '50%',
        padding: pixel(14),
        flexGrow: 1,
    },
    modalTitle: {
        textAlign: 'center',
        fontSize: font(14),
        fontWeight: 'bold',
        color: '#000',
    },
    modalOnpress: {
        backgroundColor: '#FF1403',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        height: pixel(40),
        borderRadius: pixel(20),
        position: 'absolute',
        bottom: pixel(14),
        width: Device.width - pixel(28),
    },
    bottomRightButtonText: {
        color: '#FFF',
        fontSize: font(14),
        fontWeight: 'bold',
    },
});

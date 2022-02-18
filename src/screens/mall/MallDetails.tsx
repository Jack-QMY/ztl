import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import Swiper from 'react-native-swiper';
import { AnimatedBottomModal, AnimatedModal, Avatar, Row, ShareModal, SvgIcon, SvgPath } from '~/components';
import { pixel } from '~/utils/scale';
import CommentItem from './components/CommentItem';

const swiperData = [
    {
        id: 1,
        url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRc3q4wXDJW5fO9nyCU5pR0rJxXb9ubYam32w&usqp=CAU',
    },
    {
        id: 2,
        url: 'https://img95.699pic.com/photo/50050/0516.jpg_wh300.jpg',
    },
    {
        id: 3,
        url: 'http://image.woshipm.com/wp-files/2019/05/aI9ZlRJ2yNS6J5ecqUq6.png',
    },
];
const commentData = [
    {
        id: 1,
        time: '24天前',
        commentImages: [
            {
                id: 1,
                width: 200,
                height: 200,
                url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRc3q4wXDJW5fO9nyCU5pR0rJxXb9ubYam32w&usqp=CAU',
            },
            {
                id: 2,
                width: 300,
                height: 300,
                url: 'https://img95.699pic.com/photo/50050/0516.jpg_wh300.jpg',
            },
            {
                id: 3,
                width: 200,
                height: 300,
                url: 'http://image.woshipm.com/wp-files/2019/05/aI9ZlRJ2yNS6J5ecqUq6.png',
            },
            {
                id: 4,
                width: 200,
                height: 200,
                url: 'http://image.woshipm.com/wp-files/2019/05/aI9ZlRJ2yNS6J5ecqUq6.png',
            },
        ],
        conmment:
            '商品评分、店家服务态度、物流发货速度。 ... 商品评分：商品评分主要是根据商品的质量，商品与卖家描述的是否相符，商品的价格和质量是否成正比等来打分。 店家服务态度：店家服务态度主要包含用户在购买商品前，和购买后针对商品细节，以及售后等服务性咨询',
    },
];
const serverData = [
    { id: 1, title: '美妆服饰', name: '1' },
    { id: 2, title: '黄金首饰', name: '黄金' },
];

const commentType = [
    { id: 1, title: '好评', num: 3, type: 2 },
    { id: 2, title: '中评', num: 0, type: 3 },
    { id: 3, title: '差评', num: 0, type: 4 },
    { id: 4, title: '有图', num: 0, type: 5 },
];
const POSTER_WIDTH = Device.width;
const POSTER_HEIGHT = Device.width * 0.82;
//商品规格数据
const selectData = [
    {
        id: 1,
        title: '砂糖橘红色',
        number: 100,
        url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRc3q4wXDJW5fO9nyCU5pR0rJxXb9ubYam32w&usqp=CAU',
    },
    {
        id: 2,
        title: '砂糖橘橙色',
        number: 200,
        url: 'https://img95.699pic.com/photo/50050/0516.jpg_wh300.jpg',
    },
];

export default function MallDetails() {
    const router = useRoute();
    const navigation = useNavigation();
    const mall = router.params.mall;
    const [num, setNum] = useState(1); // 添加数量
    const [serviceVisiable, setServiceVisiable] = useState(false); //商品服务弹窗
    const [isFollow, setIsFollow] = useState(false); // todo:关注商品完善
    const [shareVisiable, setShareVisiable] = useState(false); // 分享弹窗
    const [shoppingVisiable, setShoppingVisiable] = useState(false); // 商品购买添加购物车弹窗

    /* 轮播图 */
    const [imageVisable, setImageVisable] = useState(false);
    const [imageIndex, setImageIndex] = useState(0);
    const renderPagination = useCallback((index, total, context) => {
        return (
            <View style={styles.paginationStyle}>
                <Text style={styles.paginationText}>
                    {index + 1}/{total}
                </Text>
            </View>
        );
    }, []);

    /* 选中商品类型模块 */
    const [shoppingData, setShoppingData] = useState(selectData || []);
    const [isShoppingShow, setIsShoppingShow] = useState(false);
    const [typeData, setTypeData] = useState({}); //参数对象值改变
    const [shoppingIndex, setShoppingIndex] = useState(-1);
    const selectIndex = useCallback(
        (index: number) => {
            setIsShoppingShow(true);
            setShoppingIndex(index);
            setTypeData(shoppingData[index]);
        },
        [shoppingData],
    );

    /* 添加购物车 ||立即购买 */
    const [type, setType] = useState(''); // type自定义两个类型，添加购物车=>add;立即购买=>buy
    const [showNum, setShowNum] = useState(false); // 模拟添加购物车状态数量数据显示
    const [normVisible, setNormVisible] = useState(false); // 点击规格状态选择
    const onPressType = useCallback(
        (categroy?: string) => {
            setType('');
            if (type === 'add' || categroy === 'add') {
                setShoppingVisiable(false);
                Toast.show({ content: '添加购物车成功' });
                setShowNum(true);
            } else {
                if (shoppingIndex == -1) {
                    Toast.show({ content: '您还没有选择商品规格' });
                } else {
                    setShoppingVisiable(false);
                    navigation.navigate('ConfirmOrder', { order: typeData, num });
                }
            }
        },
        [type, typeData, shoppingIndex, num, navigation],
    );

    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.header}>
                    <Pressable onPress={() => navigation.goBack()}>
                        <SvgIcon name={SvgPath.back} size={22} color="#BBBBBB" />
                    </Pressable>
                    <Pressable
                        style={styles.serachBorder}
                        onPress={() => navigation.navigate('SerachScreen', { keyword: '' })}>
                        <SvgIcon name={SvgPath.serach} color="#666666" size={20} />
                        <Text style={styles.address}>请输入你要搜索的商户名称</Text>
                    </Pressable>
                </View>
                <View style={styles.swiperContainer}>
                    <Swiper
                        width={POSTER_WIDTH}
                        height={POSTER_HEIGHT}
                        horizontal={true}
                        autoplay={true}
                        index={0}
                        showsPagination={true}
                        renderPagination={renderPagination}
                        removeClippedSubviews={false}
                        style={styles.swiperStyle}>
                        {swiperData.map((item, index) => {
                            return (
                                <Pressable
                                    key={item.id}
                                    onPress={() => {
                                        setImageVisable(true);
                                        setImageIndex(index);
                                    }}>
                                    <Image source={{ uri: item.url }} style={styles.cover} />
                                </Pressable>
                            );
                        })}
                    </Swiper>
                </View>
                <View style={styles.contentContainer}>
                    <View style={styles.row}>
                        <Row>
                            <Text style={styles.price}>
                                ¥<Text style={{ fontSize: font(16) }}>88.88</Text>
                            </Text>
                            <Text style={styles.gpk}>GPK:19.34</Text>
                        </Row>
                        <Pressable onPress={() => setIsFollow(!isFollow)}>
                            <SvgIcon
                                name={isFollow ? SvgPath.is_follow : SvgPath.follow}
                                color={isFollow ? 'red' : '#000'}
                                size={22}
                            />
                            <Text style={[styles.followText]}>{isFollow ? '取关' : '关注'}</Text>
                        </Pressable>
                    </View>
                    <View style={styles.goldBorder}>
                        <Text style={styles.goldBorderText}>148.5积分</Text>
                    </View>
                    <View style={[styles.row, { marginTop: pixel(14) }]}>
                        <Text style={styles.title}>
                            <Text style={styles.ziyinBorder}>自营</Text>
                            北丹尊贵武夷山岩茶正山小种2罐100G
                        </Text>
                        <Pressable style={styles.shareBorder} onPress={() => setShareVisiable(true)}>
                            <Row>
                                <SvgIcon name={SvgPath.share} color="#bbbbbb" size={20} />
                                <Text style={styles.shareText}>分享</Text>
                            </Row>
                        </Pressable>
                    </View>
                    <View style={[styles.row, { marginTop: pixel(10) }]}>
                        <Row>
                            <SvgIcon name={SvgPath.address} size={20} color="#BBBBBB" />
                            <Text style={{ color: '#BBBBBB' }}> 长沙市</Text>
                        </Row>
                        <Text style={{ color: '#BBBBBB' }}>快递费：¥0</Text>
                        <Text style={{ color: '#BBBBBB' }}>月销： ¥52</Text>
                    </View>
                    <Pressable
                        style={{ marginTop: pixel(20) }}
                        onPress={() => {
                            setNormVisible(true);
                            setShoppingVisiable(true);
                        }}>
                        <View style={[styles.row, { marginTop: pixel(20) }]}>
                            <Row>
                                <Text style={{ color: '#BBBBBB' }}>选择</Text>
                                <Text style={{ marginLeft: pixel(20) }}>商品名</Text>
                            </Row>
                            <SvgIcon name={SvgPath.rightArrow} color="#bbbbbb" size={28} />
                        </View>
                        <View style={{ marginLeft: pixel(40) }}>
                            <Row style={{ marginTop: pixel(10) }}>
                                {shoppingData.map((item, index) => {
                                    return (
                                        <Pressable key={item.id} style={[styles.typeDataButton]}>
                                            <Text style={{ color: '#737373' }}>{item.title}</Text>
                                        </Pressable>
                                    );
                                })}
                            </Row>
                        </View>
                    </Pressable>

                    <Pressable style={[styles.row, { marginTop: pixel(20) }]} onPress={() => setServiceVisiable(true)}>
                        <Text style={{ color: '#BBBBBB' }}>服务</Text>
                        <SvgIcon name={SvgPath.rightArrow} color="#bbbbbb" size={28} />
                    </Pressable>
                </View>
                <View style={[styles.row, styles.contentContainer, { marginTop: pixel(14) }]}>
                    <Row>
                        <Text style={{ color: '#BBBBBB' }}>参数</Text>
                        <Text style={{ marginLeft: pixel(20) }}>品牌，规格等...</Text>
                    </Row>
                    <SvgIcon name={SvgPath.rightArrow} color="#bbbbbb" size={28} />
                </View>
                <View style={[styles.contentContainer, { marginTop: pixel(14) }]}>
                    <Pressable style={styles.row} onPress={() => navigation.navigate('CommentScreen', { type: 1 })}>
                        <Text>宝贝评论(3)</Text>
                        <Row>
                            <Text style={{ color: '#F81818' }}>100%好评</Text>
                            <SvgIcon name={SvgPath.rightArrow} color="#bbbbbb" size={28} color="#F81818" />
                        </Row>
                    </Pressable>
                    <Row style={styles.commentType}>
                        {commentType.map((item, index) => {
                            return (
                                <Pressable
                                    key={index}
                                    style={styles.commentTypeBorder}
                                    onPress={() => navigation.navigate('CommentScreen', { type: item.type })}>
                                    <Text style={{ color: '#7B7571' }}>{`${item.title}(${item.num})`}</Text>
                                </Pressable>
                            );
                        })}
                    </Row>
                    <CommentItem comment={commentData[0]} style={{ marginHorizontal: pixel(-14) }} />
                    <Pressable
                        style={{ alignItems: 'center' }}
                        onPress={() => navigation.navigate('CommentScreen', { type: 1 })}>
                        <Row>
                            <Text style={{ color: '#676968' }}>查看全部</Text>
                            <SvgIcon name={SvgPath.downArrow} size={16} color="#676968" />
                        </Row>
                    </Pressable>
                </View>
                <View style={[styles.contentContainer, { marginTop: pixel(14) }]}>
                    <View style={[styles.row]}>
                        <Row>
                            <Avatar
                                size={50}
                                source={{
                                    uri: 'https://upload.jianshu.io/users/upload_avatars/6342050/811f2555-6c20-44b2-863e-ef10c790cf0d?imageMogr2/auto-orient/strip|imageView2/1/w/240/h/240',
                                }}
                            />
                            <View style={{ marginLeft: pixel(10) }}>
                                <Text>玄妙文化</Text>
                                <Text style={styles.text1}>0人关注店铺</Text>
                            </View>
                        </Row>
                        <Row>
                            <Pressable style={styles.all_treasure}>
                                <Text style={styles.all_treasureText}>全部宝贝</Text>
                            </Pressable>
                            <Pressable style={styles.all_shop}>
                                <Text style={styles.bottomRightButtonText}>进店逛逛</Text>
                            </Pressable>
                        </Row>
                    </View>
                    <View style={[styles.row, { marginTop: pixel(10) }]}>
                        <Row>
                            <Text style={styles.text1}>宝贝描述 5</Text>
                            <View style={styles.scoreBorder}>
                                <Text style={styles.scoreBorderText}>高</Text>
                            </View>
                        </Row>
                        <Row>
                            <Text style={styles.text1}>卖家服务 5</Text>
                            <View style={styles.scoreBorder}>
                                <Text style={styles.scoreBorderText}>高</Text>
                            </View>
                        </Row>
                        <Row>
                            <Text style={styles.text1}>物流服务 5</Text>
                            <View style={styles.scoreBorder}>
                                <Text style={styles.scoreBorderText}>高</Text>
                            </View>
                        </Row>
                    </View>
                </View>
                {swiperData.map((item, index) => {
                    return <Image source={{ uri: item.url }} style={styles.coverStyle} key={index} />;
                })}
            </ScrollView>
            <View style={[styles.bottomContent, styles.row]}>
                <Pressable style={{ alignItems: 'center' }}>
                    <SvgIcon name={SvgPath.dianpu} color="#DC1113" size={22} />
                    <Text style={{ marginTop: 2, fontSize: font(10) }}>店铺</Text>
                </Pressable>
                <Pressable style={{ alignItems: 'center' }} onPress={() => navigation.navigate('ShoppingCart')}>
                    <SvgIcon name={SvgPath.gouwuche} size={22} />
                    <Text style={{ marginTop: 2, fontSize: font(10) }}>购物车</Text>
                    {/* todo：替换 */}
                    {showNum && (
                        <View style={styles.bageBorder}>
                            <Text style={{ color: '#fff' }}>{num}</Text>
                        </View>
                    )}
                </Pressable>
                <Pressable style={{ alignItems: 'center' }}>
                    <SvgIcon name={SvgPath.kefu} size={22} />
                    <Text style={{ marginTop: 2, fontSize: font(10) }}>客服</Text>
                    <View style={styles.kefuBage} />
                </Pressable>
                <Row>
                    <Pressable
                        style={styles.bottomLeftButton}
                        onPress={() => {
                            setShoppingVisiable(true);
                            setNormVisible(false);
                            setType('add');
                        }}>
                        <Text style={styles.bottomRightButtonText}>加入购物车</Text>
                    </Pressable>
                    <Pressable
                        style={styles.bottomRightButton}
                        onPress={() => {
                            setShoppingVisiable(true);
                            setNormVisible(false);
                            setType('buy');
                        }}>
                        <Text style={styles.bottomRightButtonText}>立即购买</Text>
                    </Pressable>
                </Row>
            </View>
            <ShareModal visible={shareVisiable} toggleVisible={() => setShareVisiable(false)} />
            <AnimatedModal visible={imageVisable} toggleVisible={() => setImageVisable(false)} showIcon={true}>
                <ImageViewer
                    onSwipeDown={() => setImageVisable(false)}
                    imageUrls={swiperData}
                    index={imageIndex}
                    enableSwipeDown={true}
                />
            </AnimatedModal>
            <AnimatedBottomModal visible={shoppingVisiable} toggleVisible={() => setShoppingVisiable(false)}>
                <Row style={{ margin: pixel(14) }}>
                    <Image
                        source={{
                            uri:
                                typeData?.url ||
                                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRc3q4wXDJW5fO9nyCU5pR0rJxXb9ubYam32w&usqp=CAU',
                        }}
                        style={styles.modalCover}
                    />
                    <View style={{ marginLeft: pixel(14) }}>
                        <Text style={styles.price}>¥88.00</Text>
                        {isShoppingShow && (
                            <Text style={{ marginTop: pixel(10), color: 'grey' }}>库存{typeData?.number}件</Text>
                        )}
                        <Text style={styles.modalTitle}>
                            {isShoppingShow ? '已选择：' : '未选择：'}
                            <Text style={{ color: isShoppingShow ? '#000' : '#BBBBBB' }}>
                                {typeData?.title || '北丹尊贵武夷山岩茶正山小种2罐100G'}
                            </Text>
                        </Text>
                    </View>
                </Row>
                <View style={styles.selectModalType}>
                    <Text>北丹尊贵武夷山岩茶正山小种2罐100G</Text>
                    <Row style={{ flexWrap: 'wrap', marginTop: 10 }}>
                        {shoppingData.map((item, index) => {
                            return (
                                <Pressable
                                    key={item.id}
                                    style={[
                                        styles.typeDataButton,
                                        shoppingIndex === index && { borderColor: 'red', borderWidth: 1 },
                                    ]}
                                    onPress={() => selectIndex(index)}>
                                    <Text style={{ color: shoppingIndex === index ? 'red' : '#737373' }}>
                                        {item.title}
                                    </Text>
                                </Pressable>
                            );
                        })}
                    </Row>
                </View>
                <Row style={{ justifyContent: 'space-between', paddingHorizontal: pixel(14) }}>
                    <Text>购买数量</Text>
                    <View style={[styles.bottomAddButton, styles.row]}>
                        <Pressable
                            style={styles.addButton}
                            onPress={() => {
                                if (num <= 1) {
                                    Toast.show({ content: '数量不能在少了哦' });
                                } else {
                                    setNum((prevCount) => prevCount - 1);
                                }
                            }}>
                            <SvgIcon name={SvgPath.reduce} size={18} color="#BBBBBB" />
                        </Pressable>
                        <Text style={{ marginHorizontal: pixel(20) }}>{num}</Text>
                        <Pressable style={styles.addButton} onPress={() => setNum((prevCount) => prevCount + 1)}>
                            <SvgIcon name={SvgPath.add} size={18} color="#BBBBBB" />
                        </Pressable>
                    </View>
                </Row>
                {normVisible ? (
                    <Row style={styles.normVisibleContainer}>
                        <Pressable
                            style={[styles.bottomLeftButton, styles.normVisibleButton]}
                            onPress={() => {
                                setShoppingVisiable(false);
                                setType('add');
                                onPressType('add');
                            }}>
                            <Text style={styles.bottomRightButtonText}>加入购物车</Text>
                        </Pressable>
                        <Pressable
                            style={[styles.bottomRightButton, styles.normVisibleButton]}
                            onPress={() => {
                                setShoppingVisiable(false);
                                setType('buy');
                                onPressType('buy');
                            }}>
                            <Text style={styles.bottomRightButtonText}>立即订购</Text>
                        </Pressable>
                    </Row>
                ) : (
                    <Pressable onPress={onPressType} style={styles.modalOnpress}>
                        <Text style={styles.bottomRightButtonText}>完成</Text>
                    </Pressable>
                )}
            </AnimatedBottomModal>
            <AnimatedBottomModal visible={serviceVisiable} toggleVisible={() => setServiceVisiable(false)}>
                <View style={styles.serviceContainer}>
                    <Text style={styles.service_title}>基础服务保障</Text>
                    {serverData.map((item, index) => {
                        return (
                            <View key={index} style={{ marginTop: pixel(20) }}>
                                <Row>
                                    <SvgIcon name={SvgPath.baozhang} color="#FE4949" size={24} />
                                    <View style={{ marginLeft: pixel(14) }}>
                                        <Text>{item.title}</Text>
                                        <Text style={{ color: 'grey', marginTop: pixel(6) }}>{item.name}</Text>
                                    </View>
                                </Row>
                            </View>
                        );
                    })}
                </View>
            </AnimatedBottomModal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Device.isIOS ? Device.statusBarHeight * 1.2 : 0,
        backgroundColor: Theme.groundColour,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: pixel(14),
        marginBottom: pixel(10),
    },
    address: {
        fontSize: font(10),
        color: '#B0B0B0',
        marginHorizontal: pixel(8),
    },
    serachBorder: {
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingHorizontal: pixel(Theme.edgeDistance),
        height: pixel(34),
        borderRadius: pixel(20),
        marginLeft: pixel(10),
        width: Device.width - pixel(60),
    },
    swiperContainer: {
        overflow: 'hidden',
        height: POSTER_HEIGHT,
    },
    swiperStyle: {
        height: POSTER_HEIGHT,
        borderRadius: pixel(10),
    },
    paginationStyle: {
        position: 'absolute',
        bottom: pixel(5),
        paddingRight: pixel(15),
        right: pixel(10),
        backgroundColor: 'rgba(0,0,0,0.1)',
        borderRadius: pixel(10),
        paddingVertical: pixel(2),
        flexGrow: 1,
        paddingLeft: pixel(10),
    },
    paginationText: {
        color: 'white',
        fontSize: pixel(12),
        textAlign: 'center',
    },
    cover: {
        height: POSTER_HEIGHT,
        width: POSTER_WIDTH,
    },
    contentContainer: {
        padding: pixel(14),
        backgroundColor: '#fff',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    price: {
        fontSize: font(12),
        color: 'red',
    },
    gpk: {
        color: '#BBBBBB',
        fontSize: font(12),
        marginLeft: pixel(10),
    },
    followText: {
        fontSize: font(12),
        marginTop: pixel(4),
        color: '#000',
    },
    goldBorder: {
        width: pixel(70),
        height: pixel(26),
        borderRadius: pixel(4),
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FEE1EB',
    },
    goldBorderText: {
        color: '#DF464F',
        fontSize: font(12),
    },
    ziyinBorder: {
        color: '#fff',
        fontSize: font(12),
        backgroundColor: 'red',
    },
    title: {
        fontSize: font(14),
        width: Device.width / 1.6,
        lineHeight: 22,
        letterSpacing: 1,
    },
    shareBorder: {
        marginRight: pixel(-14),
        backgroundColor: '#EEEEEE',
        paddingLeft: pixel(6),
        paddingRight: pixel(4),
        paddingVertical: pixel(4),
        borderTopLeftRadius: pixel(20),
        borderBottomLeftRadius: pixel(20),
    },
    shareText: {
        fontSize: font(12),
        color: '#BBBBBB',
        marginLeft: pixel(4),
    },
    bottomContent: {
        position: 'absolute',
        bottom: 0,
        width: Device.width,
        paddingHorizontal: pixel(14),
        paddingVertical: pixel(20),
        backgroundColor: '#fff',
    },
    bottomLeftButton: {
        backgroundColor: '#FEB902',
        height: pixel(40),
        alignItems: 'center',
        justifyContent: 'center',
        borderTopLeftRadius: pixel(20),
        borderBottomLeftRadius: pixel(20),
        paddingHorizontal: pixel(10),
    },
    bottomRightButton: {
        backgroundColor: '#FB3702',
        height: pixel(40),
        alignItems: 'center',
        justifyContent: 'center',
        borderTopRightRadius: pixel(20),
        borderBottomRightRadius: pixel(20),
        paddingHorizontal: pixel(10),
    },
    bottomRightButtonText: {
        color: '#FFF',
        fontSize: font(10),
        fontWeight: 'bold',
    },
    modalCover: {
        width: pixel(100),
        height: pixel(100),
        borderRadius: pixel(4),
    },
    modalTitle: {
        color: '#000',
        marginTop: pixel(14),
        lineHeight: pixel(20),
        width: Device.width - pixel(120) - pixel(14),
    },
    selectModalType: {
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: '#EEEEEE',
        padding: pixel(14),
        marginVertical: pixel(14),
    },
    typeDataButton: {
        backgroundColor: '#F7F5F6',
        marginRight: pixel(10),
        padding: pixel(6),
        borderRadius: 6,
    },
    addButton: {
        width: pixel(30),
        height: pixel(30),
        backgroundColor: '#F1F1F1',
        borderRadius: pixel(15),
        justifyContent: 'center',
        alignItems: 'center',
    },
    bottomAddButton: {
        borderWidth: 1,
        borderRadius: pixel(20),
        borderColor: '#F1F1F1',
    },
    modalOnpress: {
        margin: pixel(14),
        backgroundColor: '#FF1403',
        justifyContent: 'center',
        alignItems: 'center',
        height: pixel(40),
        borderRadius: pixel(20),
    },
    bageBorder: {
        backgroundColor: 'red',
        position: 'absolute',
        width: pixel(16),
        height: pixel(16),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        top: -8,
        right: -8,
    },
    kefuBage: {
        backgroundColor: 'red',
        position: 'absolute',
        width: pixel(8),
        height: pixel(8),
        borderRadius: 4,
        top: -8,
        right: -8,
    },
    normVisibleContainer: {
        marginVertical: pixel(20),
        marginHorizontal: pixel(14),
    },
    normVisibleButton: {
        width: Device.width / 2 - pixel(14),
    },
    serviceContainer: {
        paddingHorizontal: pixel(14),
        paddingVertical: pixel(20),
    },
    service_title: {
        fontSize: font(14),
        fontWeight: 'bold',
        color: '#000',
        textAlign: 'center',
    },
    commentType: {
        marginVertical: pixel(10),
        borderBottomWidth: 1,
        paddingBottom: pixel(20),
        borderColor: '#EEEEEE',
    },
    commentTypeBorder: {
        backgroundColor: '#FFF4EF',
        width: pixel(80),
        height: pixel(40),
        borderRadius: pixel(20),
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: pixel(8),
    },
    all_treasure: {
        borderWidth: 1,
        width: pixel(80),
        height: pixel(30),
        borderRadius: pixel(20),
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#DD0000',
    },
    all_treasureText: {
        color: '#DD0000',
        fontSize: font(10),
    },
    all_shop: {
        backgroundColor: '#FF1306',
        width: pixel(80),
        height: pixel(30),
        borderRadius: pixel(20),
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: pixel(10),
    },
    text1: {
        color: '#787878',
        marginTop: 4,
    },
    scoreBorder: {
        backgroundColor: '#FAEDE6',
        width: pixel(20),
        height: pixel(20),
        borderRadius: pixel(10),
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: pixel(8),
        marginTop: pixel(6),
    },
    scoreBorderText: {
        color: '#C87839',
        fontSize: font(12),
    },
    coverStyle: {
        width: Device.width,
        height: pixel(300),
    },
});

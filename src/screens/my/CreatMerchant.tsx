import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { AnimatedBottomModal, MediaUploader, NavBarHeader, Row, SvgIcon, SvgPath } from '~/components';

const project = [
    {
        id: 1,
        title: '房产经纪',
    },
    {
        id: 2,
        title: '婚纱摄影',
    },
    {
        id: 3,
        title: '文化工艺品',
    },
    {
        id: 4,
        title: '家装建材',
    },
    {
        id: 5,
        title: '玩具乐器',
    },
    {
        id: 6,
        title: '生鲜果实',
    },
    {
        id: 7,
        title: '食品饮料',
    },
    {
        id: 8,
        title: '医药保健',
    },
    {
        id: 9,
        title: '美妆护肤',
    },
    {
        id: 10,
        title: '日用百货',
    },
    {
        id: 11,
        title: '养生足道',
    },
    {
        id: 12,
        title: '美妆服饰',
    },
    {
        id: 13,
        title: '电脑办公',
    },
    {
        id: 14,
        title: '黄金珠宝',
    },
    {
        id: 15,
        title: '保险代理',
    },
    {
        id: 16,
        title: '汽车销售',
    },
    {
        id: 17,
        title: '家用电器',
    },
    {
        id: 18,
        title: '母婴童装',
    },
    {
        id: 19,
        title: '皮具箱包',
    },
    {
        id: 20,
        title: '数码手机',
    },
];

export default function CreatMerchant() {
    const navigation = useNavigation();
    const [formData, setFormData] = useState({
        chantName: '',
        detailAddress: '',
        description: '',
        user_name: '',
        user_phone: '',
    });
    const [merchantAvatar, setMerchantAvatar] = useState([]);
    const [merchantCover, setMerchantCover] = useState([]);
    const uploadResponse = useCallback((response) => {
        setMerchantAvatar(response);
    }, []);
    const uploadResponse1 = useCallback((response) => {
        setMerchantCover(response);
    }, []);
    const [selectAddress, setSelectAddress] = useState('');
    const [category, setCategory] = useState('');
    const [visible, setVisiable] = useState(false);
    const [categoryIndex, setCategoryIndex] = useState(-1);
    const categoryOnpress = useCallback((index: number) => {
        setCategoryIndex(index);
        setCategory(project[index].title);
        setVisiable(false);
    }, []);

    const onPress = useCallback(() => {
        if (
            !formData.chantName ||
            !formData.description ||
            !formData.detailAddress ||
            !formData.user_name ||
            !formData.user_phone
        ) {
            Toast.show({
                content: `${!formData.chantName
                        ? '请输入店铺名称'
                        : !formData.description
                            ? '请输入店铺简介'
                            : !formData.detailAddress
                                ? '请输入详细地址'
                                : !formData.user_name
                                    ? '请输入联系人'
                                    : '请输入联系电话'
                    }`,
            });
        } else if (!selectAddress) {
            Toast.show({ content: '请输入地址' });
        } else if (!category) {
            Toast.show({ content: '请选择经营分类' });
        } else if (!merchantAvatar.length > 0 || !merchantCover.length > 0) {
            Toast.show({ content: !merchantAvatar.length > 0 ? '请上传商铺头像' : '请上传商铺封面' });
        } else {
            navigation.navigate('MerchantCard', {
                formData,
                merchantAvatar,
                category,
                selectAddress,
                merchantCover,
            });
        }
    }, [formData, merchantAvatar, category, selectAddress, merchantCover, navigation]);

    const onPress1 = () => {
        navigation.navigate('MerchantCard');
    };
    return (
        <View style={styles.container}>
            <NavBarHeader title="商家入驻" />
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.content}>
                    <View style={styles.header}>
                        <SvgIcon name={SvgPath.gantanhao} color="#E50000" />
                        <Text style={styles.headerText}>店铺名称和主营项目审核通过后无法修改</Text>
                    </View>
                    <View style={[styles.row, styles.list]}>
                        <Text style={styles.leftTitle}>店铺名称</Text>
                        <TextInput
                            placeholder="请输入店铺名称(必填)"
                            maxLength={20}
                            value={formData.chantName}
                            onChangeText={(value) =>
                                setFormData({
                                    ...formData,
                                    chantName: value,
                                })
                            }
                        />
                    </View>
                    <Pressable
                        style={[styles.row, styles.list]}
                        onPress={() => navigation.navigate('SerachAddress', { setSelectAddress: setSelectAddress })}>
                        <Text style={styles.leftTitle}>归属地区</Text>
                        <Text style={styles.rightTitle}>{selectAddress || '选择地区'}</Text>
                    </Pressable>
                    <View style={[styles.list, styles.inputBody]}>
                        <Text style={styles.leftTitle}>详细地址</Text>
                        <TextInput
                            placeholder={'请输入商户详细地址'}
                            maxLength={30}
                            value={formData.detailAddress}
                            multiline={true}
                            style={{ marginTop: pixel(10) }}
                            onChangeText={(value) =>
                                setFormData({
                                    ...formData,
                                    detailAddress: value,
                                })
                            }
                        />
                    </View>
                    <Pressable
                        style={[styles.row, styles.list, { justifyContent: 'space-between' }]}
                        onPress={() => {
                            setVisiable(true);
                        }}>
                        <Row>
                            <Text style={styles.leftTitle}>经营项目</Text>
                            <Text>{category || ''}</Text>
                        </Row>
                        <SvgIcon name={SvgPath.rightArrow} color="#bbbbbb" size={28} />
                    </Pressable>
                    <View style={[styles.list, styles.inputBody1]}>
                        <Text style={styles.leftTitle}>简介</Text>
                        <TextInput
                            placeholder={'请输入店铺简介（不超过100字）'}
                            maxLength={100}
                            value={formData.description}
                            multiline={true}
                            style={{ marginTop: pixel(10) }}
                            onChangeText={(value) =>
                                setFormData({
                                    ...formData,
                                    description: value,
                                })
                            }
                        />
                        <Text style={styles.rightTitle1}>{formData.description.length}/100</Text>
                    </View>
                    <View style={[styles.row, styles.list]}>
                        <Text style={styles.leftTitle}>联系人姓名</Text>
                        <TextInput
                            placeholder="请输入联系人姓名"
                            value={formData.user_name}
                            onChangeText={(value) =>
                                setFormData({
                                    ...formData,
                                    user_name: value,
                                })
                            }
                        />
                    </View>
                    <View style={[styles.row, styles.list]}>
                        <Text style={styles.leftTitle}>联系人手机号</Text>
                        <TextInput
                            placeholder="请输入联系人手机号"
                            maxLength={11}
                            value={formData.user_phone}
                            onChangeText={(value) =>
                                setFormData({
                                    ...formData,
                                    user_phone: value,
                                })
                            }
                        />
                    </View>
                    <View style={styles.listBorder}>
                        <Text>上传店铺头像</Text>
                        <View style={styles.mediaWrap}>
                            <MediaUploader
                                type="image"
                                maximum={1}
                                onResponse={uploadResponse}
                                maxWidth={Device.width / 6}
                                style={styles.mediaItem}
                            />
                            <Text style={styles.uploadText}>点击上传</Text>
                            <Text style={styles.uploadText}>(尺寸推荐120X120，图片不能超过1M)</Text>
                        </View>
                    </View>
                    <View style={styles.listBorder}>
                        <Text>上传店铺封面图</Text>
                        <View style={styles.mediaWrap}>
                            <MediaUploader
                                type="image"
                                maximum={1}
                                onResponse={uploadResponse1}
                                maxWidth={Device.width / 6}
                                style={styles.mediaItem}
                            />
                            <Text style={styles.uploadText}>点击上传</Text>
                            <Text style={styles.uploadText}>(尺寸推荐120X120，图片不能超过1M)</Text>
                        </View>
                    </View>
                    <LinearGradient
                        style={styles.linearGradientStyle}
                        start={{ x: 1, y: 0 }}
                        end={{ x: 0, y: 1 }}
                        colors={['#FE4949', '#FD7420']}>
                        <Pressable style={styles.button} onPress={onPress1}>
                            <Text style={styles.buttonText}>下一步</Text>
                        </Pressable>
                    </LinearGradient>
                </View>
            </ScrollView>
            <AnimatedBottomModal visible={visible} toggleVisible={() => setVisiable(false)}>
                <View style={styles.bottomModal}>
                    <Text style={styles.modalTitle}>选择您的经营项目</Text>
                    <View style={styles.mapCatgeroy}>
                        {project.map((item, index) => {
                            return (
                                <Pressable
                                    key={item.id}
                                    style={styles.categoryItem}
                                    onPress={() => categoryOnpress(index)}>
                                    <Row>
                                        <SvgIcon
                                            name={categoryIndex === index ? SvgPath.isCheck : SvgPath.check}
                                            color={categoryIndex === index ? '#E50000' : '#BBBBBB'}
                                            size={20}
                                        />
                                        <Text style={[styles.categoryTitle]}>{item.title}</Text>
                                    </Row>
                                </Pressable>
                            );
                        })}
                    </View>
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
    content: {
        marginHorizontal: pixel(14),
    },
    header: {
        borderColor: '#E50000',
        borderWidth: 1,
        borderRadius: pixel(30),
        flexDirection: 'row',
        alignItems: 'center',
        padding: pixel(10),
        marginBottom: pixel(14),
    },
    headerText: {
        color: '#E50000',
        fontSize: font(12),
        marginLeft: pixel(10),
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    list: {
        borderBottomWidth: 1,
        borderBottomColor: '#EEEEEE',
        paddingHorizontal: pixel(14),
        height: pixel(60),
        backgroundColor: '#fff',
        marginHorizontal: pixel(-14),
    },
    leftTitle: {
        color: '#000',
        marginRight: pixel(10),
        width: Device.width - (Device.width - pixel(80)),
    },
    rightTitle: {
        color: '#BBBBBB',
    },
    inputBody: {
        backgroundColor: '#fff',
        height: pixel(100),
        padding: pixel(14),
    },
    inputBody1: {
        backgroundColor: '#fff',
        height: pixel(140),
        padding: pixel(14),
    },
    rightTitle1: {
        color: '#BBBBBB',
        position: 'absolute',
        bottom: pixel(14),
        right: pixel(20),
    },
    listBorder: {
        backgroundColor: '#fff',
        marginHorizontal: pixel(-14),
        padding: pixel(14),
        marginTop: pixel(14),
    },
    mediaWrap: {
        marginTop: pixel(14),
        alignItems: 'center',
    },
    mediaItem: {
        width: pixel(120),
        height: pixel(120),
        marginTop: pixel(20),
    },
    uploadText: {
        color: '#BBBBBB',
        marginTop: pixel(10),
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
    linearGradientStyle: {
        marginTop: pixel(24),
        borderRadius: 8,
        marginHorizontal: pixel(14),
    },
    bottomModal: {
        padding: pixel(14),
    },
    modalTitle: {
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#000',
        fontSize: font(14),
    },
    mapCatgeroy: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
        marginVertical: pixel(14),
    },
    categoryItem: {
        marginVertical: pixel(14),
        alignItems: 'center',
        width: (Device.width - pixel(28)) / 3,
    },
    categoryTitle: {
        marginLeft: pixel(8),
    },
});

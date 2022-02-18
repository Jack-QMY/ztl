import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { Image, ImageBackground, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { MediaUploader, NavBarHeader, Row, SvgIcon, SvgPath } from '~/components';

export default function MerchantCard() {
    const navigation = useNavigation();
    const router = useRoute();
    const formData = router.params?.formData;
    const merchantAvatar = router.params?.merchantAvatar;
    const selectAddress = router.params?.selectAddress;
    const category = router.params?.category;
    const merchantCover = router.params?.merchantCover;
    const [formDataCard, setFormDataCard] = useState({
        name: '',
        card: '',
    });
    const [select, setSelect] = useState(false);
    const [images, setImages] = useState([]);
    const uploadResponse = useCallback((response) => {
        setImages(response);
    }, []);
    const onPress = useCallback(() => {
        if (!select) {
            Toast.show({ content: '请同意召淘令商家入驻协议' });
        } else if (!formDataCard.card || !formDataCard.name) {
            Toast.show({ content: `${!formDataCard.card ? '请输入身份证号' : '请输入您的姓名'}` });
        } else {
            navigation.navigate('MerchantBankCard', {
                formData,
                merchantAvatar,
                selectAddress,
                category,
                merchantCover,
                formDataCard,
            });
        }
    }, [select, formData, merchantAvatar, selectAddress, category, merchantCover, formDataCard, navigation]);

    return (
        <View style={styles.container}>
            <NavBarHeader title="商家入驻" />
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.contentStyle}>
                <View style={[styles.row, styles.list]}>
                    <Text style={styles.leftTitle}>法人姓名</Text>
                    <TextInput
                        placeholder="请输入真实姓名(必填)"
                        maxLength={11}
                        value={formDataCard.name}
                        onChangeText={(value) =>
                            setFormDataCard({
                                ...formDataCard,
                                name: value,
                            })
                        }
                    />
                </View>
                <View style={[styles.row, styles.list]}>
                    <Text style={styles.leftTitle}>身份证号</Text>
                    <TextInput
                        placeholder="请输入身份证号(必填)"
                        value={formDataCard.card}
                        onChangeText={(value) =>
                            setFormDataCard({
                                ...formDataCard,
                                card: value,
                            })
                        }
                    />
                </View>
                <View style={styles.listContainer}>
                    <Text>法人代表照</Text>
                    <View style={[styles.row, styles.listContent]}>
                        <View style={styles.pressableImage}>
                            <MediaUploader
                                type="image"
                                maximum={1}
                                onResponse={uploadResponse}
                                maxWidth={Device.width / 6}
                                style={styles.backgroundImage}
                                children={
                                    <ImageBackground
                                        source={require('~/assets/me/93.png')}
                                        style={styles.backgroundImage}
                                        resizeMode="contain">
                                        <Image source={require('~/assets/me/92.png')} style={styles.camerImage} />
                                    </ImageBackground>
                                }
                            />
                            <Text style={styles.noticeTitle}>请上传身份证正面</Text>
                        </View>
                        <View style={styles.pressableImage}>
                            <MediaUploader
                                type="image"
                                maximum={1}
                                onResponse={uploadResponse}
                                maxWidth={Device.width / 6}
                                style={styles.backgroundImage}
                                children={
                                    <ImageBackground
                                        source={require('~/assets/me/94.png')}
                                        style={styles.backgroundImage}
                                        resizeMode="contain">
                                        <Image source={require('~/assets/me/92.png')} style={styles.camerImage} />
                                    </ImageBackground>
                                }
                            />
                            <Text style={styles.noticeTitle}>请上传身份证反面</Text>
                        </View>
                    </View>
                    <View style={styles.pressableImage}>
                        <MediaUploader
                            type="image"
                            maximum={1}
                            onResponse={uploadResponse}
                            maxWidth={Device.width / 6}
                            style={styles.backgroundImage}
                            children={
                                <ImageBackground
                                    source={require('~/assets/me/95.png')}
                                    style={styles.backgroundImage}
                                    resizeMode="contain">
                                    <Image source={require('~/assets/me/92.png')} style={styles.camerImage} />
                                </ImageBackground>
                            }
                        />
                        <Text style={styles.noticeTitle}>请上传手持身份证照片</Text>
                    </View>
                </View>
                <View style={styles.listContainer}>
                    <Text>企业证照</Text>
                    <View style={[styles.row, styles.listContent]}>
                        <View style={styles.pressableImage}>
                            <MediaUploader
                                type="image"
                                maximum={1}
                                onResponse={uploadResponse}
                                maxWidth={Device.width / 6}
                                style={styles.backgroundImage}
                                children={
                                    <ImageBackground
                                        source={require('~/assets/me/96.png')}
                                        style={styles.backgroundImage}
                                        resizeMode="contain">
                                        <Image source={require('~/assets/me/92.png')} style={styles.camerImage} />
                                    </ImageBackground>
                                }
                            />
                            <Text style={styles.noticeTitle}>请上传营业执照照片</Text>
                        </View>
                        <View style={styles.pressableImage}>
                            <MediaUploader
                                type="image"
                                maximum={1}
                                onResponse={uploadResponse}
                                maxWidth={Device.width / 6}
                                style={styles.backgroundImage}
                                children={
                                    <ImageBackground
                                        source={require('~/assets/me/97.png')}
                                        style={styles.backgroundImage}
                                        resizeMode="contain">
                                        <Image source={require('~/assets/me/92.png')} style={styles.camerImage} />
                                    </ImageBackground>
                                }
                            />
                            <Text style={styles.noticeTitle}>请上传商户门头照片</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.bottom}>
                    <Pressable onPress={() => setSelect(!select)}>
                        <Row>
                            <SvgIcon
                                name={select ? SvgPath.isCheck : SvgPath.check}
                                color={select ? '#FE4949' : '#bbbbbb'}
                                size={20}
                            />
                            <Text style={{ marginLeft: pixel(6) }}>
                                我同意<Text style={styles.privaceText}>《召淘令商家入驻协议》</Text>
                            </Text>
                        </Row>
                    </Pressable>
                    <Pressable style={styles.button1} onPress={() => navigation.goBack()}>
                        <Text style={styles.buttonText1}>上一步</Text>
                    </Pressable>
                    <LinearGradient
                        style={styles.linearGradientStyle}
                        start={{ x: 1, y: 0 }}
                        end={{ x: 0, y: 1 }}
                        colors={['#FE4949', '#FD7420']}>
                        <Pressable style={styles.button} onPress={onPress}>
                            <Text style={styles.buttonText}>下一步</Text>
                        </Pressable>
                    </LinearGradient>
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
    },
    list: {
        borderBottomWidth: 1,
        paddingHorizontal: pixel(14),
        borderBottomColor: '#EEEEEE',
        height: pixel(60),
        backgroundColor: '#fff',
    },
    leftTitle: {
        color: '#000',
        marginRight: pixel(10),
        width: Device.width - (Device.width - pixel(60)),
    },

    listContainer: {
        backgroundColor: '#fff',
        padding: pixel(14),
        marginTop: pixel(14),
    },
    backgroundImage: {
        width: (Device.width - pixel(40)) / 2,
        height: pixel(120),
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: pixel(6),
    },
    listContent: {
        justifyContent: 'space-between',
        marginTop: pixel(14),
    },
    camerImage: {
        width: pixel(40),
        height: pixel(40),
    },
    pressableImage: {
        marginTop: pixel(14),
    },
    noticeTitle: {
        width: (Device.width - pixel(40)) / 2,
        textAlign: 'center',
    },
    bottom: {
        alignItems: 'center',
        marginTop: pixel(30),
        marginBottom: pixel(30),
    },
    privaceText: {
        color: 'red',
        textDecorationLine: 'underline',
    },
    contentStyle: {
        flexGrow: 1,
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
    button1: {
        width: Device.width - pixel(40),
        marginTop: pixel(30),
        height: pixel(48),
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#FE4949',
        alignItems: 'center',
        justifyContent: 'center',
    },
    linearGradientStyle: {
        marginTop: pixel(30),
        borderRadius: 8,
        width: Device.width - pixel(40),
    },
    buttonText1: {
        color: '#FE4949',
        fontSize: font(14),
        fontWeight: 'bold',
    },
});

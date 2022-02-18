import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { NavBarHeader } from '~/components';

export default function MerchantBankCard() {
    const navigation = useNavigation();
    const router = useRoute();
    const formDataNormail = router.params?.formData;
    const merchantAvatar = router.params?.merchantAvatar;
    const selectAddress = router.params?.selectAddress;
    const category = router.params?.category;
    const merchantCover = router.params?.merchantCover;
    const formDataCard = router.params?.formDataCard;

    const [formData, setFormData] = useState({
        bankCard: '',
        bankName: '',
        bankCity: '',
        backAccount: '',
    });
    const onPress = useCallback(() => {
        if (!formData.bankCard || !formData.bankName || !formData.bankCity || !formData.backAccount) {
            Toast.show({
                content: `${!formData.bankCard
                        ? '请输入银行卡号'
                        : !formData.bankName
                            ? '请输入银行名称'
                            : formData.bankCity
                                ? '请输入开户身份，城市及开户支行'
                                : '请输入开户名称'
                    }`,
            });
        } else {
            navigation.navigate('CreactMerchantResult');
        }
    }, [formData, navigation]);
    return (
        <View style={styles.container}>
            <NavBarHeader title="商家入驻" />
            <View style={[styles.row, styles.list]}>
                <Text style={styles.leftTitle}>银行卡号</Text>
                <TextInput
                    placeholder="请输入银行卡号(必填)"
                    value={formData.bankCard}
                    onChangeText={(value) =>
                        setFormData({
                            ...formData,
                            bankCard: value,
                        })
                    }
                />
            </View>
            <View style={[styles.row, styles.list]}>
                <Text style={styles.leftTitle}>银行名称</Text>
                <TextInput
                    placeholder="请输入银行名称"
                    value={formData.bankName}
                    onChangeText={(value) =>
                        setFormData({
                            ...formData,
                            bankName: value,
                        })
                    }
                />
            </View>
            <View style={[styles.row, styles.list]}>
                <Text style={styles.leftTitle}>开户行</Text>
                <TextInput
                    placeholder="请输入开户身份，城市及开户支行"
                    value={formData.bankCity}
                    onChangeText={(value) =>
                        setFormData({
                            ...formData,
                            bankCity: value,
                        })
                    }
                />
            </View>
            <View style={[styles.row, styles.list]}>
                <Text style={styles.leftTitle}>开户名称</Text>
                <TextInput
                    placeholder="请输入开户名称"
                    value={formData.backAccount}
                    onChangeText={(value) =>
                        setFormData({
                            ...formData,
                            backAccount: value,
                        })
                    }
                />
            </View>
            <View style={styles.bottom}>
                <Pressable style={styles.button1} onPress={() => navigation.goBack()}>
                    <Text style={styles.buttonText1}>上一步</Text>
                </Pressable>
                <LinearGradient
                    style={styles.linearGradientStyle}
                    start={{ x: 1, y: 0 }}
                    end={{ x: 0, y: 1 }}
                    colors={['#FE4949', '#FD7420']}>
                    <Pressable style={styles.button} onPress={onPress}>
                        <Text style={styles.buttonText}>提交</Text>
                    </Pressable>
                </LinearGradient>
            </View>
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
    bottom: {
        alignItems: 'center',
        marginTop: pixel(30),
        marginBottom: pixel(30),
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
    button: {
        height: pixel(48),
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText1: {
        color: '#FE4949',
        fontSize: font(14),
        fontWeight: 'bold',
    },
});

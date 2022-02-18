import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Pressable, StyleSheet, Switch, Text, TextInput, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { ListItem, NavBarHeader, Row, SvgIcon, SvgPath } from '~/components';

export default function CreatAddress() {
    const navigation = useNavigation();
    const [isEnabled, setIsEnabled] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        remark: '',
    });
    const [selectAddress, setSelectAddress] = useState('');
    return (
        <View style={styles.container}>
            <NavBarHeader title="新增地址" />
            <View style={[styles.row, styles.list]}>
                <Text style={styles.leftTitle}>联系人</Text>
                <TextInput
                    placeholder="姓名"
                    maxLength={16}
                    value={formData.name}
                    onChangeText={(value) =>
                        setFormData({
                            ...formData,
                            name: value,
                        })
                    }
                />
            </View>
            <View style={[styles.row, styles.list]}>
                <Text style={styles.leftTitle}>手机号</Text>
                <TextInput
                    placeholder="手机号码"
                    maxLength={11}
                    value={formData.phone}
                    onChangeText={(value) =>
                        setFormData({
                            ...formData,
                            phone: value,
                        })
                    }
                />
            </View>
            <ListItem
                style={styles.list}
                onPress={() => navigation.navigate('SerachAddress', { setSelectAddress: setSelectAddress })}
                leftComponent={
                    <Row>
                        <Text style={styles.leftTitle}>所在地区</Text>
                        <Text style={styles.selectAddress} numberOfLines={2}>
                            {selectAddress}
                        </Text>
                    </Row>
                }
                rightComponent={<SvgIcon name={SvgPath.rightArrow} size={28} color="#bbbbbb" />}
            />
            <View style={[styles.row, styles.list, styles.list1]}>
                <Text style={styles.leftTitle}>详细地址</Text>
                <TextInput
                    placeholder="请输入详细地址"
                    style={styles.textInput}
                    multiline={true}
                    maxLength={100}
                    value={formData.remark}
                    onChangeText={(value) =>
                        setFormData({
                            ...formData,
                            remark: value,
                        })
                    }
                />
            </View>
            <Row style={[styles.row, styles.switchList]}>
                <Text>设为默认</Text>
                <Switch onValueChange={() => setIsEnabled((previousState) => !previousState)} value={isEnabled} />
            </Row>
            <LinearGradient
                style={styles.linearGradientStyle}
                start={{ x: 1, y: 0 }}
                end={{ x: 0, y: 1 }}
                colors={['#FE4949', '#FD7420']}>
                <Pressable style={styles.button}>
                    <Text style={styles.buttonText}>完成</Text>
                </Pressable>
            </LinearGradient>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Theme.groundColour,
    },
    linearGradientStyle: {
        marginTop: pixel(24),
        borderRadius: 8,
        marginHorizontal: pixel(14),
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    leftTitle: {
        color: '#000',
        marginRight: pixel(10),
        width: Device.width - (Device.width - pixel(60)),
    },
    selectAddress: {
        width: Device.width - pixel(Device.width - (Device.width - pixel(100))),
        fontSize: font(12),
    },
    list: {
        borderBottomWidth: 1,
        paddingHorizontal: pixel(14),
        borderBottomColor: '#EEEEEE',
        height: pixel(50),
        backgroundColor: '#fff',
    },
    list1: {
        height: pixel(100),
    },
    textInput: {
        width: '80%',
    },
    switchList: {
        marginTop: pixel(14),
        backgroundColor: '#fff',
        padding: pixel(14),
        justifyContent: 'space-between',
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

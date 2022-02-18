import { ServerRoot } from '!/app.json';
import React, { useCallback, useMemo, useState } from 'react';
import { ActivityIndicator, Image, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { fetchRequest, useUploadImage } from '~/common';
import { ActionSheet, ListItem, NavBarHeader, Row, SvgIcon, SvgPath, WheelPicker } from '~/components';
import { userStore } from '~/store';
export default function EditUserInfo() {
    const userInfo = useMemo(() => userStore.me.userinfo, [userStore.me]);
    const [formData, setFormData] = useState({
        username: userInfo?.username,
        gender: userInfo?.gender,
        nickName: userInfo?.nickname,
        bio: userInfo?.bio,
    });

    //  更改用户图像
    const [avatar, setAvatar] = useState(userInfo?.avatar);
    const [uploading, setUploading] = useState(false);
    const uploadAvatar = useCallback(() => {
        useUploadImage().then((res) => {
            setAvatar(res?.data?.fullurl);
            fetchRequest({
                url: 'wanlshop/user/profile',
                method: 'POST',
                body: {
                    avatar: res?.data?.fullurl,
                },
            })
                .then((result) => {
                    setUploading(true);
                    userStore.changeAvatar(result.data.avatar);
                    Toast.show({ content: '上传成功，审核通过后其他人才能看见' });
                })
                .catch((error) => {
                    setAvatar(ServerRoot + userInfo?.userinfo.avatar);
                    Toast.show({ content: '上传图片失败,请重新在试' });
                });
        });
    }, [userInfo]);

    // 设置性别
    const [genderVisiable, setGenderVisiable] = useState(false);
    const gender = useMemo(() => {
        if (formData.gender === 0 || formData.gender === '男') {
            return '男';
        } else if (formData.gender === 1 || formData.gender === '女') {
            return '女';
        } else {
            return '未设置';
        }
    }, [formData.gender]);

    //选择出生年月日
    const [dateVisiable, setDateVisiable] = useState(false);
    const [date, selectDate] = useState();

    const disabled =
        userInfo?.username !== formData.username ||
        userInfo?.gender !== formData.gender ||
        userInfo?.bio !== formData.bio ||
        userInfo?.nickname !== formData.nickName;
    const editPress = useCallback(() => {
        /* 使用userStore里面的changeName() ; changeNickName() ;changeBio()来控制全局store添加， */
        Toast.show({ content: '修改成功' });
    }, []);
    return (
        <View style={styles.container}>
            <NavBarHeader
                title="编辑资料"
                rightComponent={
                    <Pressable
                        style={[styles.rightButton, { backgroundColor: !disabled ? '#bbbbbb' : Theme.primaryColor }]}
                        disabled={!disabled}
                        onPress={editPress}>
                        <Text style={styles.rightButtonText}>修改</Text>
                    </Pressable>
                }
            />
            <View style={styles.avatarItem}>
                <Pressable style={styles.uploadAvatar} onPress={uploadAvatar}>
                    <Image
                        source={{
                            uri: avatar,
                        }}
                        style={styles.avatarImage}
                    />
                    <Text style={styles.changeText}>点击更换图像</Text>
                    {uploading && (
                        <View style={[styles.avatarImage, styles.uploadingView]}>
                            <ActivityIndicator size="small" color="#fff" />
                        </View>
                    )}
                </Pressable>
            </View>
            <ListItem
                onPress={() => setGenderVisiable(true)}
                style={styles.list}
                leftComponent={
                    <Row>
                        <Text style={styles.leftTitle}>用户昵称</Text>
                        <TextInput
                            placeholder="请输入昵称"
                            style={styles.inputBody}
                            value={formData.nickName}
                            onChangeText={(text) => {
                                setFormData({
                                    ...formData,
                                    nickName: text,
                                });
                            }}
                        />
                    </Row>
                }
            />
            <ListItem
                onPress={() => setGenderVisiable(true)}
                style={styles.list}
                leftComponent={
                    <Row>
                        <Text style={styles.leftTitle}>用户名称</Text>
                        <TextInput
                            placeholder="请输入用户名"
                            style={styles.inputBody}
                            value={formData.username}
                            onChangeText={(text) => {
                                setFormData({
                                    ...formData,
                                    username: text,
                                });
                            }}
                        />
                    </Row>
                }
            />
            <ListItem
                onPress={() => setGenderVisiable(true)}
                style={styles.list}
                leftComponent={
                    <Row>
                        <Text style={styles.leftTitle}>个性签名</Text>
                        <TextInput
                            placeholder="请输入个性签名"
                            style={styles.inputBody}
                            value={formData.bio}
                            onChangeText={(text) => {
                                setFormData({
                                    ...formData,
                                    bio: text,
                                });
                            }}
                        />
                    </Row>
                }
            />
            <ListItem
                onPress={() => setGenderVisiable(true)}
                style={styles.list}
                leftComponent={<Text style={styles.leftTitle}>性别</Text>}
                rightComponent={
                    <Row>
                        <Text style={styles.leftTitle}>{gender}</Text>
                        <SvgIcon name={SvgPath.rightArrow} size={28} color="#bbbbbb" />
                    </Row>
                }
            />
            <ListItem
                onPress={() => setDateVisiable(true)}
                style={styles.list}
                leftComponent={<Text style={styles.leftTitle}>日期选择</Text>}
                rightComponent={
                    <Row>
                        <Text style={styles.leftTitle}>{date}</Text>
                        <SvgIcon name={SvgPath.rightArrow} size={28} color="#bbbbbb" />
                    </Row>
                }
            />
            <ActionSheet
                visible={genderVisiable}
                onToggleVisible={() => setGenderVisiable(false)}
                options={[
                    {
                        title: '男',
                        onPress: () =>
                            setFormData((prevFormData) => {
                                return { ...prevFormData, gender: '男' };
                            }),
                    },
                    {
                        title: '女',
                        onPress: () =>
                            setFormData((prevFormData) => {
                                return { ...prevFormData, gender: '女' };
                            }),
                    },
                ]}
            />
            <WheelPicker visible={dateVisiable} toggleVisible={() => setDateVisiable(false)} selectDate={selectDate} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    list: {
        marginHorizontal: pixel(Theme.edgeDistance),
        borderBottomWidth: 0.6,
        alignItems: 'center',
        borderColor: '#eeeeee',
        height: pixel(60),
    },
    avatarItem: {
        paddingVertical: pixel(40),
        alignItems: 'center',
    },
    uploadAvatar: {
        position: 'relative',
    },
    changeText: {
        marginTop: pixel(8),
        textAlign: 'center',
        fontSize: font(10),
        color: '#bbbbbb',
    },
    avatarImage: {
        width: Device.width * 0.2,
        height: Device.width * 0.2,
        borderRadius: Device.width * 0.1,
        backgroundColor: '#ddd',
    },
    uploadingView: {
        position: 'absolute',
        top: 0,
        left: 0,
        backgroundColor: '#00000033',
        justifyContent: 'center',
        alignItems: 'center',
    },
    leftTitle: {
        color: '#000',
    },
    inputBody: {
        marginLeft: pixel(20),
    },
    rightButton: {
        width: pixel(50),
        height: pixel(30),
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Theme.primaryColor,
        borderRadius: pixel(6),
        marginRight: pixel(14),
    },
    rightButtonText: {
        color: '#fff',
        fontSize: font(12),
    },
});

import { Version } from '!/app.json';
import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { Linking, ScrollView, StyleSheet, Text, View } from 'react-native';
import { fetchRequest, useRecallUserProfile } from '~/common';
import { Avatar, DialogModal, ItemSeparator, ListItem, NavBarHeader, Row, SvgIcon, SvgPath } from '~/components';
import { observer, userStore } from '~/store';

export default observer(() => {
    useRecallUserProfile();
    const navigation = useNavigation();
    const userInfo = userStore.me.userinfo;
    const [storageSize, setStorageSize] = useState((Math.random(1, 30) * 10).toFixed(1) + 'MB');

    /* 退出登录 */
    const [visiable, setVisiable] = useState(false); //控制退出登录弹窗
    const singOut = useCallback(() => {
        fetchRequest({
            url: 'wanlshop/user/logout',
            method: 'POST',
        }).then((res) => {
            userStore.signOut();
            setVisiable(false);
            navigation.navigate('Main', null, navigation.navigate('MallScreeen'));
            Toast.show({ content: '退出登录成功' });
        });
    }, []);

    /* 下载最新包 */
    const [dowladVisiable, setDowladVisiable] = useState(false);
    const onConfirmDowload = useCallback(() => {
        setDowladVisiable(false);
        Linking.openURL('http://api.szjuyeke.com/h5/down/index.html#/pages/index/download');
    }, []);
    return (
        <View style={styles.container}>
            <NavBarHeader title="设置" />
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ flexGrow: 1, paddingBottom: 100 }}>
                <ListItem
                    onPress={() => navigation.navigate('EditUserInfo')}
                    style={styles.list}
                    leftComponent={
                        <Row>
                            <Avatar source={userInfo?.avatar} size={60} />
                            <View style={{ marginLeft: pixel(20) }}>
                                <Text style={styles.nickname}>{userInfo?.nickname}</Text>
                                <Text style={[styles.nickname, { marginTop: pixel(4) }]}>
                                    {userInfo?.username || '用户名：请设置昵称'}
                                </Text>
                            </View>
                        </Row>
                    }
                    rightComponent={
                        <Row>
                            <Text style={styles.rightTitle}>编辑</Text>
                            <SvgIcon name={SvgPath.rightArrow} size={28} color="#bbbbbb" />
                        </Row>
                    }
                />
                <ItemSeparator height={16} />
                <ListItem
                    onPress={() => navigation.navigate('Authentication')}
                    style={styles.list}
                    leftComponent={<Text style={styles.nickname}>实名认证</Text>}
                    rightComponent={<SvgIcon name={SvgPath.rightArrow} size={28} color="#bbbbbb" />}
                />
                <ItemSeparator height={16} />
                <ListItem
                    onPress={() => navigation.navigate('AccountScreen')}
                    style={styles.list}
                    leftComponent={<Text style={styles.nickname}>账户与安全</Text>}
                    rightComponent={<SvgIcon name={SvgPath.rightArrow} size={28} color="#bbbbbb" />}
                />
                <ListItem
                    onPress={() => navigation.navigate('MyAddressSecreen')}
                    style={styles.list}
                    leftComponent={<Text style={styles.nickname}>我的收获地址</Text>}
                    rightComponent={<SvgIcon name={SvgPath.rightArrow} size={28} color="#bbbbbb" />}
                />
                <ItemSeparator height={16} />
                <ListItem
                    onPress={() => navigation.navigate('NoticeSetting')}
                    style={styles.list}
                    leftComponent={<Text style={styles.nickname}>新消息通知</Text>}
                    rightComponent={<SvgIcon name={SvgPath.rightArrow} size={28} color="#bbbbbb" />}
                />
                <ItemSeparator height={16} />
                <ListItem
                    onPress={() =>
                        setTimeout(() => {
                            setStorageSize('0M');
                            Toast.show({ content: '已清除缓存' });
                        }, 300)
                    }
                    style={styles.list}
                    leftComponent={<Text style={styles.nickname}>清除缓存</Text>}
                    rightComponent={
                        <Row>
                            <View style={styles.storageSize}>
                                <Text>{storageSize}</Text>
                            </View>
                            <SvgIcon name={SvgPath.rightArrow} size={28} color="#bbbbbb" />
                        </Row>
                    }
                />
                <ListItem
                    onPress={() => navigation.navigate('AboutUsScreen')}
                    style={styles.list}
                    leftComponent={<Text style={styles.nickname}>关于</Text>}
                    rightComponent={
                        <Row>
                            <Text>{Version}</Text>
                            <SvgIcon name={SvgPath.rightArrow} size={28} color="#bbbbbb" />
                        </Row>
                    }
                />
                <ItemSeparator height={16} />
                <ListItem
                    onPress={() => setDowladVisiable(true)}
                    style={styles.list}
                    leftComponent={<Text style={styles.nickname}>下载最新包</Text>}
                    rightComponent={<SvgIcon name={SvgPath.rightArrow} size={28} color="#bbbbbb" />}
                />
                <ItemSeparator height={16} />
                <ListItem
                    onPress={() => setVisiable(true)}
                    style={styles.list}
                    leftComponent={<Text style={styles.nickname}>退出登录</Text>}
                    rightComponent={<SvgIcon name={SvgPath.rightArrow} size={28} color="#bbbbbb" />}
                />
            </ScrollView>
            <DialogModal
                visible={visiable}
                toggleVisible={() => setVisiable(false)}
                title="提示"
                onCancel={() => setVisiable(false)}
                onConfirm={singOut}
                content={'您确定要退出登录嘛?'}
            />
            <DialogModal
                visible={dowladVisiable}
                toggleVisible={() => setDowladVisiable(false)}
                title="提示"
                onCancel={() => setDowladVisiable(false)}
                onConfirm={onConfirmDowload}
                content={'是否下载新包?'}
            />
        </View>
    );
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Theme.groundColour,
    },
    list: {
        paddingHorizontal: pixel(Theme.edgeDistance),
        height: pixel(70),
        borderBottomWidth: 0.6,
        alignItems: 'center',
        borderColor: '#eeeeee',
        backgroundColor: '#fff',
    },
    rightTitle: {
        fontSize: font(12),
        color: 'rgba(0,0,0,1)',
    },
    nickname: {
        fontSize: font(12),
        color: '#000',
    },
    storageSize: {
        backgroundColor: '#F1F1F1',
        width: pixel(70),
        height: pixel(30),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: pixel(15),
    },
});

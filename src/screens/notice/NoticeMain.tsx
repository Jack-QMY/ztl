import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { ContStatus, NavBarHeader, Row, SvgIcon, SvgPath } from '~/components';

export default function NoticeMain() {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <NavBarHeader
                title="消息中心"
                rightComponent={
                    <Row style={{ marginRight: pixel(14) }}>
                        <Pressable style={{ marginRight: pixel(10) }}>
                            <SvgIcon name={SvgPath.clean} color="#8a8a8a" size={24} />
                        </Pressable>
                        <Pressable onPress={() => navigation.navigate('NoticeSetting')}>
                            <SvgIcon name={SvgPath.setting} color="#8a8a8a" size={24} />
                        </Pressable>
                    </Row>
                }
            />
            <View style={styles.content}>
                <View style={styles.contentHeader}>
                    <Pressable
                        style={styles.listItem}
                        onPress={() => navigation.navigate('NoticeScreen', { title: '交易物流' })}>
                        <View style={styles.svgBorder}>
                            <SvgIcon name={SvgPath.wuliu} color="#FFF" size={26} />
                        </View>
                        <Text style={styles.title}>交易物流</Text>
                    </Pressable>
                    <Pressable
                        style={styles.listItem}
                        onPress={() => navigation.navigate('NoticeScreen', { title: '通知消息' })}>
                        <View style={[styles.svgBorder, { backgroundColor: '#F9C120' }]}>
                            <SvgIcon name={SvgPath.song} color="#FFF" size={26} />
                        </View>
                        <Text style={styles.title}>通知消息</Text>
                    </Pressable>
                    <Pressable
                        style={styles.listItem}
                        onPress={() => navigation.navigate('NoticeScreen', { title: '系统消息' })}>
                        <View style={[styles.svgBorder, { backgroundColor: '#70CA35' }]}>
                            <SvgIcon name={SvgPath.message1} color="#FFF" size={26} />
                        </View>
                        <Text style={styles.title}>系统消息</Text>
                    </Pressable>
                </View>
                <ContStatus title={'还没有任何消息'} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        margin: pixel(Theme.edgeDistance),
    },
    contentHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor: '#FFF',
        padding: pixel(Theme.edgeDistance),
        borderRadius: pixel(10),
        ...Platform.select({
            ios: {
                shadowColor: '#000000',
                shadowOpacity: 0.24,
                shadowRadius: pixel(5),
                shadowOffset: {
                    width: 0,
                    height: pixel(3),
                },
            },
            android: {
                elevation: 10,
            },
        }),
    },
    listItem: {
        alignItems: 'center',
    },
    svgBorder: {
        width: pixel(50),
        height: pixel(50),
        borderRadius: pixel(25),
        backgroundColor: '#38A5F2',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: font(12),
        marginTop: pixel(4),
        color: '#000',
    },
});

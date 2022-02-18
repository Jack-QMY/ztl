import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
// 暂定缺省页面
interface Props {
    title?: String;
}

export default function ContStatus(props: Props) {
    const { title } = props;

    return (
        <View style={[styles.container]}>
            <Image source={require('~/assets/images/default/notice_empity.png')} style={styles.empityCover} />
            <Text style={styles.title}>{title || '暂时还没有发现啥~'} </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    empityCover: {
        width: pixel(200),
        height: pixel(200),
    },
    title: {
        fontSize: font(14),
    },
});

import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

interface Props {
    notice: any;
}

export default function NoticeItem(props: Props) {
    const { notice } = props;
    const navigation = useNavigation();
    return (
        <Pressable style={styles.container} onPress={() => navigation.navigate('NoticeDetail', { notice: notice })}>
            <Text style={styles.time}>{notice.time}</Text>
            <Image source={{ uri: notice.url }} style={styles.cover} />
            <View style={styles.noticeBottom}>
                <Text style={styles.title}>{notice.title}</Text>
                <Text style={styles.mask}>{notice.mask}</Text>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    cover: {
        height: pixel(170),
    },
    time: {
        marginVertical: pixel(10),
        textAlign: 'center',
        fontSize: font(10),
        color: '#bbbbbb',
    },
    noticeBottom: {
        backgroundColor: '#fff',
        paddingHorizontal: pixel(10),
        paddingVertical: pixel(14),
    },
    title: {
        fontSize: font(14),
        fontWeight: 'bold',
        color: '#000',
    },
    mask: {
        fontSize: font(10),
        marginTop: pixel(10),
    },
});

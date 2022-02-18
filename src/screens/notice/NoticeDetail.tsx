import { useRoute } from '@react-navigation/native';
import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { NavBarHeader } from '~/components';

export default function NoticeDetail() {
    const router = useRoute();
    const notice = router.params.notice;
    return (
        <View style={styles.container}>
            <NavBarHeader title={notice.title} />
            <View style={styles.content}>
                <Image source={{ uri: notice.url }} style={styles.cover} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    content: {
        marginHorizontal: pixel(Theme.edgeDistance),
    },
    cover: {
        height: pixel(170),
    },
});

import { useRoute } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { NavBarHeader } from '~/components';
import DividendItem from './components/DividendItem';
const data = [
    {
        id: 1,
        title: 'TK释放分红池增加',
        creat_time: '2022-02-16 00:11:37',
        num: 1115.05,
    },
    {
        id: 2,
        title: 'TK释放分红池增加',
        creat_time: '2022-02-16 00:11:37',
        num: 1115.05,
    },
];
export default function ScoreDetailes() {
    const router = useRoute();
    const type = router.params.type;
    const renderItem = useCallback(({ item, index }) => {
        return <DividendItem dividend={item} type={'reduce'} />;
    }, []);
    return (
        <View style={styles.container}>
            <NavBarHeader title={type === 'SCORE' ? '积分明细' : 'GPK明细'} />
            <FlatList
                onEndReachedThreshold={0.1}
                removeClippedSubviews={true}
                data={data}
                contentContainerStyle={styles.contentContainerStyle}
                showsVerticalScrollIndicator={false}
                renderItem={renderItem}
                keyExtractor={(item, index) => String(item.id || index)}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Theme.groundColour,
    },
    contentContainerStyle: {
        flexGrow: 1,
        margin: pixel(14),
    },
    separator: {
        height: pixel(10),
        backgroundColor: '#f4f4f4',
    },
});

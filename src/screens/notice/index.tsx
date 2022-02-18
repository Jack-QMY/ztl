import { useRoute } from '@react-navigation/native';
import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { NavBarHeader } from '~/components';
import NoticeItem from './components/NoticeItem';

const data = [
    {
        id: 1,
        url: 'https://img95.699pic.com/photo/50105/7812.jpg_wh300.jpg',
        title: '召淘推荐隆重上线！！！',
        mask: '最低价等你抢购',
        price: 30,
        time: '2021-12-15 19:29:01',
    },
];

export default function index() {
    const router = useRoute();
    const title = router.params.title;
    const renderItem = ({ item, index }) => {
        return <NoticeItem notice={item} key={item.id} />;
    };
    return (
        <View style={styles.container}>
            <NavBarHeader title={title} />
            <FlatList
                bounces={false}
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
    },
    contentContainerStyle: {
        flexGrow: 1,
        paddingHorizontal: pixel(Theme.edgeDistance),
    },
    separator: {
        height: pixel(10),
        backgroundColor: '#f4f4f4',
    },
});

import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { NavBarHeader } from '~/components';
import FeedBackItem from './FeedBackItem';
const data = [
    {
        id: 1,
        score: 3,
        content: 'UI无法直视，丑哭了',
        status: 0,
        creat_time: '1天前',
        images: [
            { id: 1, url: 'http://static.runoob.com/images/demo/demo2.jpg' },
            { id: 2, url: 'https://img.iplaysoft.com/wp-content/uploads/2019/free-images/free_stock_photo.jpg' },
            { id: 3, url: 'https://img95.699pic.com/photo/50136/1351.jpg_wh300.jpg' },
            { id: 4, url: 'https://img95.699pic.com/photo/40094/7630.jpg_wh300.jpg' },
            { id: 5, url: 'https://photo.16pic.com/00/53/26/16pic_5326745_b.jpg' },
            { id: 6, url: 'https://img95.699pic.com/photo/50046/5562.jpg_wh300.jpg' },
            { id: 7, url: 'https://pic1.zhimg.com/v2-3b4fc7e3a1195a081d0259246c38debc_720w.jpg?source=172ae18b' },
            { id: 8, url: 'https://pic.qqtn.com/up/2019-9/15690311636958128.jpg' },
        ],
    },
    {
        id: 2,
        score: 5,
        creat_time: '刚刚',
        content: '系统崩溃，出现bug',
        status: 1,
        images: [
            { id: 1, url: 'http://static.runoob.com/images/demo/demo2.jpg' },
            { id: 2, url: 'https://img.iplaysoft.com/wp-content/uploads/2019/free-images/free_stock_photo.jpg' },
            { id: 3, url: 'https://img95.699pic.com/photo/50136/1351.jpg_wh300.jpg' },
        ],
    },
];

export default function FeedBackScreen() {
    const renderItem = ({ item, index }) => {
        return <FeedBackItem feedback={item} key={item.id} />;
    };
    return (
        <View style={styles.container}>
            <NavBarHeader title="我的反馈" />
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
        backgroundColor: '#fff',
        flexGrow: 1,
    },
    separator: {
        height: pixel(10),
        backgroundColor: '#f4f4f4',
    },
});

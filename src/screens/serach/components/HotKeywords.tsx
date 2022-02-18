import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SvgIcon, SvgPath } from '~/components';
import { observer } from '~/store';

interface SearchProps {
    onSearch: Function;
    style?: ViewStyle;
}

const data = [
    { id: 1, title: '吃饭的家伙' },
    { id: 2, title: '玩具车' },
    { id: 3, title: 'MacbookPro 2022款' },
    { id: 4, title: 'ipadPro 2021款' },
];

export default observer(({ onSearch, style }: SearchProps) => {
    return (
        <View style={style}>
            <View style={styles.recommendHeader}>
                <Text style={styles.title}>热门热搜</Text>
                <SvgIcon name={SvgPath.hot} color="red" size={22} />
            </View>
            <View style={styles.content}>
                {data.map((item, index) => {
                    return (
                        <TouchableOpacity
                            activeOpacity={0.9}
                            key={item.id}
                            style={styles.keywordsItem}
                            onPress={() => onSearch(item?.title)}>
                            <Text style={[styles.keywordIndex, { color: COLORS[index] || '#9B9B9B' }]}>
                                {index + 1}
                            </Text>
                            <Text style={{ fontSize: font(14), color: '#202020' }} numberOfLines={1}>
                                {item?.title}
                            </Text>
                        </TouchableOpacity>
                    );
                })}
            </View>
        </View>
    );
});

const COLORS = ['#F21D58', '#FE4E15', '#FD9818'];

const styles = StyleSheet.create({
    recommendHeader: {
        paddingHorizontal: pixel(15),
        paddingVertical: pixel(5),
        height: pixel(30),
        flexDirection: 'row',
        alignItems: 'center',
    },
    title: {
        color: '#202020',
        fontSize: font(15),
        fontWeight: 'bold',
        marginRight: pixel(4),
    },
    content: {
        paddingHorizontal: pixel(15),
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    keywordsItem: {
        width: (Device.width - pixel(15) * 2) / 2 - pixel(10),
        paddingHorizontal: pixel(15),
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: pixel(8),
        height: pixel(32),
        borderRadius: pixel(5),
        marginRight: pixel(10),
    },
    keywordIndex: {
        width: pixel(24),
        fontSize: font(14),
        fontWeight: '700',
    },
});

import React from 'react';
import { StyleSheet, View } from 'react-native';
import { FlatList, MerchartItem } from '~/components';

//渲染每个列表
const data = [
    {
        id: 1,
        url: 'https://img95.699pic.com/photo/50105/7812.jpg_wh300.jpg',
        name: '召淘自营旗靓店',
        address: '长沙市芙蓉区',
        addressKM: 10.22,
        score: 5,
        mask: 'Rachael Finch不仅是澳大利亚媒体的宠儿还深受澳大利亚民众喜爱。Rachael除了名模这个身份外，还在澳大利亚7频道担任时尚、健康和美容记者，一直致力于推广积极健康的生活方式。现如今已有baby的Rachael能够很好地平衡工作和家庭时间，身为Amcal药房的品牌大使，Rachael会不时和大家分享她的育儿心得以及美容护肤经验，在选择商品的时候给大家提供她的建议。',
    },
    {
        id: 2,
        url: 'https://img95.699pic.com/photo/50105/7812.jpg_wh300.jpg',
        name: '召淘自营旗靓店',
        address: '长沙市芙蓉区',
        addressKM: 10.22,
        score: 4,
        mask: 'Rachael Finch不仅是澳大利亚媒体的宠儿还深受澳大利亚民众喜爱。Rachael除了名模这个身份外，还在澳大利亚7频道担任时尚、健康和美容记者，一直致力于推广积极健康的生活方式。现如今已有baby的Rachael能够很好地平衡工作和家庭时间，身为Amcal药房的品牌大使，',
    },
    {
        id: 3,
        url: 'https://img95.699pic.com/photo/50105/7812.jpg_wh300.jpg',
        name: '召淘自营旗靓店',
        address: '长沙市芙蓉区',
        addressKM: 10.22,
        score: 3,
        mask: '召淘自营产品',
    },
    {
        id: 4,
        score: 5,
        url: 'https://img95.699pic.com/photo/50105/7812.jpg_wh300.jpg',
        name: '召淘自营旗靓店',
        address: '长沙市芙蓉区',
        addressKM: 10.22,
        mask: '召淘自营产品',
    },
];

export default function MerTypeTable(props) {
    const renderItem = ({ item, index }) => {
        return <MerchartItem data={item} key={item.id} />;
    };
    return (
        <FlatList
            {...props}
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
    );
}

const styles = StyleSheet.create({
    contentContainerStyle: {
        flexGrow: 1,
        marginHorizontal: pixel(Theme.edgeDistance),
    },
    separator: {
        height: pixel(10),
        backgroundColor: '#f4f4f4',
    },
});

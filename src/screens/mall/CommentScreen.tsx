import { useRoute } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { ItemSeparator, NavBarHeader, Row } from '~/components';
import CommentItem from './components/CommentItem';

const commentData = [
    {
        id: 1,
        time: '24天前',
        commentImages: [
            {
                id: 1,
                width: 200,
                height: 200,
                url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRc3q4wXDJW5fO9nyCU5pR0rJxXb9ubYam32w&usqp=CAU',
            },
            {
                id: 2,
                width: 300,
                height: 300,
                url: 'https://img95.699pic.com/photo/50050/0516.jpg_wh300.jpg',
            },
            {
                id: 3,
                width: 200,
                height: 300,
                url: 'http://image.woshipm.com/wp-files/2019/05/aI9ZlRJ2yNS6J5ecqUq6.png',
            },
            {
                id: 4,
                width: 200,
                height: 200,
                url: 'http://image.woshipm.com/wp-files/2019/05/aI9ZlRJ2yNS6J5ecqUq6.png',
            },
        ],
        conmment:
            '商品评分、店家服务态度、物流发货速度。 ... 商品评分：商品评分主要是根据商品的质量，商品与卖家描述的是否相符，商品的价格和质量是否成正比等来打分。 店家服务态度：店家服务态度主要包含用户在购买商品前，和购买后针对商品细节，以及售后等服务性咨询',
    },
    {
        id: 2,
        time: '4天前',
        conmment: '商品评分、店家服务态度、物流发货速度。 ... 商品评分：',
        commentImages: [
            {
                id: 1,
                width: 400,
                height: 400,
                url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRc3q4wXDJW5fO9nyCU5pR0rJxXb9ubYam32w&usqp=CAU',
            },
        ],
    },
    {
        id: 3,
        time: '4天前',
        conmment: '',
        commentImages: [],
    },
];
const commentType = [
    { id: 1, title: '全部', num: 3, type: 1 },
    { id: 2, title: '好评', num: 3, type: 2 },
    { id: 3, title: '中评', num: 0, type: 3 },
    { id: 4, title: '差评', num: 0, type: 4 },
    { id: 5, title: '有图', num: 0, type: 5 },
];

export default function CommentScreen() {
    const router = useRoute();
    const type = router?.params.type;
    const [isType, setIstype] = useState(type);

    const renderItem = useCallback(({ item, index }) => {
        return (
            <>
                <ItemSeparator />
                <CommentItem comment={item} key={item.id} />
            </>
        );
    }, []);

    //选择
    const listheaderOnpress = useCallback((typeOf: number) => {
        setIstype(typeOf);
    }, []);

    const _listHeader = useCallback(() => {
        return (
            <View style={styles.listHeaderContainer}>
                <Text style={{ marginLeft: pixel(14) }}>好评率 100%</Text>
                <Row style={styles.commentType}>
                    {commentType.map((item, index) => {
                        return (
                            <Pressable
                                key={index}
                                onPress={() => listheaderOnpress(item.type)}
                                style={[
                                    styles.commentTypeBorder,
                                    { backgroundColor: isType === item.type ? '#FF0104' : '#FFF4EF' },
                                ]}>
                                <Text
                                    style={{
                                        color: isType === item.type ? '#fff' : '#7B7571',
                                    }}>{`${item.title}(${item.num})`}</Text>
                            </Pressable>
                        );
                    })}
                </Row>
            </View>
        );
    }, [isType]);

    return (
        <View style={styles.container}>
            <NavBarHeader title="商品评论" />
            <FlatList
                onEndReachedThreshold={0.1}
                removeClippedSubviews={true}
                data={commentData}
                ListHeaderComponent={_listHeader}
                contentContainerStyle={styles.contentContainerStyle}
                showsVerticalScrollIndicator={false}
                renderItem={renderItem}
                keyExtractor={(item, index) => String(item.id || index)}
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
        backgroundColor: '#Fff',
    },
    listHeaderContainer: {
        backgroundColor: '#fff',
        marginBottom: pixel(14),
        paddingTop: pixel(14),
    },
    commentType: {
        borderTopWidth: 1,
        paddingTop: pixel(14),
        borderColor: '#EEEEEE',
        flexWrap: 'wrap',
        marginVertical: pixel(14),
        marginHorizontal: pixel(14),
        justifyContent: 'space-between',
    },
    commentTypeBorder: {
        width: pixel(80),
        height: pixel(36),
        borderRadius: pixel(18),
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: pixel(14),
    },
});

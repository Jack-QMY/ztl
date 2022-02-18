import { useRoute } from '@react-navigation/native';
import React, { useCallback, useMemo, useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { NavBarHeader, Row } from '~/components';
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

export default function Dividend() {
    const router = useRoute();
    const type = router.params.type;
    const tableWidth = useMemo(
        () => [
            { id: 1, title: `${type === 'fenhong' ? '分红池增加' : '公益池增加'}`, category: 1, type: 'add' },
            { id: 2, title: `${type === 'fenhong' ? '分红池扣除' : '公益池扣除'}`, category: 2, type: 'reduce' },
        ],
        [type],
    );
    const [indexNum, setIndexNum] = useState(0);
    const [way, setWay] = useState();
    const [typeOf, setTypeOf] = useState('add');
    const selectIndex = useCallback(
        (indexOf) => {
            setIndexNum(indexOf);
            setWay(tableWidth[indexOf].category);
            setTypeOf(tableWidth[indexOf].type);
        },
        [tableWidth],
    );

    const renderItem = useCallback(
        ({ item, index }) => {
            return <DividendItem dividend={item} type={typeOf} />;
        },
        [typeOf],
    );

    const listHeader = () => {
        return (
            <View>
                {type === 'fenhong' ? (
                    <>
                        <View style={styles.border}>
                            <Text style={styles.title}>市场总监分红池 （GPK）</Text>
                            <Text style={styles.price}>100000.01345</Text>
                        </View>
                        <View style={[styles.border, { marginTop: pixel(20) }]}>
                            <Text style={styles.title}>冻结分红池 （GPK）</Text>
                            <Text style={styles.price}>100000.01345</Text>
                        </View>
                    </>
                ) : (
                    <View style={[styles.border, { marginTop: pixel(20) }]}>
                        <Text style={styles.title}>当前公益池总量 （GPK）</Text>
                        <Text style={styles.price}>100000.01345</Text>
                    </View>
                )}
                <Row style={{ marginVertical: pixel(20) }}>
                    {tableWidth.map((item, index) => {
                        return (
                            <Pressable key={item.id} onPress={() => selectIndex(index)} style={styles.typeButton}>
                                <Text style={[indexNum === index ? styles.text2 : styles.text1]}>{item.title}</Text>
                                {indexNum === index ? <View style={styles.line} /> : null}
                            </Pressable>
                        );
                    })}
                </Row>
            </View>
        );
    };
    return (
        <View style={styles.container}>
            <NavBarHeader title={type === 'fenhong' ? '分红池详情' : '公益池详情'} />
            <FlatList
                onEndReachedThreshold={0.1}
                removeClippedSubviews={true}
                ListHeaderComponent={listHeader}
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
    contentContainerStyle: {
        flexGrow: 1,
        margin: pixel(14),
    },
    separator: {
        height: pixel(10),
        backgroundColor: '#f4f4f4',
    },
    container: {
        flex: 1,
        backgroundColor: Theme.groundColour,
    },
    content: {
        margin: pixel(14),
    },
    border: {
        backgroundColor: '#FF373A',
        padding: pixel(14),
        borderRadius: pixel(6),
        height: pixel(100),
    },
    title: {
        color: '#FFA3A4',
    },
    price: {
        fontSize: font(20),
        fontWeight: 'bold',
        color: '#fff',
        marginTop: pixel(14),
    },
    typeButton: {
        marginRight: pixel(20),
        alignItems: 'center',
    },
    text1: {
        fontSize: font(12),
        color: '#555555',
    },
    text2: {
        fontSize: font(14),
        color: '#000',
        fontWeight: 'bold',
    },
    line: {
        width: pixel(26),
        height: pixel(4),
        borderRadius: pixel(2),
        backgroundColor: 'red',
        marginTop: pixel(14),
    },
});

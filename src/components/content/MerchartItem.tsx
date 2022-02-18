import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { RattingView, Row } from '~/components';

interface Props {
    data: any;
}

export default function MerchartItem(props: Props) {
    const { data } = props;
    // 配置星星评分
    const config = {
        selected: false,
        totalScore: data.score,
        widthSize: 20,
        heightSize: 20,
    };
    return (
        <Pressable style={styles.container}>
            <Row style={styles.merchartItem}>
                <Image source={{ uri: data.url }} style={styles.cover} />
                <View style={styles.content}>
                    <Text style={styles.name}>{data.name}</Text>
                    <Row>
                        <RattingView config={config} />
                        <Text style={[styles.address, styles.score]}>{data.score}.0</Text>
                    </Row>

                    <Row style={{ marginTop: pixel(10) }}>
                        <Text style={styles.address}>{data.address}</Text>
                        <Text style={styles.address}>{data.addressKM}km</Text>
                    </Row>
                </View>
            </Row>
            <Text style={styles.mask} numberOfLines={4}>
                商户简介：{data.mask.trim()}
            </Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFF',
        padding: pixel(Theme.edgeDistance),
        borderRadius: pixel(10),
    },
    cover: {
        width: pixel(120),
        height: pixel(100),
        borderRadius: pixel(10),
    },
    content: {
        height: pixel(100),
        marginLeft: pixel(Theme.edgeDistance),
        justifyContent: 'space-around',
    },
    score: {
        fontSize: font(12),
        color: '#FF0104',
        marginLeft: pixel(8),
    },
    name: {
        fontWeight: 'bold',
        color: '#000',
    },
    address: {
        fontSize: font(10),
        marginRight: pixel(40),
    },
    merchartItem: {
        borderBottomWidth: 1,
        borderColor: '#eeeeee',
        paddingBottom: pixel(Theme.edgeDistance),
    },
    mask: {
        fontSize: font(10),
        lineHeight: pixel(20),
        marginTop: pixel(10),
    },
});

import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
interface Props {
    data: any;
}

export default function ProductItem(props: Props) {
    const { data } = props;
    const navigation = useNavigation();
    return (
        <Pressable style={styles.container} onPress={() => navigation.navigate('MallDetails', { mail: data })}>
            <Image source={{ uri: data.url }} style={styles.cover} />
            <View style={styles.content}>
                <Text style={styles.title} numberOfLines={1}>
                    {data.title}
                </Text>
                <Text style={styles.price} numberOfLines={1}>
                    ¥{data.price}
                </Text>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        marginRight: pixel(15),
        marginTop: pixel(Theme.edgeDistance),
        borderRadius: pixel(8),
        height: pixel(210),
        width: Device.width / 2 - pixel(Theme.edgeDistance) * 2 - pixel(20),
    },
    cover: {
        height: pixel(150),
        borderTopLeftRadius: pixel(8),
        borderTopRightRadius: pixel(8),
    },
    content: {
        marginHorizontal: pixel(10),
        marginTop: pixel(10),
    },
    title: {
        fontSize: font(10),
    },
    price: {
        fontSize: font(14),
        color: Theme.primaryColor,
        marginTop: pixel(4),
    },
});

import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { NavBarHeader } from '~/components';
import AddressItem from './components/AddressItem';

const data = [
    {
        id: 1,
        name: '吴彦祖',
        address: '湖南省长沙市岳麓区梅溪湖街道东方路附近嘉和苑',
        phone: '12345678901',
    },
    {
        id: 2,
        name: '吴彦祖',
        address: '湖南省长沙市岳麓区梅溪湖街道东方路附近嘉和苑',
        phone: '12345678901',
    },
];
export default function MyAddressSecreen() {
    const navigation = useNavigation();

    const renderItem = ({ item, index }) => {
        return <AddressItem address={item} key={item.id} />;
    };
    return (
        <View style={styles.container}>
            <NavBarHeader title="收货地址" />
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
            <LinearGradient
                style={styles.linearGradientStyle}
                start={{ x: 1, y: 0 }}
                end={{ x: 0, y: 1 }}
                colors={['#FE4949', '#FD7420']}>
                <Pressable style={styles.button} onPress={() => navigation.navigate('CreatAddress')}>
                    <Text style={styles.buttonText}>+ 增加收货地址</Text>
                </Pressable>
            </LinearGradient>
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
    },
    separator: {
        height: pixel(10),
        backgroundColor: '#f4f4f4',
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        height: pixel(48),
    },
    buttonText: {
        color: '#fff',
        fontSize: font(14),
        fontWeight: 'bold',
    },
    linearGradientStyle: {
        position: 'absolute',
        bottom: 20,
        width: Device.width,
    },
});

import { useRoute } from '@react-navigation/native';
import React, { useCallback, useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { searchAdress } from '~/common';
import { NavBarHeader, Row, SvgIcon, SvgPath } from '~/components';
import { localUserStore, RecordKeys, Storage } from '~/store';
import SerachAddressItem from './components/SerachAddressItem';

export default function SerachAddress() {
    const router = useRoute();
    const setSelectAddress = router?.params?.setSelectAddress;
    const [address, setAddress] = useState('');
    const [arrayAddress, setArrayAddress] = useState([]);
    const [recordData, setRecordData] = useState(localUserStore.serachAddress);

    const inputAddress = useCallback(
        (val) => {
            const value = val?.trim() || '';
            serach(value);
            setAddress(value);
        },
        [serach],
    );

    const serach = useCallback((value) => {
        searchAdress(value).then((res) => {
            setArrayAddress(res);
        });
    }, []);

    // 添加地址搜索记录
    const addRecordAddress = useCallback((data) => {
        setRecordData((oldData) => {
            const newData = new Set([data, ...oldData]);
            Storage.setItem(RecordKeys.serachAddress, [...newData]);
            localUserStore.recallLocalAddress();
            return [...newData];
        });
    }, []);

    const serachResult = useMemo(() => {
        if (Array.isArray(arrayAddress) && arrayAddress?.length > 0) {
            return (
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.contentStyle}>
                    {arrayAddress?.map((item, index) => {
                        return (
                            <SerachAddressItem
                                address={item}
                                key={index}
                                addRecordAddress={() => addRecordAddress(item)}
                                setSelectAddress={setSelectAddress}
                            />
                        );
                    })}
                </ScrollView>
            );
        } else if (!address && recordData?.length <= 0) {
            return (
                <View style={styles.noResult}>
                    <Text style={styles.historeText}>还没有历史搜索记录</Text>
                    <Text style={{ color: 'grey', marginTop: pixel(6) }}>快来体验吧~</Text>
                </View>
            );
        } else if (!address && recordData?.length > 0) {
            return (
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.contentStyle}>
                    <Text style={{ marginBottom: pixel(10), color: 'grey' }}>历史搜索</Text>
                    {recordData?.map((item, index) => {
                        return (
                            <SerachAddressItem
                                address={item}
                                key={index}
                                addRecordAddress={() => addRecordAddress(item)}
                                setSelectAddress={setSelectAddress}
                            />
                        );
                    })}
                </ScrollView>
            );
        } else {
            return (
                <View style={styles.noResult}>
                    <SvgIcon name={SvgPath.address_empity} color="#bbbbbb" size={200} />
                    <Text style={{ color: 'grey' }}>没有找到你搜索的地址哦~</Text>
                </View>
            );
        }
    }, [arrayAddress, address, addRecordAddress, setSelectAddress, recordData]);

    return (
        <View style={styles.container}>
            <NavBarHeader title="搜索地址" />
            <View style={styles.inputBody}>
                <TextInput
                    placeholder="搜索地点"
                    style={styles.inputStyle}
                    onChangeText={inputAddress}
                    value={String(address)}
                    numberOfLines={1}
                    maxLength={14}
                />
                <Row>
                    <Pressable style={[!address && { opacity: 0 }]} disabled={!address} onPress={() => inputAddress()}>
                        <SvgIcon name={SvgPath.gunbi} color="#BCBCBC" size={22} />
                    </Pressable>
                    <View style={styles.line} />
                    <Pressable onPress={() => serach(address)}>
                        <Text>搜索</Text>
                    </Pressable>
                </Row>
            </View>
            <View style={styles.border} />
            {serachResult}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Theme.groundColour,
    },
    inputBody: {
        marginHorizontal: pixel(14),
        paddingHorizontal: pixel(8),
        height: pixel(40),
        justifyContent: 'center',
        backgroundColor: '#EFEFEF',
        borderRadius: pixel(6),
        flexDirection: 'row',
        alignItems: 'center',
    },
    inputStyle: {
        flex: 1,
        alignSelf: 'stretch',
        paddingVertical: pixel(10),
    },
    line: {
        width: 2,
        height: pixel(20),
        backgroundColor: '#C1C1C1',
        marginHorizontal: pixel(14),
    },
    border: {
        borderBottomWidth: 1,
        marginVertical: pixel(14),
        borderColor: '#EEEEEE',
    },
    noResult: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: pixel(60),
    },
    addressStyle: {
        marginHorizontal: pixel(14),
        marginBottom: pixel(40),
    },
    contentStyle: {
        marginHorizontal: pixel(14),
        marginBottom: pixel(40),
        flexGrow: 1,
    },
    historeText: {
        color: '#191919',
        textAlign: 'center',
        fontSize: font(14),
    },
});

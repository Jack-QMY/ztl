import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View, ViewStyle } from 'react-native';
import { SvgIcon, SvgPath } from '~/components';
import { localUserStore, RecordKeys, Storage } from '~/store';

interface SearchProps {
    searchKeyword: string;
    onSearch: Function;
    style?: ViewStyle;
}

export default function SearchedHistory({ searchKeyword, onSearch, style }: SearchProps) {
    const [recordData, setRecordData] = useState(localUserStore.searchRecord);

    const addRecord = useCallback((newKeyword) => {
        setRecordData((oldData) => {
            const newData = new Set([newKeyword, ...oldData]);
            Storage.setItem(RecordKeys.searchRecord, [...newData]);
            localUserStore.recallLocalStore();
            return [...newData];
        });
    }, []);

    const removeHistoryItem = useCallback((keyword) => {
        setRecordData((oldData) => {
            const newData = new Set(oldData);
            newData.delete(keyword);
            Storage.setItem(RecordKeys.searchRecord, [...newData]);
            localUserStore.recallLocalStore();
            return [...newData];
        });
    }, []);

    const reduceRecodes = useCallback(() => {
        setRecordData(() => {
            Storage.setItem(RecordKeys.searchRecord, []);
            localUserStore.recallLocalStore();
            setRecordData([]);
        });
    }, []);

    useEffect(() => {
        if (searchKeyword) {
            addRecord(searchKeyword);
        }
    }, [searchKeyword]);

    useEffect(() => {
        async function getRecord() {
            const record = await Storage.getItem(RecordKeys.searchRecord);
            if (Array.isArray(record)) {
                setRecordData(record);
            }
        }
        getRecord();
    }, []);

    const recordList = useMemo(() => {
        if (Array.isArray(recordData)) {
            return recordData.map((keyword, index) => {
                return (
                    <HistoryItem
                        key={index + keyword}
                        onSearch={onSearch}
                        keyword={keyword}
                        removeHistory={removeHistoryItem}
                    />
                );
            });
        }
    }, [recordData]);

    return (
        <View style={[styles.container, style]}>
            {Array.isArray(recordData) && recordData.length > 0 && (
                <View style={styles.historyHeader}>
                    <Text style={styles.title}>历史搜索</Text>
                    <TouchableOpacity activeOpacity={0.9} onPress={reduceRecodes}>
                        <Text style={{ fontSize: font(14), color: '#909090' }}>清空</Text>
                    </TouchableOpacity>
                </View>
            )}
            <View style={styles.listWrap}>{recordList}</View>
        </View>
    );
}

function HistoryItem({ keyword, onSearch, removeHistory }) {
    const [closeVisible, setCloseVisible] = useState(false);
    return (
        <TouchableWithoutFeedback onLongPress={() => setCloseVisible(true)} onPress={() => onSearch(keyword)}>
            <View style={styles.keywordItem}>
                <Text style={styles.keywordText}>{keyword}</Text>
                {closeVisible && (
                    <TouchableOpacity
                        style={styles.closeBtn}
                        activeOpacity={0.9}
                        onPress={() => removeHistory(keyword)}>
                        <SvgIcon name={SvgPath.close} color="#fff" size={11} />
                    </TouchableOpacity>
                )}
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: pixel(10),
    },
    historyHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: pixel(15),
        paddingVertical: pixel(5),
        height: pixel(30),
    },
    title: {
        color: '#202020',
        fontSize: font(15),
        fontWeight: 'bold',
    },
    listWrap: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingLeft: pixel(15),
        paddingRight: pixel(5),
    },
    keywordItem: {
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: pixel(15),
        height: pixel(32),
        borderRadius: pixel(5),
        backgroundColor: '#f9f9f9',
        marginRight: pixel(10),
        marginTop: pixel(10),
    },
    keywordText: {
        color: '#202020',
        fontSize: font(12),
    },
    closeBtn: {
        position: 'absolute',
        top: pixel(-2),
        right: pixel(-2),
        width: pixel(14),
        height: pixel(14),
        borderRadius: pixel(7),
        backgroundColor: '#dfdfdf',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

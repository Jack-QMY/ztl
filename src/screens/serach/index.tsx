import { useNavigation, useRoute } from '@react-navigation/native';
import __ from 'lodash';
import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, TextInput, View } from 'react-native';
import { SvgIcon, SvgPath } from '~/components';
import HotKeywords from './components/HotKeywords';
import SearcheHistory from './components/SearchHistory';

export default function index() {
    const router = useRoute();
    const navigation = useNavigation();
    const [keyword, setKeyword] = useState(router.params.keyword || '');
    const [textValue, setTextValue] = useState('');
    const trimmedValue = textValue && textValue.trim();
    const [keywordsVisible, toggleKeywordsVisible] = useState(false);
    const hotIndex = !keywordsVisible && !trimmedValue ? 1 : -1;
    const resultIndex = !keywordsVisible && trimmedValue ? 3 : -1;
    const onSearch = __.debounce((kw) => {
        setKeyword(kw);
        setTextValue(kw);
        toggleKeywordsVisible(false);
    }, 100);
    const onEditing = () => {
        if (trimmedValue) {
            setKeyword(trimmedValue);
            toggleKeywordsVisible(false);
        }
    };
    return (
        <View style={styles.contaniner}>
            <View style={styles.header}>
                <Pressable onPress={() => navigation.goBack()}>
                    <SvgIcon name={SvgPath.back} color="#000" size={26} />
                </Pressable>
                <View style={styles.inputBody}>
                    <SvgIcon name={SvgPath.serach} color="#000" size={20} />
                    <TextInput
                        placeholder={keyword}
                        value={textValue}
                        onChangeText={(text) => setTextValue(text)}
                        placeholderTextColor="#BBBBBB"
                        onSubmitEditing={onEditing}
                        style={{ marginLeft: 10 }}
                        autoFocus={true}
                    />
                </View>
            </View>
            <ScrollView contentContainerStyle={styles.contentContainer} keyboardShouldPersistTaps="always">
                <View style={[{ zIndex: hotIndex }]}>
                    <SearcheHistory style={{ paddingBottom: pixel(15) }} searchKeyword={keyword} onSearch={onSearch} />
                    <HotKeywords onSearch={onSearch} />

                    {/* <View style={[styles.posContent, { zIndex: resultIndex }]}>
                        <SearchedResult keyword={keyword} />
                    </View> */}
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    contaniner: {
        flex: 1,
        // paddingTop: pixel(6),
        top: Device.isIOS ? Device.statusBarHeight * 1.2 : 0,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: pixel(14),
    },
    inputBody: {
        borderWidth: 1,
        borderColor: '#FC4E4D',
        width: Device.width - pixel(Theme.edgeDistance) * 4 - pixel(10),
        paddingHorizontal: pixel(10),
        marginLeft: pixel(10),
        height: pixel(36),
        borderRadius: pixel(20),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    contentContainer: {
        flexGrow: 1,
        paddingTop: pixel(15),
    },
});

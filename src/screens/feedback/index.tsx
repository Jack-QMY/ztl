import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { ActionSheet, MediaUploader, NavBarHeader, Row, Scoring, SvgIcon, SvgPath } from '~/components';

export default function index() {
    const navigation = useNavigation();
    const [visiable, setVisiable] = useState(false);
    const [body, setBody] = useState('');
    const [phone, setPhone] = useState('');
    const [images, setImages] = useState([]);
    const [score, setScore] = useState();

    const uploadResponse = useCallback((response) => {
        setImages(response);
    }, []);
    const onPress = useCallback(() => {
        navigation.navigate('FeedBackResult');
    }, []);
    return (
        <View style={styles.container}>
            <NavBarHeader title="意见反馈" />
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1, paddingBottom: 50 }}>
                <Row style={{ justifyContent: 'space-between', paddingHorizontal: pixel(14) }}>
                    <Text>问题和意见</Text>
                    <Pressable onPress={() => setVisiable(true)}>
                        <Row>
                            <Text style={styles.headerRight}>快速键入</Text>
                            <SvgIcon name={SvgPath.downArrow} size={20} color={'#FC4E4D'} />
                        </Row>
                    </Pressable>
                </Row>
                <View style={styles.inputBody}>
                    <TextInput
                        value={body}
                        onChangeText={(text) => setBody(text)}
                        placeholder={'请详细描述你的问题和意见'}
                        maxLength={100}
                        multiline={true}
                    />
                </View>
                <Text style={{ margin: pixel(14) }}>问题截图</Text>
                <View style={styles.selectPhoto}>
                    <Row style={{ justifyContent: 'space-between' }}>
                        <Text style={styles.otherText}>点击预览图片</Text>
                        <Text style={styles.otherText}>{images.length}/8</Text>
                    </Row>
                    <View style={styles.mediaWrap}>
                        <MediaUploader
                            type="image"
                            maximum={8}
                            onResponse={uploadResponse}
                            maxWidth={Device.width / 2}
                            style={styles.mediaItem}
                        />
                    </View>
                </View>
                <View>
                    <Text style={{ margin: pixel(14) }}>微信/手机号</Text>
                    <View style={styles.phoneBoder}>
                        <TextInput
                            placeholder="选填方便我们联系您"
                            value={phone}
                            style={{ height: pixel(60) }}
                            onChangeText={(text) => {
                                setPhone(text);
                            }}
                        />
                    </View>
                </View>
                <View style={{ margin: pixel(14) }}>
                    <Row>
                        <Text style={{ marginRight: pixel(6) }}>应用评分</Text>
                        <Scoring onResponse={(number) => setScore(number)} totalScore={5} />
                    </Row>
                </View>
                <LinearGradient
                    style={{ marginHorizontal: pixel(14), marginTop: pixel(20), borderRadius: 8 }}
                    start={{ x: 1.5, y: 0 }}
                    end={{ x: 0, y: 0.6 }}
                    colors={['#FD4A22', '#FE0102']}>
                    <Pressable style={styles.button} onPress={onPress}>
                        <Text style={styles.buttonText}>提交</Text>
                    </Pressable>
                </LinearGradient>
            </ScrollView>
            <ActionSheet
                visible={visiable}
                onToggleVisible={() => setVisiable(false)}
                options={[
                    {
                        title: '见面显示错乱',
                        onPress: () => setBody('见面显示错乱'),
                    },
                    {
                        title: '启动缓慢，卡出翔了',
                        onPress: () => setBody('启动缓慢，卡出翔了'),
                    },
                    {
                        title: 'UI无法直视，丑哭了',
                        onPress: () => setBody('UI无法直视，丑哭了'),
                    },
                    {
                        title: '偶发性崩溃',
                        onPress: () => setBody('偶发性崩溃'),
                    },
                ]}
            />
        </View>
    );
}
const MediaItemWidth = (Device.width - pixel(60)) / 3;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Theme.groundColour,
    },
    headerRight: {
        color: '#FC4E4D',
        fontSize: font(12),
        marginRight: pixel(4),
    },
    inputBody: {
        marginTop: pixel(10),
        backgroundColor: '#fff',
        height: pixel(140),
        paddingHorizontal: pixel(14),
        paddingVertical: pixel(10),
    },
    selectPhoto: {
        marginTop: pixel(10),
        backgroundColor: '#fff',
        paddingHorizontal: pixel(14),
        paddingVertical: pixel(10),
    },
    otherText: {
        color: '#000',
        fontSize: font(12),
    },
    mediaWrap: {
        marginTop: pixel(14),
    },
    phoneBoder: {
        backgroundColor: '#fff',
        paddingHorizontal: pixel(14),
    },
    button: {
        height: pixel(48),
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: font(14),
        fontWeight: 'bold',
    },
    mediaItem: { width: MediaItemWidth, height: MediaItemWidth, marginTop: pixel(10), marginRight: pixel(10) },
});

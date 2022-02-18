import React, { useMemo, useState } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import { AnimatedModal, Avatar, RattingView, Row } from '~/components';
import { userStore } from '~/store';

export default function FeedBackItem({ feedback }) {
    const [imageVisable, setImageVisable] = useState(false);
    const [imageIndex, setImageIndex] = useState(0);

    const config = {
        selected: false,
        totalScore: feedback.score,
        widthSize: 20,
        heightSize: 20,
    };
    const userInfo = userStore.me.userinfo;
    const images = feedback.images;
    const imageContent = useMemo(() => {
        if (Array.isArray(images) && images.length > 0) {
            return (
                <View style={styles.albumContainer}>
                    {images.map((item, index) => {
                        return (
                            <Pressable
                                key={item.id}
                                style={[styles.uploadView]}
                                onPress={() => {
                                    setImageVisable(true);
                                    setImageIndex(index);
                                }}>
                                <Image source={{ uri: item.url }} style={styles.imageItem} />
                            </Pressable>
                        );
                    })}
                </View>
            );
        } else {
            return null;
        }
    }, [images]);
    return (
        <View style={styles.container}>
            <Row style={{ justifyContent: 'space-between' }}>
                <Row>
                    <Avatar source={userInfo.avatar} size={60} />
                    <View style={styles.userContent}>
                        <Text style={styles.nickname}>{userInfo.nickname}</Text>
                        <Text style={styles.creat_time}>{feedback?.creat_time}</Text>
                    </View>
                </Row>
                <RattingView config={config} />
            </Row>
            <Row style={{ marginVertical: pixel(10) }}>
                <View style={styles.statusBorder}>
                    <Text style={styles.statusBorderText}>{feedback.status == 0 ? '未处理' : '已受理'}</Text>
                </View>
                <Text>{feedback.content}</Text>
            </Row>
            {imageContent}
            <AnimatedModal visible={imageVisable} toggleVisible={setImageVisable} showIcon={true}>
                <ImageViewer
                    onSwipeDown={() => setImageVisable(false)}
                    imageUrls={images}
                    index={imageIndex}
                    enableSwipeDown={true}
                />
            </AnimatedModal>
        </View>
    );
}
const MediaItemWidth = (Device.width - pixel(60)) / 3;
const styles = StyleSheet.create({
    container: {
        margin: pixel(14),
    },
    userContent: {
        height: pixel(60),
        justifyContent: 'center',
        marginLeft: pixel(10),
    },
    nickname: {
        color: '#000',
        fontSize: font(13),
    },
    creat_time: {
        color: '#BBBBBB',
        fontSize: font(10),
        marginTop: pixel(6),
    },
    statusBorder: {
        width: pixel(50),
        height: pixel(20),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: pixel(4),
        backgroundColor: '#FE4949',
        marginRight: pixel(10),
    },
    statusBorderText: {
        color: '#fff',
        fontSize: font(10),
    },
    albumContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    uploadView: {
        width: MediaItemWidth,
        height: MediaItemWidth,
        marginTop: pixel(10),
        marginRight: pixel(10),
    },
    imageItem: {
        bottom: 0,
        left: 0,
        position: 'absolute',
        right: 0,
        top: 0,
        borderRadius: pixel(4),
    },
});

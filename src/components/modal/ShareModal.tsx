import React from 'react';
import { Image, Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { ShareUtil } from '~/common';

interface Props {
    visible: boolean;
    toggleVisible: (v: boolean) => void;
}
export default function ShareModal(props: Props) {
    const { visible, toggleVisible } = props;
    const data = [
        {
            id: 1,
            title: '微信好友',
            icons: require('~/assets/images/share_wx.png'),
            shareContent: ShareUtil.shareToWeChat,
        },
        {
            id: 2,
            title: '微信朋友圈',
            icons: require('~/assets/images/share_wx.png'),
            shareContent: ShareUtil.shareToTimeline,
        },
        {
            id: 3,
            title: '复制链接',
            icons: require('~/assets/images/share_links.png'),
            shareContent: ShareUtil.shareToLink,
        },
    ];
    return (
        <Modal
            visible={visible}
            animationType="slide"
            animated={true}
            transparent={true}
            statusBarTranslucent={true}
            hardwareAccelerated={true}>
            <View style={styles.modalContainer}>
                <View style={styles.content}>
                    <Text style={styles.headerTitle}>分享到</Text>
                    <View style={styles.container}>
                        {data.map((item, index) => {
                            return (
                                <Pressable style={styles.typeButton} key={item.id} onPress={() => item.shareContent()}>
                                    <Image source={item.icons} style={styles.icons} />
                                    <Text>{item.title}</Text>
                                </Pressable>
                            );
                        })}
                    </View>
                    <Pressable onPress={toggleVisible} style={styles.cancleButton}>
                        <Text style={styles.cancleText}>取消</Text>
                    </Pressable>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.4)',
        justifyContent: 'flex-end',
        alignItems: 'flex-start',
    },

    content: {
        backgroundColor: '#FFF',
        width: Device.width,
        // height: Device.height * 0.24,
        borderTopRightRadius: pixel(14),
        borderTopLeftRadius: pixel(14),
        padding: pixel(10),
    },
    headerTitle: {
        textAlign: 'center',
        fontSize: font(14),
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
        marginTop: pixel(20),
        justifyContent: 'space-around',
    },
    typeButton: {
        alignItems: 'center',
        marginRight: pixel(10),
    },
    icons: {
        width: pixel(60),
        height: pixel(60),
    },
    cancleButton: {
        borderTopWidth: 1,
        marginTop: pixel(20),
        marginBottom: pixel(20),
        borderColor: '#EEEEEE',
        paddingTop: pixel(14),
        alignItems: 'center',
        justifyContent: 'center',
    },
    cancleText: {
        fontSize: font(14),
        color: '#000',
    },
});

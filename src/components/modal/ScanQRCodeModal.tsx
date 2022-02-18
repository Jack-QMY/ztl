import React, { useEffect, useRef, useState } from 'react';
import { Animated, Easing, Modal, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RNCamera } from 'react-native-camera';
import ImagePicker from 'react-native-image-crop-picker';
import LocalBarcodeRecognizer from 'react-native-local-barcode-recognizer';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { SvgIcon, SvgPath } from '~/components';

interface Props {
    visible: boolean;
    toggleVisible: (v: boolean) => void;
    setContent: Function;
}

export default function ScanQRCodeModal(props: Porps) {
    const { visible, toggleVisible, setContent } = props;
    const [flashMode, setFlashMode] = useState(false); //控制闪光灯
    const animation = useRef(new Animated.Value(0));
    const startAnimation = () => {
        animation.current.setValue(0);
        Animated.timing(
            animation.current, //初始值
            {
                toValue: -180,
                duration: 1500,
                easing: Easing.linear,
                useNativeDriver: true,
            }, //结束值
        ).start(() => startAnimation()); //开始
    };

    // 打开相册
    const openImage = () => {
        ImagePicker.openPicker({
            width: 300,
            height: 300,
            cropping: false,
            includeBase64: true,
        }).then((image) => {
            if (image.data) {
                recoginze(image.data);
            }
        });
    };
    const recoginze = async (data) => {
        let result = await LocalBarcodeRecognizer.decode(data.replace('data:image/jpeg;base64,', ''), {
            codeTypes: ['ean13', 'qr'],
        });
        setContent(result);
        toggleVisible();
    };

    useEffect(() => {
        startAnimation();
    }, []);

    return (
        <Modal
            visible={visible}
            animationType="slide"
            animated={true}
            transparent={true}
            statusBarTranslucent={true}
            hardwareAccelerated={true}>
            <View style={styles.container}>
                <View style={styles.content}>
                    <QRCodeScanner
                        containerStyle={styles.container}
                        fadeIn={true}
                        onRead={(e) => {
                            if (e.data) {
                                setContent(e.data);
                            }
                            toggleVisible();
                        }}
                        customMarker={
                            <View style={styles.customMarkerStyle}>
                                <TouchableOpacity
                                    style={styles.buttonTouchable}
                                    onPress={() => setFlashMode(!flashMode)}>
                                    <SvgIcon name={SvgPath.torch} color="#fff" size={22} />
                                    <Text style={styles.torchText}>轻触点亮</Text>
                                </TouchableOpacity>
                                <Animated.View
                                    style={[styles.border, { transform: [{ translateY: animation.current }] }]}
                                />
                            </View>
                        }
                        showMarker={true}
                        flashMode={flashMode ? RNCamera.Constants.FlashMode.torch : RNCamera.Constants.FlashMode.off}
                        topContent={
                            <View style={styles.topContainer}>
                                <Pressable onPress={toggleVisible}>
                                    <SvgIcon name={SvgPath.back} color="#fff" size={24} />
                                </Pressable>
                                <Text style={styles.title}>扫码</Text>
                                <Pressable onPress={openImage}>
                                    <Text style={styles.title}>相册</Text>
                                </Pressable>
                            </View>
                        }
                    />
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,1)',
    },
    customMarkerStyle: {
        borderWidth: 1,
        borderRadius: pixel(6),
        borderColor: '#20E00B',
        width: '60%',
        height: '50%',
    },
    border: {
        borderBottomWidth: 1,
        borderColor: '#20E00B',
        position: 'absolute',
        width: '100%',
        height: '100%',
    },
    topContainer: {
        marginHorizontal: pixel(14),
        width: Device.width - pixel(28),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    title: {
        color: '#fff',
        fontSize: font(14),
    },
    content: {
        flex: 1,
        width: Device.width,
    },
    buttonTouchable: {
        position: 'absolute',
        bottom: 4,
        alignSelf: 'center',
        alignItems: 'center',
    },
    torchText: {
        color: '#fff',
        marginTop: pixel(4),
        fontSize: font(8),
    },
});

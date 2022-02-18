import React, { useCallback, useMemo, useState } from 'react';
import { Image, StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import { openImagePicker } from '~/common';
import { AnimatedModal, SvgIcon, SvgPath } from '~/components';

// todo:video待完善
interface Props {
    type?: 'video' | 'image' | 'default';
    style?: ViewStyle;
    maxWidth?: number;
    maximum?: number;
    onResponse: (res: any) => any;
    images?: string[];
    children?: JSX.Element;
}

const maxMediaWidth = Device.width - Theme.edgeDistance * 4;
const mediaWidth = maxMediaWidth / 3;
export default function MediaUploader(props: Props) {
    const { type = 'default', style, maxWidth, maximum = 9, onResponse, children } = props;
    const [images, setImages] = useState(props?.images ?? []);
    // 控制图片显示弹窗的开关
    const [imageVisable, setImageVisable] = useState(false);
    const [imageIndex, setImageIndex] = useState(0);
    const onPressHandler = () => {
        return imagePickerHandler();
    };
    const imagePickerHandler = () => {
        openImagePicker({ mediaType: 'any', multiple: true, includeBase64: true })
            .then(
                (media: any) => {
                    const pickedMedia = media && media.length;
                    if (!pickedMedia) {
                        return;
                    }
                    const pickedItems = media.length ? media : [media];

                    for (let i in pickedItems) {
                        const pickedItem = pickedItems[i];
                        //选择的是图片
                        const imageDataArr = [`data:${pickedItem.mime};base64,${pickedItem.data}`];
                        //预览图片
                        let newImages = null;
                        setImages((prevImages) => {
                            newImages = prevImages.concat(imageDataArr);
                            if (newImages.length > maximum) {
                                newImages.splice(maximum);
                                Toast.show({
                                    content: `最多上传${maximum}张图片`,
                                });
                            }
                            return newImages;
                        });
                        //已选择图片
                        if (newImages && newImages?.length) {
                            onResponse(newImages);
                        }
                    }
                },
                (reject) => {
                    console.log('imagePickerHandler reject ', reject);
                },
            )
            .catch((err) => {
                console.log('open image err', err);
            });
    };
    const removeImage = useCallback((ImageIndex) => {
        setImages((prevImages) => {
            prevImages.splice(ImageIndex, 1);
            onResponse(prevImages);
            return [...prevImages];
        });
        setImageIndex(ImageIndex);
    }, []);

    const Album = useMemo(() => {
        return images.map((path, index) => {
            return (
                <TouchableOpacity
                    activeOpacity={1}
                    key={index}
                    onPress={() => {
                        setImageVisable(true);
                        setImageIndex(index);
                    }}
                    style={[styles.uploadView, style]}>
                    <Image source={{ uri: path }} style={styles.imageItem} />
                    <TouchableOpacity style={styles.close} onPress={() => removeImage(index)}>
                        <SvgIcon name={SvgPath.close} color={'#fff'} size={10} />
                    </TouchableOpacity>
                </TouchableOpacity>
            );
        });
    }, [images]);
    if (images.length > 0) {
        const imageUrls = images.map((image) => {
            return { url: image };
        });
        return (
            <View style={styles.albumContainer}>
                {Album}
                {images.length < maximum && (
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={imagePickerHandler}
                        style={[styles.uploadView, style]}>
                        <SvgIcon
                            name={type === 'image' ? SvgPath.photo : SvgPath.add}
                            color={Theme.slateGray1}
                            size={30}
                        />
                    </TouchableOpacity>
                )}
                <AnimatedModal visible={imageVisable} toggleVisible={setImageVisable} showIcon={true}>
                    <ImageViewer
                        onSwipeDown={() => setImageVisable(false)}
                        imageUrls={imageUrls}
                        index={imageIndex}
                        enableSwipeDown={true}
                    />
                </AnimatedModal>
            </View>
        );
    }
    return (
        <View>
            {children ? (
                <TouchableOpacity onPress={onPressHandler}>
                    <View>{children}</View>
                </TouchableOpacity>
            ) : (
                <TouchableOpacity style={[styles.uploadView, style]} onPress={onPressHandler}>
                    <SvgIcon
                        name={type === 'image' ? SvgPath.photo : SvgPath.camera}
                        color={Theme.slateGray1}
                        size={30}
                    />
                </TouchableOpacity>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    albumContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    progressMark: {
        ...StyleSheet.absoluteFill,
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.2)',
        borderRadius: pixel(5),
        justifyContent: 'center',
    },
    close: {
        alignItems: 'center',
        backgroundColor: 'rgba(32,30,51,0.8)',
        borderRadius: pixel(18) / 2,
        height: pixel(18),
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        right: pixel(3),
        top: pixel(3),
        width: pixel(18),
    },
    imageItem: {
        bottom: 0,
        left: 0,
        position: 'absolute',
        right: 0,
        top: 0,
    },
    playMark: {
        ...StyleSheet.absoluteFill,
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.2)',
        borderRadius: pixel(5),
        justifyContent: 'center',
    },
    uploadView: {
        alignItems: 'center',
        backgroundColor: Theme.slateGray2,
        borderRadius: pixel(5),
        height: mediaWidth,
        justifyContent: 'center',
        marginRight: Theme.edgeDistance,
        overflow: 'hidden',
        width: mediaWidth,
    },
});

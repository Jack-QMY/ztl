import React, { useMemo, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import { ResponseMedia } from '~/common';
import { AnimatedModal, PlaceholderImage } from '~/components';

interface Props {
    images: Array<{
        id: any;
        url: any;
        width: any;
        height: any;
    }>;
    gap?: number;
    style?: any;
    gridStyle?: any;
}

export default function GridImage(props: Props) {
    const { images, gap, style, gridStyle } = props;
    const [gridWidth, setGridWidth] = useState(0);
    const [visible, setVisible] = useState(false);
    const [imageIndex, setImageIndex] = useState(0);

    const _onLayout = (e) => {
        const width = e.nativeEvent.layout.width;
        setGridWidth(Math.floor(width));
    };

    const imagesLayout = useMemo(() => {
        const imagesData = images?.slice(0, 9) || [];
        const imageSize = Math.ceil((gridWidth - gap * 2) / 3);
        const defaultImageStyle = { width: imageSize, height: imageSize, ...gridStyle };

        if (imagesData.length === 1) {
            const { width, height } = imagesData[0];
            const responseSize = ResponseMedia(width, height, gridWidth);
            return (
                <TouchableOpacity
                    activeOpacity={1}
                    style={{ alignSelf: 'flex-start' }}
                    onPress={() => {
                        setImageIndex(0);
                        setVisible(true);
                    }}>
                    <PlaceholderImage
                        style={{
                            borderRadius: pixel(4),
                            marginTop: pixel(4),
                            ...responseSize,
                            ...gridStyle,
                        }}
                        source={{ uri: imagesData[0].url }}
                    />
                </TouchableOpacity>
            );
        } else if (imagesData.length > 1) {
            return (
                <View
                    style={[
                        styles.imageContainer,
                        {
                            marginRight: -gap * 2,
                            marginTop: gap,
                        },
                    ]}>
                    {imagesData?.map((elem, index) => {
                        return (
                            <TouchableOpacity
                                style={{ marginTop: gap, marginRight: gap }}
                                key={index}
                                onPress={() => {
                                    setImageIndex(index);
                                    setVisible(true);
                                }}
                                activeOpacity={1}>
                                <PlaceholderImage
                                    style={{
                                        ...defaultImageStyle,
                                        ...imageStyle({
                                            index,
                                            count: imagesData.length,
                                            radius: pixel(4),
                                            gap,
                                        }),
                                    }}
                                    source={{ uri: elem.url }}
                                />
                            </TouchableOpacity>
                        );
                    })}
                </View>
            );
        }
    }, [images, gap, gridStyle, gridWidth]);

    return (
        <View onLayout={_onLayout}>
            {imagesLayout}
            <AnimatedModal visible={visible} toggleVisible={() => setVisible(false)} showIcon={true}>
                <ImageViewer
                    onSwipeDown={() => setVisible(false)}
                    imageUrls={images}
                    index={imageIndex}
                    enableSwipeDown={true}
                />
            </AnimatedModal>
        </View>
    );
}

function imageStyle({ count, index, radius, gap }) {
    let style;
    if (count === 1) {
        style = {
            borderRadius: radius,
        };
    } else if (count > 1 && count < 4) {
        if (index === 0) {
            style = {
                borderTopLeftRadius: radius,
                borderBottomLeftRadius: radius,
            };
        } else if (index === count - 1) {
            style = {
                borderTopRightRadius: radius,
                borderBottomRightRadius: radius,
            };
        }
    } else if (count === 4) {
        if (index === 0) {
            style = {
                borderTopLeftRadius: radius,
            };
        } else if (index === 1) {
            style = {
                borderTopRightRadius: radius,
                marginRight: gap,
            };
        } else if (index === 2) {
            style = {
                borderBottomLeftRadius: radius,
            };
        } else if (index === 3) {
            style = {
                borderBottomRightRadius: radius,
            };
        }
    } else if (count > 4) {
        if (index === 0) {
            style = {
                borderTopLeftRadius: radius,
            };
        } else if (index === 2) {
            style = {
                borderTopRightRadius: radius,
            };
        } else if (index === (count / 3 > 2 ? 6 : 3)) {
            // index = 3 6
            style = {
                borderBottomLeftRadius: radius,
            };
        } else if (index === count - 1 && Math.ceil(count % 3) === 0) {
            // index = 5 8
            style = {
                borderBottomRightRadius: radius,
            };
        }
    }
    return style;
}

const styles = StyleSheet.create({
    imageContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        overflow: 'hidden',
    },
});

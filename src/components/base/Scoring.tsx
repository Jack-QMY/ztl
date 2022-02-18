import React, { useCallback, useEffect, useState } from 'react';
import { findNodeHandle, Image, ImageStyle, Pressable, StyleSheet, UIManager, View, ViewStyle } from 'react-native';

interface Props {
    style?: ViewStyle;
    starCount?: number; // 星星数量
    totalScore?: number; // 总分
    starIcons?: {
        fullStar?: string;
        halfStar?: string;
        emptyStar?: string;
    };
    iconStyle?: ImageStyle;
    onResponse: () => number; // 返回评分
}

export default function Scoring(props: Props) {
    const { style, iconStyle, starCount = 5, totalScore = 10, onResponse } = props;

    const [score, setScore] = useState(0);
    const [starData, setData] = useState(Array(starCount).fill(0));
    const stars = props?.starIcons ? { starIcons, ...props.starIcons } : starIcons;

    let starRef: any;
    const starHandler = useCallback(
        (e, i, ref) => {
            const handle = findNodeHandle(ref);
            const resolve = new Promise((resolve) => {
                UIManager.measure(handle, (x, y, width, height, pageX, pageY) => {
                    resolve({ x, y, width, height, pageX, pageY });
                });
            });

            // 一颗星所占的分值
            let starRate = totalScore / starCount;

            let parentWidth = 0;
            let locationX = e.nativeEvent.locationX;
            resolve.then((resData) => {
                parentWidth = resData.width;
                starData.map((item, index) => {
                    if (index < i) {
                        starData[index] = 1;
                    } else if (index === i) {
                        if (locationX <= parentWidth / 2) {
                            starData[index] = 0.5;
                            setScore((s) => (s = (index + 0.5) * starRate));
                        } else {
                            starData[index] = 1;
                            setScore((s) => (s = (index + 1) * starRate));
                        }
                    } else {
                        starData[index] = 0;
                    }
                });
                setData([...starData]);
            });
        },
        [starData],
    );

    useEffect(() => {
        if (typeof score === 'number') {
            onResponse(score);
        }
    }, [score]);

    return (
        <View style={[styles.starsWrap, style]}>
            {starData.map((item, index) => {
                let source = item === 0 ? stars.emptyStar : item === 1 ? stars.fullStar : stars.halfStar;
                return (
                    <Pressable
                        activeOpacity={0.9}
                        key={index.toString()}
                        onPress={(event) => starHandler(event, index, starRef)}>
                        <Image
                            key={index}
                            source={source}
                            ref={(ref) => (starRef = ref)}
                            style={[styles.starIcon, iconStyle]}
                        />
                    </Pressable>
                );
            })}
        </View>
    );
}

const starIcons = {
    fullStar: require('~/assets/images/ic_star_full.png'),
    halfStar: require('~/assets/images/ic_star_half.png'),
    emptyStar: require('~/assets/images/ic_star_empty.png'),
};

const styles = StyleSheet.create({
    starsWrap: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    starIcon: {
        width: pixel(30),
        height: pixel(30),
        marginRight: pixel(5),
    },
});

import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Pressable, StyleSheet, Text, View, ViewStyle } from 'react-native';
import { Avatar, GridImage, RattingView, Row } from '~/components';

interface Props {
    comment: any;
    style?: ViewStyle;
}

// 配置星星评分
const config = {
    selected: false,
    totalScore: 5,
    widthSize: 20,
    heightSize: 20,
};
export default function CommentItem(props: Props) {
    const { comment, style } = props;
    const navigation = useNavigation();
    return (
        <Pressable onPress={() => navigation.navigate('CommentScreen', { type: 1 })} style={[styles.contaniner, style]}>
            <View style={styles.row}>
                <Row>
                    <Avatar
                        size={30}
                        source={{
                            uri: 'https://upload.jianshu.io/users/upload_avatars/6342050/811f2555-6c20-44b2-863e-ef10c790cf0d?imageMogr2/auto-orient/strip|imageView2/1/w/240/h/240',
                        }}
                    />
                    <Text style={styles.user_name}>jack</Text>
                </Row>
                <RattingView config={config} />
            </View>
            {comment.conmment ? <Text style={styles.commentText}>{comment.conmment}</Text> : null}
            <Text style={styles.guigeText}>规格：砂糖橘橘色</Text>
            {comment.commentImages.length > 0 ? <GridImage images={comment.commentImages} gap={4} /> : null}
        </Pressable>
    );
}

const styles = StyleSheet.create({
    contaniner: {
        padding: pixel(14),
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    user_name: {
        marginLeft: pixel(14),
        color: '#676968',
    },
    guigeText: {
        color: '#676968',
        marginTop: pixel(10),
    },
    cover: {
        width: pixel(100),
        height: pixel(110),
        borderRadius: pixel(4),
    },
    coverData: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
    },
    pressCover: {
        marginTop: pixel(14),
        marginRight: pixel(10),
    },
    commentText: {
        marginTop: pixel(10),
        lineHeight: pixel(18),
    },
});

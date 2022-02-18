import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { NavBarHeader } from '~/components';

export default function DestroyGPK() {
    const [num, setNum] = useState();
    return (
        <View style={styles.container}>
            <NavBarHeader
                title="GPK销毁"
                rightComponent={
                    <Pressable style={{ marginRight: pixel(14) }}>
                        <Text>销毁记录</Text>
                    </Pressable>
                }
            />
            <View style={[styles.row, styles.list]}>
                <Text style={styles.leftTitle}>销毁GPK</Text>
                <TextInput
                    placeholder="请输入销毁GPK数量"
                    maxLength={11}
                    value={num}
                    onChangeText={(value) => setNum(value)}
                />
            </View>
            <View style={[styles.row, styles.list]}>
                <Text style={styles.leftTitle}>获得积分</Text>
                <Text style={styles.leftTitle}>0.00积分</Text>
            </View>
            <LinearGradient
                style={styles.linearGradientStyle}
                start={{ x: 1, y: 0 }}
                end={{ x: 0, y: 1 }}
                colors={['#FE4949', '#FD7420']}>
                <Pressable style={styles.button}>
                    <Text style={styles.buttonText}>确认销毁</Text>
                </Pressable>
            </LinearGradient>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Theme.groundColour,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    leftTitle: {
        color: '#000',
        marginRight: pixel(10),
        width: Device.width - (Device.width - pixel(60)),
    },
    list: {
        borderBottomWidth: 1,
        paddingHorizontal: pixel(14),
        borderBottomColor: '#EEEEEE',
        height: pixel(60),
        backgroundColor: '#fff',
    },
    linearGradientStyle: {
        marginTop: pixel(30),
        borderRadius: 8,
        marginHorizontal: pixel(14),
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
});

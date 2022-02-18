import React from 'react';
import { Modal, Pressable, StyleSheet, View } from 'react-native';

interface Props {
    visible: boolean;
    toggleVisible: (v: boolean) => void;
    children: any;
}
export default function AnimatedBottomModal(props: Props) {
    const { visible, toggleVisible, children } = props;
    return (
        <Modal
            visible={visible}
            animationType="slide"
            animated={true}
            transparent={true}
            statusBarTranslucent={true}
            hardwareAccelerated={true}>
            <Pressable style={styles.modalContainer} onPress={toggleVisible}>
                <View style={styles.content}>{children}</View>
            </Pressable>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'flex-end',
        alignItems: 'flex-start',
    },
    content: {
        backgroundColor: '#FFF',
        width: Device.width,
        borderTopRightRadius: pixel(14),
        borderTopLeftRadius: pixel(14),
    },
});

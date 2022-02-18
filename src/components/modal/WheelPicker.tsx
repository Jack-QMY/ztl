import React from 'react';
import { Modal, StyleSheet, View } from 'react-native';
import { DatePicker } from 'react-native-common-date-picker';

interface Props {
    visible: boolean;
    toggleVisible: (v: boolean) => void;
    selectDate: any;
}

export default function WheelPicker(props: Props) {
    const { visible, toggleVisible, selectDate } = props;
    return (
        <Modal
            visible={visible}
            animationType="slide"
            animated={true}
            transparent={true}
            statusBarTranslucent={true}
            hardwareAccelerated={true}>
            <View style={styles.container}>
                <DatePicker
                    type="YYYY-MM-DD"
                    toolBarCancelStyle={{ color: '#bbbbbb', fontSize: font(14) }}
                    toolBarConfirmStyle={{ color: '#000', fontSize: font(14) }}
                    cancelText={'取消'}
                    selectedBorderLineColor={'#BBBBBB'}
                    cancel={toggleVisible}
                    confirmText={'确定'}
                    yearSuffix={'年'}
                    monthSuffix={'月'}
                    daySuffix={'日'}
                    confirm={(date) => {
                        selectDate(date);
                        toggleVisible();
                        console.warn(date);
                    }}
                />
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'flex-end',
    },
});

import React, { useEffect, useState } from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import { useRecallUserProfile } from '~/common';
import { geolocationInit } from './common/utils/Postion';
import { Toast, UserAgreeModal } from './components';
import AppRouter from './router';
import { GuideKeys, notificationStore, Storage } from './store';

const App = () => {
    //获取用户协议弹窗
    const [init, setInit] = useState(notificationStore.guides.UserAgreementGuide);
    geolocationInit();
    useRecallUserProfile(); //提前加载数据
    useEffect(() => {
        if (!init) {
            (async function () {
                const agree = await Storage.getItem(GuideKeys.UserAgreementGuide);
                setInit(agree);
            })();
        }
    }, [init]);
    return (
        <View style={styles.contaniner}>
            <StatusBar barStyle="dark-content" backgroundColor={'#F7F7F9'} />
            <AppRouter />
            {!init && <UserAgreeModal />}
            <Toast ref={(ref) => (global.Toast = ref)} />
        </View>
    );
};

const styles = StyleSheet.create({
    contaniner: {
        flex: 1,
        backgroundColor: '#FFF',
    },
});

export default App;

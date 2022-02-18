import { useRoute } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { DefaultTabBar, NavBarHeader, ScrollTabView } from '~/components';
import CategoryOrder from './CategoryOrder';

const CategoryIndex = {
    ALl: 0,
    PAY: 1,
    SHIP: 2,
    RECEIPT: 3,
    COMMENT: 4,
};

export default function index() {
    const router = useRoute();
    const category = router.params?.category || 'ALl';

    return (
        <View style={styles.container}>
            <NavBarHeader title="我的订单" />
            <ScrollTabView
                style={{ flex: 1 }}
                initialPage={CategoryIndex[category]}
                contentProps={{ keyboardShouldPersistTaps: 'always' }}
                renderTabBar={(tabBarProps: any) => (
                    <DefaultTabBar
                        {...tabBarProps}
                        tabUnderlineWidth={24}
                        activeTextStyle={styles.activeTextStyle}
                        inactiveTextStyle={styles.inactiveTextStyle}
                        underlineStyle={styles.underlineStyle}
                    />
                )}>
                <CategoryOrder tabLabel="全部" type="ALl" />
                <CategoryOrder tabLabel="待支付" type="PAY" />
                <CategoryOrder tabLabel="待发货" type="SHIP" />
                <CategoryOrder tabLabel="待收货" type="RECEIPT" />
                <CategoryOrder tabLabel="待评论" type="COMMENT" />
            </ScrollTabView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Theme.groundColour,
    },
    underlineStyle: {
        backgroundColor: Theme.primaryColor,
    },
    activeTextStyle: {
        color: Theme.primaryColor,
        fontSize: font(14),
        fontWeight: 'bold',
    },
    inactiveTextStyle: {
        fontSize: font(12),
    },
});

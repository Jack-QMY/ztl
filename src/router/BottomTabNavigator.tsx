import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import BusinessScreeen from '~/screens/business';
import CarScreeen from '~/screens/car';
import MallScreeen from '~/screens/mall';
import MerchantScreeen from '~/screens/merchant';
import Personage from '~/screens/my';
import BottomTabBar from './BottomTabBar';

const Tab = createBottomTabNavigator();
export default function BottomTabNavigator() {
    return (
        <Tab.Navigator initialRouteName="MallScreeen" lazy={true} tabBar={(props: any) => <BottomTabBar {...props} />}>
            <Tab.Screen
                name="MallScreeen"
                component={MallScreeen}
                options={{
                    tabBarLabel: '召淘商城',
                    headerShown: false,
                    tabBarStyle: {
                        backgroundColor: '#fff',
                    },
                }}
            />
            <Tab.Screen
                name="MerchantScreeen"
                component={MerchantScreeen}
                options={{
                    tabBarLabel: '附近商户',
                    headerShown: false,
                    tabBarStyle: {
                        backgroundColor: '#fff',
                    },
                }}
            />
            <Tab.Screen
                name="BusinessScreeen"
                component={BusinessScreeen}
                options={{
                    tabBarLabel: '召淘云商',
                    headerShown: false,
                    tabBarStyle: {
                        backgroundColor: '#fff',
                    },
                }}
            />
            <Tab.Screen
                name="CarScreeen"
                component={CarScreeen}
                options={{
                    tabBarLabel: '汽车专区',
                    headerShown: false,
                    tabBarStyle: {
                        backgroundColor: '#fff',
                    },
                }}
            />
            <Tab.Screen
                name="Personage"
                component={Personage}
                options={{
                    tabBarLabel: '个人中心',
                    headerShown: false,
                    tabBarStyle: {
                        backgroundColor: '#fff',
                    },
                }}
            />
        </Tab.Navigator>
    );
}

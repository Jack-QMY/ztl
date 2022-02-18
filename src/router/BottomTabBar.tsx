import { CommonActions, useTheme } from '@react-navigation/native';
import React from 'react';
import {
    Animated,
    Dimensions,
    Image,
    LayoutChangeEvent,
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { userStore } from '~/store';
type Props = {
    state: any;
    navigation: any;
    descriptors: any;
    activeBackgroundColor?: any;
    activeTintColor?: any;
    adaptive?: any;
    allowFontScaling?: any;
    inactiveBackgroundColor?: any;
    inactiveTintColor?: any;
    keyboardHidesTabBar?: any;
    labelPosition?: any;
    labelStyle?: any;
    safeAreaInsets?: any;
    showIcon?: any;
    showLabel?: any;
    style?: any;
    tabStyle?: any;
};
const useNativeDriver = Platform.OS !== 'web';
const iconSource = {
    MallScreeen: {
        active: require('~/assets/images/icons/indexHL.png'),
        inactive: require('~/assets/images/icons/index.png'),
    },
    MerchantScreeen: {
        active: require('~/assets/images/icons/findHL.png'),
        inactive: require('~/assets/images/icons/find.png'),
    },
    BusinessScreeen: {
        active: require('~/assets/images/icons/categoryHL.png'),
        inactive: require('~/assets/images/icons/category.png'),
    },
    CarScreeen: {
        active: require('~/assets/images/icons/cartHL.png'),
        inactive: require('~/assets/images/icons/cart.png'),
    },
    Personage: {
        active: require('~/assets/images/icons/userHL.png'),
        inactive: require('~/assets/images/icons/user.png'),
    },
};
export default function BottomTabBar(props: Props) {
    const {
        state,
        navigation,
        descriptors,
        activeTintColor,
        adaptive = true,
        allowFontScaling,
        inactiveBackgroundColor,
        inactiveTintColor,
        keyboardHidesTabBar = false,
        labelPosition,
        labelStyle,
        safeAreaInsets,
        showIcon,
        showLabel,
        style,
        tabStyle,
    } = props;
    const { colors } = useTheme();
    const defaultInsets = useSafeAreaInsets();
    Device.bottomInset = defaultInsets.bottom;

    const focusedRoute = state.routes[state.index];
    const focusedDescriptor = descriptors[focusedRoute.key];
    const focusedOptions = focusedDescriptor.options;

    const [isKeyboardShown, setIsKeyboardShown] = React.useState(false);

    const shouldShowTabBar = focusedOptions.tabBarVisible !== false && !(keyboardHidesTabBar && isKeyboardShown);

    const [isTabBarHidden, setIsTabBarHidden] = React.useState(!shouldShowTabBar);

    const [visible] = React.useState(() => new Animated.Value(shouldShowTabBar ? 1 : 0));
    React.useEffect(() => {
        if (shouldShowTabBar) {
            Animated.timing(visible, {
                toValue: 1,
                duration: 250,
                useNativeDriver,
            }).start(({ finished }) => {
                if (finished) {
                    setIsTabBarHidden(false);
                }
            });
        } else {
            setIsTabBarHidden(true);

            Animated.timing(visible, {
                toValue: 0,
                duration: 200,
                useNativeDriver,
            }).start();
        }
    }, [shouldShowTabBar, visible]);
    const [dimensions, setDimensions] = React.useState(() => {
        const { height = 0, width = 0 } = Dimensions.get('window');

        return { height, width };
    });
    const [layout, setLayout] = React.useState({
        height: 0,
        width: dimensions.width,
    });

    const handleLayout = (e: LayoutChangeEvent) => {
        const { height, width } = e.nativeEvent.layout;

        setLayout((layout) => {
            if (height === layout.height && width === layout.width) {
                return layout;
            } else {
                return {
                    height,
                    width,
                };
            }
        });
    };

    const { routes } = state;
    const insets = {
        top: safeAreaInsets?.top ?? defaultInsets.top,
        right: safeAreaInsets?.right ?? defaultInsets.right,
        bottom: safeAreaInsets?.bottom ?? defaultInsets.bottom,
        left: safeAreaInsets?.left ?? defaultInsets.left,
    };
    const tabBarItems = routes.map((route: any, index: number) => {
        const focused = index === state.index;
        const { options } = descriptors[route.key];
        const color = focused ? activeTintColor : inactiveTintColor;
        const tabBarLabel = descriptors[route.key].options.tabBarLabel || route.name;

        const onPress = () => {
            const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
            });

            // if (!focused && !event.defaultPrevented) {
            //     navigation.dispatch({
            //         ...CommonActions.navigate(route.name),
            //         target: state.key,
            //     });
            // }
            if (!userStore.login && route.name === 'Personage') {
                navigation.navigate('Login');
            } else {
                const event = navigation.emit({
                    type: 'tabPress',
                    target: route.key,
                    canPreventDefault: true,
                });

                if (!focused && !event.defaultPrevented) {
                    navigation.dispatch({
                        ...CommonActions.navigate(route.name),
                        target: state.key,
                    });
                }
            }
        };

        const onLongPress = () => {
            navigation.emit({
                type: 'tabLongPress',
                target: route.key,
            });
        };
        return (
            <TouchableOpacity
                style={styles.tabItem}
                activeOpacity={0.9}
                key={route.key}
                onPress={onPress}
                onLongPress={onLongPress}>
                <TabBarIcon
                    name={route.name}
                    translucent={state.index}
                    focused={focused}
                    activeTintColor={activeTintColor}
                    inactiveTintColor={inactiveTintColor}
                />
                <Text style={[styles.label, { color: focused ? '#FF0000' : '#BBBBBB' }]}>{tabBarLabel}</Text>
            </TouchableOpacity>
        );
    });
    return (
        <Animated.View
            style={[
                styles.bottomTabBar,
                {
                    backgroundColor: colors.color,
                    borderTopColor: colors.border,
                },
                {
                    transform: [
                        {
                            translateY: visible.interpolate({
                                inputRange: [0, 1],
                                outputRange: [layout.height + insets.bottom, 0],
                            }),
                        },
                    ],
                },
                {
                    height: Device.tabBarHeight + insets.bottom,
                    paddingBottom: insets.bottom * 0.9,
                    paddingHorizontal: Math.max(insets.left, insets.right),
                },
                focusedOptions.tabBarStyle,
            ]}
            pointerEvents={isTabBarHidden ? 'none' : 'auto'}>
            <View style={styles.content} onLayout={handleLayout}>
                {tabBarItems}
            </View>
        </Animated.View>
    );
}
function TabBarIcon({ name, focused, translucent, activeTintColor, inactiveTintColor }) {
    return (
        <View style={styles.tabBarIcon}>
            <View style={styles.icon}>
                <Image source={focused ? iconSource[name].active : iconSource[name].inactive} style={styles.iconSize} />
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    bottomTabBar: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        borderTopWidth: StyleSheet.hairlineWidth,
        // elevation: 8,
    },
    hidden: {
        zIndex: -2,
        opacity: 0,
    },
    content: {
        flex: 1,
        flexDirection: 'row',
        position: 'relative',
    },
    tabItem: {
        flex: 1,
        position: 'relative',
        alignSelf: 'stretch',
        alignItems: 'center',
        justifyContent: 'center',
    },
    tabBarIcon: {
        position: 'relative',
        width: pixel(24),
        height: pixel(24),
    },
    icon: {
        position: 'absolute',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '100%',
        minWidth: pixel(26),
    },
    iconSize: {
        width: pixel(20),
        height: pixel(20),
    },
    label: {
        fontSize: font(10),
        marginTop: pixel(2),
    },
});

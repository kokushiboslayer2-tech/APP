import React,{ useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Platform, Settings } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import Home from './Home';
import ChooseHardware from './ChooseHardware';
import SettingsStack from './Setting';
import { Header } from "@react-navigation/stack";

const Tab = createBottomTabNavigator();

const CustomTabBar = ({ state, descriptors, navigation}) => {
    return (
        <View style = {styles.tabBarContainer}>
            {state.routes.map((route, index) => {
                const {options} = descriptors[route.key];
                const label = options.tabBarLabel ?? options.title ?? route.name;
                const isFocused = state.index === index;

                const iconName = 
                    route.name === 'Home'
                        ? 'home-outline'
                        : route.name === 'Add Device'
                        ? 'add-circle'
                        : 'setting-outline';

                const onPress = () => {
                    const event = navigation.emit({ type: 'tabPress', target: route.key });
                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name);
                    }
                };

                const scale = useSharedValue(isFocused ? 1.1 : 1);
                useEffect(() => {
                    scale.value = withTiming(isFocused ? 1.1 : 1, { duration: 300 });
                }, [isFocused]);

                const animatedStyle = useAnimatedStyle(() => ({
                    transform: [{ scale: scale.value}],
                }));

                return (
                    <TouchableOpacity
                     key={index}
                     onPress={onPress}
                     style={styles.tabItem}
                     activeOpacity={0.8}>

                    <Animated.View
                     style={[
                        styles.iconBox,
                        isFocused && styles.activeTab,
                        animatedStyle
                     ]}>

                    <Ionicons 
                     name={iconName}
                     size={28}
                     color={isFocused ? 'white' : 'gray'}/>
                    </Animated.View>
                    <Text style={[styles.tabLabel, isFocused && {color: 'white'}]}>
                        {label}
                    </Text>
                     </TouchableOpacity>
                );
            })}
        </View>
    );
};
const BottomTabs = () => {
    return (
        <Tab.Navigator 
         initialRouteName="Home"
         tabBar ={(props) => <CustomTabBar {...props} />} 
         screenOptions={{ headerShown: false}}>

        <Tab.Screen name="Home" component={Home}/>
        <Tab.Screen name="Add Device" component={ChooseHardware}/>    
        <Tab.Screen name="Settings" component={Settings}/>        
        </Tab.Navigator>
    );
};
const styles = StyleSheet.create({
  tabBarContainer: {
    position: 'absolute',
    left: 2,
    right: 2,
    bottom: Platform.OS === 'ios' ? 30 : 20,
    flexDirection: 'row',
    backgroundColor: '#0f2051',
    marginHorizontal: 20,
    marginBottom: Platform.OS === 'ios' ? 5 : 0,
    borderRadius: 50,
    padding: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 15,
    shadowColor: '#000000',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
  },
  tabItem: {
    alignItems: 'center',
    flex: 1,
  },
  iconBox: {
    padding: 10,
    borderRadius: 25,
    marginTop: 5,
  },
  activeTab: {
    backgroundColor: '#5277f4',
  },
  tabLabel: {
    fontSize: 14,
    marginTop: 8,
    color: '#AAB1C6',
    fontWeight: 'bold',
  },
});

export default BottomTabs;
import React from 'react';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  HomeScreen,
  DiscoverScreen,
  BookmarkScreen,
  Profile, // ✅ Tetap pakai "Profile" sesuai struktur kamu
  DetailScreen,
  AddStretchForm,
  EditStretchForm,
} from '../screens';

import {
  Home2,
  LocationDiscover,
  Receipt21,
  ProfileCircle,
} from 'iconsax-react-native';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function MainTab() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: '#10B981',
        tabBarInactiveTintColor: '#94A3B8',
        tabBarStyle: {
          height: 60,
          paddingBottom: 10,
          paddingTop: 10,
        },
      }}>
      <Tab.Screen
        name="Home Screen"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Home2 color={color} variant={focused ? 'Bold' : 'Linear'} size={24} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Discover Screen"
        component={DiscoverScreen}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <LocationDiscover color={color} variant={focused ? 'Bold' : 'Linear'} size={24} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Bookmark Screen"
        component={BookmarkScreen}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Receipt21 color={color} variant={focused ? 'Bold' : 'Linear'} size={24} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <ProfileCircle color={color} variant={focused ? 'Bold' : 'Linear'} size={24} />
          ),
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
}

export default function Router() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="MainApp" component={MainTab} options={{ headerShown: false }} />

      {/* 📄 DetailScreen */}
      <Stack.Screen
        name="DetailScreen"
        component={DetailScreen}
        options={{
          headerShown: false,
          ...TransitionPresets.SlideFromRightIOS,
        }}
      />

      {/* ➕ AddStretchForm */}
      <Stack.Screen
        name="AddStretchForm"
        component={AddStretchForm}
        options={{
          headerShown: false,
          ...TransitionPresets.SlideFromRightIOS,
        }}
      />

      {/* 📝 EditStretchForm */}
      <Stack.Screen
        name="EditStretchForm"
        component={EditStretchForm}
        options={{
          headerShown: false,
          ...TransitionPresets.SlideFromRightIOS,
        }}
      />
    </Stack.Navigator>
  );
}

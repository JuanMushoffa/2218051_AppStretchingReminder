import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import HomeScreen from './src/screens/HomeScreen';
// import DetailScreen from './src/screens/DetailScreen'; // gunakan ini kalau ingin lihat DetailScreen

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar backgroundColor="#F0FDF4" barStyle="dark-content" />
      <HomeScreen />
      {/* <DetailScreen /> */}
    </SafeAreaView>
  );
}

import React, { useEffect, useRef, useState } from 'react';
import { Animated, View, Text, StyleSheet } from 'react-native';
import { StretchCard } from '../../components';
import { stretchingData } from '../../data';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

export default function DiscoverScreen() {
  const navigation = useNavigation();
  const scrollY = useRef(new Animated.Value(0)).current;
  const diffClampY = Animated.diffClamp(scrollY, 0, 142);
  const recentY = diffClampY.interpolate({
    inputRange: [0, 142],
    outputRange: [0, -142],
    extrapolate: 'clamp',
  });
  const [dataStretch, setDataStretch] = useState([]);
  const [loading, setLoading] = useState(true);
  const getStretch = async () => {
    try {
      const response = await axios.get('https://683b2ad443bb370a8674ea8c.mockapi.io/api/stretch');
      setDataStretch(response.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getStretch();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      {/* Animated Recent Header */}
      <Animated.View
        style={[styles.recentContainer, { transform: [{ translateY: recentY }] }]}>
        <Text style={styles.recentText}>Pilihan Stretching</Text>
        {/* ...nanti bisa isi dengan kategori scroll horizontal */}
      </Animated.View>

      {/* Animated ScrollView */}
      <Animated.ScrollView
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
          useNativeDriver: true,
        })}
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.header}>Eksplorasi Stretching</Text>

        {stretchingData.map(item => (
          <StretchCard
            key={item.id}
            title={item.title}
            date={item.date}
            image={item.image}
            category={item.category}
          />
        ))}
      </Animated.ScrollView>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#294A33',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#294A33',
    marginBottom: 20,
    textAlign: 'center',
  },
  cardWrapper: {
    gap: 16,
  },
  floatingButton: {
    backgroundColor: '#10B981',
    padding: 16,
    borderRadius: 12,
    position: 'absolute',
    right: 24,
    bottom: 24,
    elevation: 6,
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingBottom: 40,
    paddingTop: 142,
    backgroundColor: '#294A33', 
    gap: 16,
  },
  recentContainer: {
    position: 'absolute',
    top: 52,
    left: 0,
    right: 0,
    backgroundColor: '#F0FDF4', 
    zIndex: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  recentText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 12,
  },
  floatingButton: {
    backgroundColor: '#10B981',
    padding: 16,
    borderRadius: 12,
    position: 'absolute',
    right: 24,
    bottom: 24,
    elevation: 6,
  },
});

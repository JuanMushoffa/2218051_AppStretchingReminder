import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Animated,
  TouchableOpacity,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ArrowLeft } from 'iconsax-react-native';
import { deleteStretch } from '../../services/api';
import axios from 'axios';

export default function DetailScreen() {
  const scrollY = useRef(new Animated.Value(0)).current;
  const diffClampY = Animated.diffClamp(scrollY, 0, 52);
  const headerY = diffClampY.interpolate({
    inputRange: [0, 52],
    outputRange: [0, -52],
    extrapolate: 'clamp',
  });
  const bottomBarY = diffClampY.interpolate({
    inputRange: [0, 52],
    outputRange: [0, 52],
    extrapolate: 'clamp',
  });
  const route = useRoute();
  const navigation = useNavigation();
  const { title, image, date, category } = route.params;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const handleDelete = async () => {
    try {
      await deleteStretch(id); // dari route.params
      navigation.goBack();
    } catch (err) {
      Alert.alert('Error', 'Gagal menghapus data.');
    }
  };

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    
   <Animated.ScrollView
      style={{ opacity: fadeAnim }}
      onScroll={Animated.event(
        [{ nativeEvent: { contentOffset: { y: scrollY } } }],
        { useNativeDriver: true }
      )}
      scrollEventThrottle={16}
      contentContainerStyle={styles.scrollContainer}
    >
      <Animated.View style={[styles.header, { transform: [{ translateY: headerY }] }]}>
        <Text style={styles.headerTitle}>Detail Stretching</Text>
      </Animated.View>

      <Text style={styles.title}>{title}</Text>

      <View style={styles.categoryChip}>
        <Text style={styles.categoryText}>{category}</Text>
      </View>

      <Text style={styles.date}>{date}</Text>

      <Image source={{ uri: image }} style={styles.image} />

      <Text style={styles.description}>
        Peregangan ini membantu meredakan ketegangan otot dan cocok dilakukan saat tubuh terasa kaku atau setelah duduk lama. Lakukan perlahan dan bernapas secara teratur.
        {'\n\n'}Stretching memberikan banyak manfaat seperti meningkatkan fleksibilitas, memperbaiki postur tubuh, serta mengurangi risiko cedera saat beraktivitas fisik.
        {'\n\n'}Gerakan ini sangat cocok dilakukan pada pagi hari setelah bangun tidur, atau setelah duduk terlalu lama di depan komputer agar tubuh tetap bugar dan rileks.
        {'\n\n'}Pastikan untuk bernapas dengan baik selama peregangan. Hindari menahan napas agar oksigen tetap mengalir dan membantu relaksasi otot secara optimal.
        {'\n\n'}Lakukan stretching secara rutin minimal 5–10 menit sehari agar manfaatnya terasa lebih optimal untuk tubuh dan pikiran.
        {'\n\n'}Maka dari itu sangat penting melakukan stretching sebentar untuk merilekskan badan dan otot supaya tidak tegang.
        {'\n\n'}Maka dari itu sangat penting melakukan stretching sebentar untuk merilekskan badan dan otot supaya tidak tegang.
        {'\n\n'}Maka dari itu sangat penting melakukan stretching sebentar untuk merilekskan badan dan otot supaya tidak tegang.
        {'\n\n'}Maka dari itu sangat penting melakukan stretching sebentar untuk merilekskan badan dan otot supaya tidak tegang.
      </Text>


      <Animated.View style={[styles.bottomBar, { transform: [{ translateY: bottomBarY }] }]}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <ArrowLeft size={20} color="#fff" />
          <Text style={styles.backText}>Kembali</Text>
        </TouchableOpacity>
      </Animated.View>
    </Animated.ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#294A33',
    gap: 12,
  },
   header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 52,
    backgroundColor: '#10B981',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 8,
  },
  category: {
    fontSize: 14,
    fontWeight: '500',
    fontWeight: 'bold',
    color: '#000000',
  },
  date: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 12,
  },
  image: {
    width: '100%',
    height: 220,
    borderRadius: 12,
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    color: '#374151',
    lineHeight: 24,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 100,
    left: 20,
    right: 20,
    zIndex: 5,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#10B981',
    paddingVertical: 12,
    borderRadius: 10,
    gap: 8,
  },
  backText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  categoryChip: {
    alignSelf: 'flex-start',
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    marginBottom: 4,
  },
  categoryText: {
    color: '#10B981',
    fontWeight: '600',
    fontSize: 14,
  },
  scrollContainer: {
    paddingTop: 72,
    paddingHorizontal: 20,
    paddingBottom: 100,
    backgroundColor: '#F0FDF4',
  },
});

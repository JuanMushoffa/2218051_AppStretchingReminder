import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';

export default function DetailScreen() {
  // Nanti datanya bisa dikirim lewat navigasi
  const dummyDetail = {
    title: 'Peregangan Leher & Bahu',
    date: '30 Mei 2025',
    image: 'https://images.unsplash.com/photo-1605296867304-46d5465a13f1',
    description:
      'Peregangan ini membantu mengurangi ketegangan di bagian leher dan bahu. Cocok dilakukan setelah bekerja seharian atau sebelum tidur.',
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: dummyDetail.image }} style={styles.image} />

      <View style={styles.content}>
        <Text style={styles.title}>{dummyDetail.title}</Text>
        <Text style={styles.date}>{dummyDetail.date}</Text>
        <Text style={styles.description}>{dummyDetail.description}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#F0FDF4',
  },
  image: {
    width: '100%',
    height: 220,
    borderRadius: 12,
    marginBottom: 20,
  },
  content: {
    gap: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1E293B',
  },
  date: {
    fontSize: 14,
    color: '#6B7280',
  },
  description: {
    fontSize: 16,
    color: '#374151',
    lineHeight: 24,
  },
});

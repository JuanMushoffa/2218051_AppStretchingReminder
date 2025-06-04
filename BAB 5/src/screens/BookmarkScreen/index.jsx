import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function BookmarkScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bookmark Stretching</Text>
      <Text style={styles.message}>Belum ada gerakan yang kamu bookmark.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#294A33',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  message: {
    fontSize: 14,
    color: '#64748B',
    textAlign: 'center',
  },
});

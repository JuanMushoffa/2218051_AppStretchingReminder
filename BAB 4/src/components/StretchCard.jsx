import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const StretchCard = ({ title, date, image }) => {
  return (
    <View style={styles.card}>
      <Image source={{ uri: image }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.date}>{date}</Text>
      </View>
    </View>
  );
};

export default StretchCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    elevation: 3,
  },
  image: {
    height: 150,
    width: '100%',
  },
  content: {
    padding: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
  },
  date: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 4,
  },
});

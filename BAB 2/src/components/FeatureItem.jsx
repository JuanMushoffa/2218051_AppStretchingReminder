import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View, Image } from 'react-native';

const FeatureItem = ({ feature, onPress }) => {
  return (
    <TouchableOpacity style={styles.item} onPress={onPress}>
      <View style={styles.row}>
        <Image source={feature.icon} style={styles.icon} resizeMode="contain" />
        <View style={styles.textContainer}>
          <Text style={styles.title}>{feature.title}</Text>
          <Text style={styles.description}>{feature.description}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default FeatureItem;

const styles = StyleSheet.create({
  item: {
    backgroundColor: 'white',
    padding: 15,
    marginBottom: 15,
    borderRadius: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center', // ini supaya icon dan text rata tengah
  },
  icon: {
    width: 32,
    height: 32,
    marginRight: 15,
  },
  textContainer: {
    flex: 1, // supaya teks tidak overflow
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#388E3C',
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
});

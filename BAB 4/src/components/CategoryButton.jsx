import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const CategoryButton = ({ title, active, onPress }) => {
  return (
    <TouchableOpacity
      style={[styles.button, active && styles.active]}
      onPress={onPress}>
      <Text style={[styles.text, active && styles.activeText]}>{title}</Text>
    </TouchableOpacity>
  );
};

export default CategoryButton;

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#E5E7EB',
    marginRight: 10,
  },
  active: {
    backgroundColor: '#10B981',
  },
  text: {
    color: '#374151',
    fontSize: 14,
  },
  activeText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

import React from 'react';
import { ScrollView, Image, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const CarouselImages = ({ images }) => {
  return (
    <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false}>
      {images.map((img, idx) => (
        <Image key={idx} source={{ uri: img }} style={styles.image} />
      ))}
    </ScrollView>
  );
};

export default CarouselImages;

const styles = StyleSheet.create({
  image: {
    width: width - 40,
    height: 180,
    borderRadius: 12,
    marginRight: 16,
    marginBottom: 24,
  },
});

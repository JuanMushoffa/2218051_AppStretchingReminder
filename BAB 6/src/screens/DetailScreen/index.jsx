import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ArrowLeft } from 'iconsax-react-native';

export default function DetailScreen() {
  const navigation = useNavigation();
  const route = useRoute();

  const { title, image, date, category } = route.params;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.category}>Kategori :</Text>
      {category ? (
        <View style={styles.categoryChip}>
          <Text style={styles.categoryText}>{category}</Text>
        </View>
      ) : null}
      <Text style={styles.date}>{date}</Text>

      <Image source={{ uri: image }} style={styles.image} />

      <Text style={styles.description}>
        Peregangan ini membantu meredakan ketegangan otot dan cocok dilakukan saat tubuh terasa kaku atau setelah duduk lama. Lakukan perlahan dan bernapas secara teratur.
      </Text>

      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <ArrowLeft size={20} color="#fff" />
        <Text style={styles.backText}>Kembali</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#294A33',
    gap: 12,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  category: {
    fontSize: 14,
    fontWeight: '500',
    fontWeight: 'bold',
    color: '#000000',
  },
  date: {
    fontSize: 12,
    color: '#FFFFFF',
  },
  image: {
    width: '100%',
    height: 220,
    borderRadius: 12,
    marginTop: 8,
  },
  description: {
    fontSize: 16,
    color: '#FFFFFF',
    lineHeight: 24,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#10B981',
    paddingVertical: 12,
    borderRadius: 10,
    marginTop: 24,
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
  marginBottom: 8,
},
categoryText: {
  color: '#10B981',
  fontWeight: '600',
  fontSize: 14,
},


});

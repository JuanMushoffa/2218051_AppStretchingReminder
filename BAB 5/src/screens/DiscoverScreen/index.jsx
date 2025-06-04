import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { StretchCard } from '../../components';
import { stretchingData } from '../../data';
import { useNavigation } from '@react-navigation/native';
import { Edit } from 'iconsax-react-native';


export default function DiscoverScreen() {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.header}>Eksplorasi Stretching</Text>
        <View style={styles.cardWrapper}>
          {stretchingData.map(item => (
            <StretchCard
              key={item.id}
              title={item.title}
              date={item.date}
              image={item.image}
              category={item.category}
            />
          ))}
        </View>
      </ScrollView>

      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => navigation.navigate('AddStretchForm')}>
        <Edit color="#fff" size={24} />
      </TouchableOpacity>
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
    color: '#FFFFFF',
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
});

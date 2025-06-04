import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TextInput,
  Pressable,
} from 'react-native';
import { SearchNormal, Category2, Global } from 'iconsax-react-native';
import { StretchCard, CategoryButton } from '../../components';
import { stretchingData, categories } from '../../data';
import axios from 'axios';

export default function HomeScreen() {
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [search, setSearch] = useState('');
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

  const filteredStretch = stretchingData.filter(item => {
    const cocokKategori =
      selectedCategory === 'Semua' || item.category === selectedCategory;
    const cocokPencarian = item.title
      .toLowerCase()
      .includes(search.toLowerCase());
    return cocokKategori && cocokPencarian;
  });
  
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Stretch Reminder</Text>

      {/* Search */}
      <View style={styles.searchWrapper}>
        <TextInput
          placeholder="Cari stretching..."
          placeholderTextColor="#A7F3D0"
          style={styles.searchInput}
          value={search}
          onChangeText={setSearch}
        />
        <Pressable style={styles.searchButton}>
          <SearchNormal size={20} color="#fff" />
        </Pressable>
      </View>

            {/* Reminder Section */}
      <View style={styles.reminderBox}>
        <Text style={styles.reminderEmoji}>⏰</Text>
        <View style={styles.reminderContent}>
          <Text style={styles.reminderTitle}>Sudahkah kamu stretching hari ini?</Text>
          <Text style={styles.reminderSubtitle}>
            Ayo luangkan waktu 5 menit untuk tubuhmu!
          </Text>
        </View>
      </View>


      {/* Section: Kategori */}
      <View style={styles.sectionHeader}>
        <Category2 size={20} color="#fff" style={styles.icon} />
        <Text style={styles.sectionTitle}>Kategori</Text>
      </View>
      <View style={styles.categoryWrapper}>
        {categories.map(cat => (
          <CategoryButton
            key={cat}
            title={cat}
            active={cat === selectedCategory}
            onPress={() => setSelectedCategory(cat)}
          />
        ))}
      </View>

      {/* Section: Daftar Stretching */}
      <View style={styles.sectionHeader}>
        <Global size={20} color="#fff" style={styles.icon} />
        <Text style={styles.sectionTitle}>Rekomendasi Gerakan</Text>
      </View>
      <View style={styles.cardWrapper}>
        {filteredStretch.map(item => (
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
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#294A33', 
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginVertical: 20,
  },
  searchWrapper: {
    flexDirection: 'row',
    backgroundColor: '#3D6650',
    borderRadius: 10,
    alignItems: 'center',
    paddingHorizontal: 12,
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 10,
    fontSize: 16,
    color: '#FFFFFF',
  },
  searchButton: {
    backgroundColor: '#10B981',
    padding: 10,
    borderRadius: 8,
    marginLeft: 8,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 8,
  },
  icon: {
    marginRight: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF', 
  },
  categoryWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 24,
  },
  cardWrapper: {
    gap: 16,
  },
    reminderBox: {
    backgroundColor: '#3D6650',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    flexDirection: 'row',
    alignItems: 'center',
  },
  reminderEmoji: {
    fontSize: 32,
    marginRight: 12,
  },
  reminderContent: {
    flex: 1,
  },
  reminderTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  reminderSubtitle: {
    fontSize: 14,
    color: '#D1FAE5',
  },

});

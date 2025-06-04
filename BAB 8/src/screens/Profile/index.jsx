import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { getFirestore, collection, onSnapshot } from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { Edit, ProfileAdd } from 'iconsax-react-native';
import StretchCard from '../../components/StretchCard';

export default function Profile() {
  const navigation = useNavigation();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const db = getFirestore();
    const unsubscribe = onSnapshot(collection(db, 'stretch'), snapshot => {
      const result = [];
      snapshot.forEach(doc => {
        result.push({ id: doc.id, ...doc.data() });
      });
      setPosts(result.reverse());
    });

    return () => unsubscribe();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: '#F0FDF4' }}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Foto Profil */}
        <View style={styles.avatarWrapper}>
          <Image
            source={{ uri: 'https://i.pravatar.cc/150?img=10' }}
            style={styles.avatar}
          />
        </View>

        {/* Info Personal */}
        <View style={styles.infoBox}>
          <Text style={styles.name}>Juan Mushoffa Aris</Text>
          <Text style={styles.personal}>Tanggal Lahir : 12 Juni 2000</Text>
          <Text style={styles.personal}>Umur : 20 tahun</Text>
          <Text style={styles.personal}>Pekerjaan : Mahasiswa</Text>
        </View>

        {/* Info Daily */}
        <View style={styles.infoBox}>
          <Text style={styles.sectionTitle}>Kebiasaan Harian</Text>
          <Text style={styles.personal}>Favorit Stretching : Punggung</Text>
          <Text style={styles.personal}>Durasi Harian : 15 menit</Text>
          <Text style={styles.personal}>Hobi : Yoga, Membaca</Text>
        </View>

        {/* Postingan */}
        <View style={styles.sectionHeader}>
          <ProfileAdd size={20} color="#fff" style={styles.icon} />
          <Text style={styles.sectionTitle}>Postingan Saya</Text>
        </View>
        <View style={styles.cardWrapper}>
          {posts.map(item => (
            <StretchCard
              key={item.id}
              id={item.id}
              title={item.title}
              date={item.date}
              image={item.image}
              category={item.category}
              description={item.description}
              isBookmarked={item.isBookmarked}
            />
          ))}
        </View>
      </ScrollView>

      {/* Floating Add Button */}
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => navigation.navigate('AddStretchForm')}>
        <Edit size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#294A33', 
    padding: 20,
    paddingBottom: 100,
  },
  avatarWrapper: {
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 10,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  infoBox: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 10,
    marginBottom: 16,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E293B',
    textAlign: 'center',
    marginBottom: 8,
  },
  personal: {
    fontSize: 14,
    color: '#4B5563',
    marginBottom: 4,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 1,
    gap: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  cardWrapper: {
    gap: 16,
    marginTop: 10,
  },
  floatingButton: {
    backgroundColor: '#10B981',
    padding: 16,
    borderRadius: 50,
    position: 'absolute',
    right: 24,
    bottom: 24,
    elevation: 6,
  },
});

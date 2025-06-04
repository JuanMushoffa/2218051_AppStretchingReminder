import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { StretchCard } from '../../components';
import { DocumentText } from 'iconsax-react-native';

export default function ProfileScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Foto */}
      <View style={styles.photoWrapper}>
        <Image
          source={{ uri: 'https://randomuser.me/api/portraits/women/68.jpg' }}
          style={styles.photo}
        />
      </View>

      {/* Personal Info */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Personal</Text>
        <View style={styles.infoItem}>
          <Text style={styles.label}>Nama</Text>
          <Text style={styles.value}>Sarah Wijaya</Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.label}>Tanggal Lahir</Text>
          <Text style={styles.value}>12 Mei 1998</Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.label}>Umur</Text>
          <Text style={styles.value}>27 tahun</Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.label}>Pekerjaan</Text>
          <Text style={styles.value}>Desainer UI/UX</Text>
        </View>
      </View>

      {/* Daily Info */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Daily</Text>
        <View style={styles.infoItem}>
          <Text style={styles.label}>Favorit Stretching</Text>
          <Text style={styles.value}>Leher & Punggung</Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.label}>Durasi Harian</Text>
          <Text style={styles.value}>10 menit</Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.label}>Hobi</Text>
          <Text style={styles.value}>Yoga, Musik, Membaca</Text>
        </View>
      </View>

      <View style={styles.postSection}>
        <View style={styles.postHeader}>
          <DocumentText size={20} color="#FFFFFF" />
          <Text style={styles.postTitle}>Postingan Saya</Text>
        </View>

        <View style={styles.cardWrapper}>
          <StretchCard
            title="Peregangan Leher di Pagi Hari"
            date="01 Juni 2025"
            image="https://images.unsplash.com/photo-1593941707882-a5bba14938c7"
            category="Leher"
          />
          <StretchCard
            title="Stretching Kaki Sebelum Tidur"
            date="30 Mei 2025"
            image="https://images.unsplash.com/photo-1526401485004-2fa806b5c2b3"
            category="Kaki"
          />
        </View>
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#294A33',
    padding: 20,
    paddingBottom: 40,
  },
  photoWrapper: {
    alignItems: 'center',
    marginBottom: 24,
  },
  photo: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: '#10B981',
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    marginBottom: 20,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 12,
  },
  infoItem: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  label: {
    fontWeight: 'bold',
    color: '#374151',
    width: 150,
  },
  value: {
    color: '#374151',
  },
  postSection: {
  marginTop: 20,
  paddingHorizontal: 20,
  },
  postHeader: {
  flexDirection: 'row',
  alignItems: 'center',
  gap: 8,
  marginBottom: 16,
  },
  postTitle: {
  fontSize: 16,
  fontWeight: '600',
  color: '#FFFFFF',
  },
  cardWrapper: {
  gap: 16,
  },
});

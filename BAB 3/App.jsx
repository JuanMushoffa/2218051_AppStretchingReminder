import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';
import FeatureItem from './components/FeatureItem'; // Import komponen kecil

const features = [
  { id: '1', title: 'Pengingat Reguler', description: 'Atur jadwal peregangan rutin.', icon: require('./assets/reminder.png') },
  { id: '2', title: 'Daftar Gerakan & Durasi', description: 'Lihat dan pilih gerakan stretching.', icon: require('./assets/stretching.png') },
  { id: '3', title: 'Personalisasi Target', description: 'Tentukan target dan tingkat kesulitan.', icon: require('./assets/target.png') },
  { id: '4', title: 'Custom Reminder', description: 'Setel pengingat sesuai kebutuhanmu.', icon: require('./assets/custom.png') },
  { id: '5', title: 'Statistik & Progress', description: 'Lacak progress stretchingmu.', icon: require('./assets/stats.png') },
  { id: '6', title: 'Tips Kesehatan', description: 'Dapatkan tips kesehatan setiap hari.', icon: require('./assets/tips.png') },
  { id: '7', title: 'Integrasi Kalender', description: 'Sinkronkan dengan kalender pribadimu.', icon: require('./assets/calendar.png') },
  { id: '8', title: 'Notifikasi Ramah', description: 'Pengingat yang ramah dan memotivasi.', icon: require('./assets/notification.png') },
];

const StretchReminderApp = () => {
  const [selectedFeature, setSelectedFeature] = useState(null);

  const handlePressFeature = (feature) => {
    setSelectedFeature(feature);
    console.log('Fitur dipilih:', feature.title);
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('./assets/header_stretching.png')} // Gambar besar di atas
        style={styles.headerImage}
        resizeMode="contain"
      />

      <Text style={styles.title}>Stretching Reminder</Text>
      <Text style={styles.subtitle}>Pilih fitur untuk mulai</Text>

      <FlatList
        data={features}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <FeatureItem feature={item} onPress={() => handlePressFeature(item)} />
        )}
        contentContainerStyle={styles.listContainer}
      />

      {selectedFeature && (
        <View style={styles.detailBox}>
          <Text style={styles.detailTitle}>Kamu memilih:</Text>
          <Text style={styles.detailFeature}>{selectedFeature.title}</Text>
        </View>
      )}
    </View>
  );
};

export default StretchReminderApp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8F5E9',
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  headerImage: {
    width: '100%',
    height: 180,
    marginBottom: 10,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 5,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#4CAF50',
    marginBottom: 20,
    textAlign: 'center',
  },
  listContainer: {
    paddingBottom: 100,
  },
  detailBox: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#C8E6C9',
    borderRadius: 10,
  },
  detailTitle: {
    fontSize: 16,
    color: '#1B5E20',
  },
  detailFeature: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1B5E20',
  },
});

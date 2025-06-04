import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { ArrowLeft } from 'iconsax-react-native';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';

export default function AddStretchForm() {
  const navigation = useNavigation();

  const [judul, setJudul] = useState('');
  const [kategori, setKategori] = useState('');
  const [tanggal, setTanggal] = useState('');
  const [gambar, setGambar] = useState('');

  const handleSubmit = () => {
    console.log('Data Stretch Ditambahkan:');
    console.log({ judul, kategori, tanggal, gambar });
    // Di materi hanya mencetak ke console
    // Kamu bisa tambah ke state/global/AsyncStorage nanti
  };

  return (
    <ScrollView style={styles.container}>
      {/* Back Button */}

      <Text style={styles.title}>Tambah Data Stretching</Text>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Judul</Text>
        <TextInput
          style={styles.input}
          value={judul}
          onChangeText={setJudul}
          placeholder="Masukkan judul"
        />
      </View>

      <Text style={styles.label}>Kategori</Text>
        <View style={styles.pickerWrapper}>
        <Picker
            selectedValue={kategori}
            onValueChange={(itemValue) => setKategori(itemValue)}
            style={styles.picker}>
            <Picker.Item label="Pilih kategori" value="" />
            <Picker.Item label="Leher" value="Leher" />
            <Picker.Item label="Kaki" value="Kaki" />
            <Picker.Item label="Tangan" value="Tangan" />
            <Picker.Item label="Bahu" value="Bahu" />
            <Picker.Item label="Punggung" value="Punggung" />
        </Picker>
        </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Tanggal</Text>
        <TextInput
          style={styles.input}
          value={tanggal}
          onChangeText={setTanggal}
          placeholder="Contoh : 30 Mei 2025"
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Gambar (URL)</Text>
        <TextInput
          style={styles.input}
          value={gambar}
          onChangeText={setGambar}
          placeholder="https://..."
        />
      </View>

      <View style={styles.buttonWrapper}>
        <Button title="Submit" onPress={handleSubmit} color="#10B981" />
      </View>

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
    flex: 1,
  },
  backButton: {
    marginBottom: 16,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DCFCE7',
    borderRadius: 8,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 24,
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    color: '#FFFFFF',
  },
  input: {
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 8,
    padding: 12,
    backgroundColor: '#FFFFFF',
  },
  buttonWrapper: {
    marginTop: 20,
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
  pickerWrapper: {
  borderWidth: 1,
  borderColor: '#CBD5E1',
  borderRadius: 8,
  backgroundColor: '#FFFFFF',
  height: 48, // tambahkan tinggi yang cukup
  justifyContent: 'center', // agar picker vertical center
  marginBottom: 20,
},
  picker: {
  width: '100%',
  height: 48, // samakan tinggi dengan input
  color: '#0F172A',
  fontSize: 16,
  },

});

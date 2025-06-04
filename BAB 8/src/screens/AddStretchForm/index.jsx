import React, { useState } from 'react';
import {
  View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Alert,
} from 'react-native';
import { getFirestore, collection, addDoc, serverTimestamp } from '@react-native-firebase/firestore';
import { Picker } from '@react-native-picker/picker';
import { ArrowLeft } from 'iconsax-react-native';
import { useNavigation } from '@react-navigation/native';

export default function AddStretchForm() {
  const navigation = useNavigation();

  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [image, setImage] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async () => {
    if (!title || !date || !image || !category || !description) {
      Alert.alert('Lengkapi semua data!');
      return;
    }

    try {
      const db = getFirestore();
      await addDoc(collection(db, 'stretch'), {
        title,
        date,
        image,
        category,
        description,
        createdAt: serverTimestamp(),
        isBookmarked: false,
      });
      navigation.goBack();
    } catch (err) {
      Alert.alert('Gagal Menyimpan', err.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>Judul</Text>
      <TextInput style={styles.input} value={title} onChangeText={setTitle} />

      <Text style={styles.label}>Tanggal</Text>
      <TextInput style={styles.input} value={date} onChangeText={setDate} />

      <Text style={styles.label}>Gambar (URL)</Text>
      <TextInput style={styles.input} value={image} onChangeText={setImage} />

      <Text style={styles.label}>Kategori</Text>
      <View style={styles.pickerWrapper}>
        <Picker
          selectedValue={category}
          onValueChange={setCategory}
          style={styles.picker}>
          <Picker.Item label="Pilih kategori" value="" />
          <Picker.Item label="Leher" value="Leher" />
          <Picker.Item label="Kaki" value="Kaki" />
          <Picker.Item label="Tangan" value="Tangan" />
          <Picker.Item label="Bahu" value="Bahu" />
          <Picker.Item label="Punggung" value="Punggung" />
        </Picker>
      </View>

      <Text style={styles.label}>Deskripsi</Text>
      <TextInput
        style={[styles.input, { height: 120 }]}
        multiline
        value={description}
        onChangeText={setDescription}
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Simpan Stretch</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.button} >
        <ArrowLeft size={20} color="#fff" />
        <Text style={styles.backText}>Kembali</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  label: { fontWeight: 'bold', marginTop: 12, color: '#1E293B' },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#CBD5E1',
    marginBottom: 8,
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 8,
    backgroundColor: '#fff',
    marginBottom: 8,
  },
  picker: { height: 48, width: '100%' },
  button: {
    backgroundColor: '#10B981',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});

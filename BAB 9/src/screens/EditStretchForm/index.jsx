import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { getFirestore, doc, updateDoc, getDoc } from '@react-native-firebase/firestore';
import { Picker } from '@react-native-picker/picker';
import { ArrowLeft } from 'iconsax-react-native';

export default function EditStretchForm() {
  const navigation = useNavigation();
  const route = useRoute();
  const { id } = route.params;

  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [image, setImage] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    const fetchStretch = async () => {
      try {
        const ref = doc(getFirestore(), 'stretch', id);
        const docSnap = await getDoc(ref);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setTitle(data.title);
          setDate(data.date);
          setImage(data.image);
          setCategory(data.category);
          setDescription(data.description);
        }
      } catch (err) {
        Alert.alert('Gagal mengambil data', err.message);
      }
    };

    fetchStretch();
  }, [id]);

  const handleUpdate = async () => {
    if (!title || !date || !image || !category || !description) {
      Alert.alert('Lengkapi semua data!');
      return;
    }

    try {
      const ref = doc(getFirestore(), 'stretch', id);
      await updateDoc(ref, {
        title,
        date,
        image,
        category,
        description,
      });
      Alert.alert('Berhasil diubah!');
      navigation.goBack();
    } catch (err) {
      Alert.alert('Gagal mengubah', err.message);
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

      <TouchableOpacity style={styles.button} onPress={handleUpdate}>
        <Text style={styles.buttonText}>Simpan Perubahan</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.button} >
        <ArrowLeft size={20} color="#fff" />
        <Text style={styles.backText}>Kembali</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#F0FDF4',
  },
  label: {
    fontWeight: 'bold',
    marginTop: 12,
    color: '#1E293B',
  },
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
  picker: {
    height: 48,
    width: '100%',
  },
  button: {
    backgroundColor: '#10B981',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

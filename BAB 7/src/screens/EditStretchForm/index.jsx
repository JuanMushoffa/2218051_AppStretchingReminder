import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';

export default function EditStretchForm() {
  const navigation = useNavigation();
  const route = useRoute();
  const { id } = route.params;

  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [image, setImage] = useState('');
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const res = await axios.get(`https://683b2ad443bb370a8674ea8c.mockapi.io/api/stretch/${id}`);
      const data = res.data;
      setTitle(data.title);
      setDate(data.date);
      setImage(data.image);
      setCategory(data.category);
    } catch (err) {
      Alert.alert('Gagal mengambil data', err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleUpdate = async () => {
    if (!title || !date || !image || !category) {
      Alert.alert('Lengkapi semua field!');
      return;
    }

    try {
      setLoading(true);
      await axios.put(`https://683b2ad443bb370a8674ea8c.mockapi.io/api/stretch/${id}`, {
        title,
        date,
        image,
        category,
      });
      Alert.alert('Berhasil diubah');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Gagal mengupdate', error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#10B981" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Judul</Text>
      <TextInput
        value={title}
        onChangeText={setTitle}
        placeholder="Masukkan judul"
        style={styles.input}
      />

      <Text style={styles.label}>Tanggal</Text>
      <TextInput
        value={date}
        onChangeText={setDate}
        placeholder="Contoh : 01 Juni 2025"
        style={styles.input}
      />

      <Text style={styles.label}>Gambar (URL)</Text>
      <TextInput
        value={image}
        onChangeText={setImage}
        placeholder="Link gambar"
        style={styles.input}
      />

      <Text style={styles.label}>Kategori</Text>
      <View style={styles.pickerWrapper}>
        <Picker
          selectedValue={category}
          onValueChange={(itemValue) => setCategory(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Pilih kategori" value="" />
          <Picker.Item label="Leher" value="Leher" />
          <Picker.Item label="Kaki" value="Kaki" />
          <Picker.Item label="Tangan" value="Tangan" />
          <Picker.Item label="Bahu" value="Bahu" />
          <Picker.Item label="Punggung" value="Punggung" />
        </Picker>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleUpdate}>
        <Text style={styles.buttonText}>Simpan Perubahan</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F0FDF4',
    flex: 1,
    padding: 20,
  },
  label: {
    fontWeight: 'bold',
    marginTop: 12,
    marginBottom: 4,
    color: '#1E293B',
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#CBD5E1',
  },
  pickerWrapper: {
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#CBD5E1',
    marginBottom: 16,
  },
  picker: {
    height: 48,
    width: '100%',
  },
  button: {
    backgroundColor: '#10B981',
    paddingVertical: 14,
    borderRadius: 10,
    marginTop: 24,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

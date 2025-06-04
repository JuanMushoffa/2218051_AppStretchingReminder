import React, { useState } from 'react';
import {
  View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Alert,
} from 'react-native';
import { getFirestore, collection, addDoc, serverTimestamp } from '@react-native-firebase/firestore';
import { Picker } from '@react-native-picker/picker';
import { ArrowLeft } from 'iconsax-react-native';
import notifee, { AndroidImportance } from '@notifee/react-native';
import { useNavigation } from '@react-navigation/native';

export default function AddStretchForm() {
  const navigation = useNavigation();

  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [image, setImage] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const delayOptions = [
  { id: 0, name: 'Langsung' },
  { id: 10, name: 'Setelah 10 Detik' },
  { id: 30, name: 'Setelah 30 Detik' },
  ];
  const [selectedDelay, setSelectedDelay] = useState(delayOptions[0]);
  const [loading, setLoading] = useState(false);

  const submitToFirebase = async () => {
    try {
      setLoading(true);
      const db = getFirestore();
      await addDoc(collection(db, 'stretch'), {
        title,
        date,
        image,
        category,
        description,
        createdAt: new Date(),
        isBookmarked: false,
      });
    } finally {
      setLoading(false);
    }
  };


  const handleDelayedUpload = async (delay) => {
    setLoading(true);
    const channelId = await notifee.createChannel({
      id: 'stretch-reminder',
      name: 'Stretch Notification',
      importance: AndroidImportance.HIGH,
    });

    await notifee.displayNotification({
      title: `Stretch akan ditambahkan`,
      body: `Stretch akan diunggah dalam ${delay} detik`,
      android: {
        channelId,
      },
    });

    setTimeout(async () => {
      await submitToFirebase();
      setLoading(false);
      await notifee.displayNotification({
        title: 'Berhasil!',
        body: `${title} berhasil ditambahkan.`,
        android: { channelId },
      });
      navigation.goBack();
    }, delay * 1000);
  };


  const handleSubmit = async () => {
    if (!title || !date || !image || !category || !description) {
    Alert.alert('Lengkapi semua data!');
    return;
    }
    if (selectedDelay.id === 0) {
      setLoading(true);
      await submitToFirebase();
      setLoading(false);
      Alert.alert('Sukses', 'Stretch berhasil ditambahkan!');
      navigation.goBack();
    } else {
      await handleDelayedUpload(selectedDelay.id);
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
      {loading && (
        <View style={styles.overlay}>
          <Text style={styles.loadingText}>Mengunggah Stretching...</Text>
        </View>
      )}

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
      <Text style={styles.label}>Kapan ingin upload?</Text>
      <View style={styles.pickerWrapper}>
        <Picker
          selectedValue={selectedDelay}
          onValueChange={(itemValue) => setSelectedDelay(itemValue)}
          style={styles.picker}>
          {delayOptions.map(option => (
            <Picker.Item key={option.id} label={option.name} value={option} />
          ))}
        </Picker>
      </View>

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
  overlay: {
  position: 'absolute',
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
  backgroundColor: 'rgba(0,0,0,0.4)',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 99,
  },
  loadingText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    backgroundColor: '#10B981',
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 8,
    overflow: 'hidden',
  },
});

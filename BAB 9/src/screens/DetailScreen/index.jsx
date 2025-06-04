import React, { useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Animated,
  Alert,
  ScrollView,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ArrowLeft, Edit, Trash, Bookmark } from 'iconsax-react-native';
import {
  doc,
  deleteDoc,
  updateDoc,
  getFirestore,
} from '@react-native-firebase/firestore';

export default function DetailScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const {
    id,
    title,
    date,
    image,
    category,
    description,
    isBookmarked = false,
  } = route.params;

  // Animasi Scroll Header & Bottom
  const scrollY = useRef(new Animated.Value(0)).current;
  const diffClampY = Animated.diffClamp(scrollY, 0, 52);

  const headerY = diffClampY.interpolate({
    inputRange: [0, 52],
    outputRange: [0, -52],
  });

  const bottomY = diffClampY.interpolate({
    inputRange: [0, 52],
    outputRange: [0, 52],
  });

  // Bookmark toggle
  const toggleBookmark = async () => {
    try {
      const db = getFirestore();
      const ref = doc(db, 'stretch', id);
      await updateDoc(ref, {
        isBookmarked: !isBookmarked,
      });
      Alert.alert('Berhasil', `Bookmark ${!isBookmarked ? 'ditambahkan' : 'dihapus'}`);
    } catch (err) {
      Alert.alert('Gagal bookmark', err.message);
    }
  };

  const handleDelete = () => {
    Alert.alert('Hapus?', 'Yakin ingin menghapus data ini?', [
      { text: 'Batal' },
      {
        text: 'Hapus',
        onPress: async () => {
          try {
            await deleteDoc(doc(getFirestore(), 'stretch', id));
            Alert.alert('Berhasil dihapus');
            navigation.goBack();
          } catch (err) {
            Alert.alert('Gagal menghapus', err.message);
          }
        },
      },
    ]);
  };

  return (
    <View style={{ flex: 1 }}>
      {/* Header */}
      <Animated.View style={[styles.header, { transform: [{ translateY: headerY }] }]}>
        <Text style={styles.headerTitle}>Detail Stretching</Text>
      </Animated.View>

      {/* Konten */}
      <Animated.ScrollView
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>{title}</Text>

        <View style={styles.categoryChip}>
          <Text style={styles.categoryText}>{category}</Text>
        </View>

        <Text style={styles.date}>{date}</Text>

        <Image source={{ uri: image }} style={styles.image} />

        <Text style={styles.descriptionTitle}>Deskripsi</Text>
        <Text style={styles.description}>{description}</Text>
      </Animated.ScrollView>

      {/* Bottom Bar */}
      <Animated.View style={[styles.bottomBar, { transform: [{ translateY: bottomY }] }]}>
        <View style={styles.actions}>
          <TouchableOpacity onPress={toggleBookmark} style={styles.actionBtn}>
            <Bookmark
              size={20}
              variant={isBookmarked ? 'Bold' : 'Linear'}
              color="#fff"
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('EditStretchForm', { id })}
            style={[styles.actionBtn, { backgroundColor: '#FBBF24' }]}
          >
            <Edit size={20} color="#fff" />
          </TouchableOpacity>

          <TouchableOpacity onPress={handleDelete} style={[styles.actionBtn, { backgroundColor: '#EF4444' }]}>
            <Trash size={20} color="#fff" />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <ArrowLeft size={20} color="#fff" />
            <Text style={styles.backText}>Kembali</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    paddingHorizontal: 20,
    paddingTop: 72,
    paddingBottom: 120,
    backgroundColor: '#F0FDF4',
  },
  header: {
    height: 52,
    backgroundColor: '#10B981',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    zIndex: 10,
  },
  headerTitle: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 4,
  },
  categoryChip: {
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  categoryText: {
    color: '#10B981',
    fontSize: 13,
    fontWeight: '600',
  },
  date: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 12,
  },
  image: {
    width: '100%',
    height: 220,
    borderRadius: 12,
    marginBottom: 16,
  },
  descriptionTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 8,
    color: '#1E293B',
  },
  description: {
    fontSize: 15,
    color: '#374151',
    lineHeight: 22,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    padding: 16,
    left: 0,
    right: 0,
    backgroundColor: '#10B981',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  actionBtn: {
    backgroundColor: '#16A34A',
    padding: 12,
    borderRadius: 10,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#059669',
    borderRadius: 10,
  },
  backText: {
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 6,
  },
});

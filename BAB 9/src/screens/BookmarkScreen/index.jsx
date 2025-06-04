import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import { getFirestore, collection, onSnapshot, query, where } from '@react-native-firebase/firestore';
import StretchCard from '../../components/StretchCard';

export default function BookmarkScreen() {
  const [bookmarkedData, setBookmarkedData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const db = getFirestore();
    const q = query(collection(db, 'stretch'), where('isBookmarked', '==', true));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = [];
      snapshot.forEach(doc => {
        data.push({ id: doc.id, ...doc.data() });
      });
      setBookmarkedData(data);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#10B981" />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Stretch yang Ditandai</Text>

      {bookmarkedData.length === 0 ? (
        <Text style={styles.emptyText}>Belum ada bookmark</Text>
      ) : (
        bookmarkedData.map(item => (
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
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#294A33',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 14,
    color: '#64748B',
    textAlign: 'center',
    marginTop: 20,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F0FDF4',
  },
});

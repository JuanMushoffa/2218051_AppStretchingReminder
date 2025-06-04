import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Clock, Bookmark } from 'iconsax-react-native';

export default function StretchCard({
  id,
  title,
  date,
  image,
  category,
  description = '',
  isBookmarked = false,
  onToggleBookmark, // opsional
}) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        navigation.navigate('DetailScreen', {
          id,
          title,
          date,
          image,
          category,
          description,
          isBookmarked,
        })
      }>
      <Image source={{ uri: image }} style={styles.image} />

      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.category}>{category}</Text>

          {onToggleBookmark && (
            <TouchableOpacity onPress={() => onToggleBookmark(id, isBookmarked)}>
              <Bookmark
                size={20}
                variant={isBookmarked ? 'Bold' : 'Linear'}
                color={isBookmarked ? '#10B981' : '#6B7280'}
              />
            </TouchableOpacity>
          )}
        </View>

        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description} numberOfLines={2}>
          {description}
        </Text>

        <View style={styles.footer}>
          <Clock size={14} color="#6B7280" variant="Linear" />
          <Text style={styles.date}>{date}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 10,
    marginBottom: 16,
    overflow: 'hidden',
    elevation: 2,
  },
  image: {
    width: 94,
    height: 94,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  content: {
    flex: 1,
    padding: 10,
    justifyContent: 'space-between',
  },
  category: {
    fontSize: 12,
    color: '#10B981',
    fontWeight: '600',
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1E293B',
  },
  description: {
    fontSize: 12,
    color: '#4B5563',
  },
  date: {
    fontSize: 11,
    color: '#6B7280',
    marginLeft: 4,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

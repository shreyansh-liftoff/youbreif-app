import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';

interface CardProps {
  title: string;
  thumbnail: string;
  record: Record<string, string>;
  onPress?: (record: Record<string, string>) => void;
}

const Card: React.FC<CardProps> = ({title, thumbnail, onPress, record}) => {
  return (
    <TouchableOpacity onPress={() => onPress?.(record)} style={styles.container}>
      <View style={styles.card}>
        <Image
          source={{uri: thumbnail}}
          style={styles.thumbnail}
          resizeMode={'cover'}
        />
        <View style={styles.contentContainer}>
          <Text style={styles.title}>{title}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 350,
    padding: 8,
    position: 'relative',
    margin: 8,
  },
  card: {
    backgroundColor: '#2d1a3d',
    borderRadius: 10,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  thumbnail: {
    width: '100%',
    height: 150,
  },
  contentContainer: {
    padding: 16,
    backgroundColor: '#1a1a1a',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
});

export default Card;

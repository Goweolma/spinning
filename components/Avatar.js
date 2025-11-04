
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Avatar({ emoji = '🚴‍♂️' }) {
  return (
    <View style={styles.wrap}>
      <Text style={styles.emoji}>{emoji}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: 96, height: 96, borderRadius: 48, backgroundColor: '#eef5ff',
    alignItems: 'center', justifyContent: 'center', borderWidth: 3, borderColor: '#fff',
    elevation: 4, shadowColor: '#000', shadowOpacity: 0.15, shadowRadius: 8, shadowOffset: { width: 0, height: 4 },
  },
  emoji: { fontSize: 44 },
});

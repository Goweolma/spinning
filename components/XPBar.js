
import React from 'react';
import { View, StyleSheet } from 'react-native';

export default function XPBar({ progress = 0 }) {
  return (
    <View style={styles.bar}>
      <View style={[styles.fill, { width: `${Math.min(100, Math.max(0, progress))}%` }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  bar: { width: '80%', height: 10, backgroundColor: '#e0e0e0', borderRadius: 8, overflow: 'hidden' },
  fill: { height: '100%', backgroundColor: '#007bff' },
});

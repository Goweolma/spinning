
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'SPINNING_STATE_V1';

export default function HistoryScreen() {
  const [items, setItems] = useState([]);

  useEffect(() => { (async () => {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    const u = JSON.parse(raw);
    setItems(u.history ? u.history.slice().reverse() : []);
  })(); }, []);

  const fmt = (t) => new Date(t).toLocaleString();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Historial de clases</Text>
      {items.length === 0 ? (
        <Text style={{ color: '#6b7280' }}>Aún no hay clases registradas.</Text>
      ) : (
        <FlatList
          data={items}
          keyExtractor={(i, idx) => i.code + idx}
          renderItem={({ item }) => (
            <View style={styles.row}>
              <Text>Clase · {item.code}</Text>
              <Text style={{ color: '#6b7280' }}>{fmt(item.when)}  ·  +{item.xp} XP</Text>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: 'bold', color: '#007bff', marginBottom: 12 },
  row: { paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#eef2f7' },
});

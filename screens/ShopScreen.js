
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'SPINNING_STATE_V1';
const PACKS = [
  { id: 'p8', title: '8 clases', price: 820, credits: 8, term: '30 días' },
  { id: 'p10', title: '10 clases', price: 980, credits: 10, term: '30 días' },
  { id: 'p12', title: 'Cyc + Kinesis (12)', price: 1499, credits: 12, term: '30 días' },
  { id: 'p15', title: '15 clases', price: 1150, credits: 15, term: '45 días' },
];

export default function ShopScreen() {
  const [user, setUser] = useState({ credits: 0 });

  useEffect(() => { (async () => {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    if (raw) setUser(JSON.parse(raw));
  })(); }, []);

  const addCredits = async (n) => {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    const u = raw ? JSON.parse(raw) : { credits: 0 };
    const updated = { ...u, credits: (u.credits || 0) + n };
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    setUser(updated);
    Alert.alert('¡Listo!', `Se añadieron +${n} créditos`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tienda · Créditos: {user.credits || 0}</Text>
      <FlatList
        data={PACKS}
        keyExtractor={(i) => i.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.name}>{item.title}</Text>
            <Text style={styles.term}>Vigencia: {item.term}</Text>
            <Text style={styles.price}>${item.price}</Text>
            <TouchableOpacity style={styles.btn} onPress={() => addCredits(item.credits)}>
              <Text style={styles.btnText}>Añadir</Text>
            </TouchableOpacity>
          </View>
        )}
        contentContainerStyle={{ paddingBottom: 40 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f6f8fb' },
  title: { fontSize: 22, fontWeight: 'bold', color: '#007bff', marginBottom: 12 },
  card: { backgroundColor: '#fff', borderRadius: 16, padding: 16, marginBottom: 12, elevation: 2 },
  name: { fontSize: 16, fontWeight: '600' },
  term: { color: '#6b7280', marginTop: 4 },
  price: { color: '#007bff', fontWeight: '800', fontSize: 18, marginVertical: 8 },
  btn: { backgroundColor: '#007bff', paddingVertical: 10, borderRadius: 10, alignItems: 'center' },
  btnText: { color: '#fff', fontWeight: '700' },
});

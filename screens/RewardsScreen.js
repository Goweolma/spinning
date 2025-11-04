
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'SPINNING_STATE_V1';
const REWARDS_KEY = 'REWARDS_CLAIMED_V1';
const REWARDS = [
  { level: 5, label: 'Clase gratis', key: 'lvl5' },
  { level: 10, label: 'Botella de agua', key: 'lvl10' },
  { level: 20, label: 'Playera oficial', key: 'lvl20' },
];

export default function RewardsScreen() {
  const [user, setUser] = useState({ level: 1 });
  const [claimed, setClaimed] = useState({});

  useEffect(() => { (async () => {
    try {
      const raw = await AsyncStorage.getItem(STORAGE_KEY); if (raw) setUser(JSON.parse(raw));
      const rw = await AsyncStorage.getItem(REWARDS_KEY); if (rw) setClaimed(JSON.parse(rw));
    } catch {}
  })(); }, []);

  const claim = async (key) => {
    const updated = { ...claimed, [key]: true };
    setClaimed(updated);
    await AsyncStorage.setItem(REWARDS_KEY, JSON.stringify(updated));
    Alert.alert('¡Listo!', 'Recompensa canjeada ✨');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recompensas</Text>
      {REWARDS.map(r => {
        const unlocked = (user.level || 1) >= r.level;
        const isClaimed = !!claimed[r.key];
        return (
          <View key={r.key} style={styles.row}>
            <Text style={{ fontSize: 16 }}>Nivel {r.level} · {r.label}</Text>
            {isClaimed ? (
              <Text style={{ color: '#16a34a', fontWeight: '600' }}>Reclamado</Text>
            ) : unlocked ? (
              <TouchableOpacity style={styles.btn} onPress={() => claim(r.key)}>
                <Text style={styles.btnText}>Canjear</Text>
              </TouchableOpacity>
            ) : (
              <Text style={{ color: '#f59e0b' }}>Bloqueado</Text>
            )}
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: 'bold', color: '#007bff', marginBottom: 12 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#eef2f7' },
  btn: { backgroundColor: '#007bff', paddingVertical: 8, paddingHorizontal: 12, borderRadius: 10 },
  btnText: { color: '#fff', fontWeight: '600' },
});

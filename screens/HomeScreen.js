
import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Alert } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import AsyncStorage from '@react-native-async-storage/async-storage';
import XPBar from '../components/XPBar';
import Avatar from '../components/Avatar';

const STORAGE_KEY = 'SPINNING_STATE_V1';
const XP_PER_CLASS = 100;

export default function HomeScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanning, setScanning] = useState(false);
  const [user, setUser] = useState({ name: 'Atleta', level: 1, xp: 0, credits: 0, history: [] });
  const scanningLock = useRef(false);

  useEffect(() => { (async () => {
    try { const raw = await AsyncStorage.getItem(STORAGE_KEY); if (raw) setUser(JSON.parse(raw)); } catch {}
  })(); }, []);

  useEffect(() => { AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(user)).catch(() => {}); }, [user]);

  const addXP = (amount) => {
    setUser((u) => {
      let xp = u.xp + amount; let level = u.level; let leveled = false;
      while (xp >= 500 * level) { xp -= 500 * level; level += 1; leveled = true; }
      if (leveled) Alert.alert('¡Nuevo nivel!', `Subiste a nivel ${level} 🥳`);
      return { ...u, xp, level };
    });
  };

  const registerClass = (code) => {
    setUser((u) => ({ ...u, history: [...u.history, { code, when: Date.now(), xp: XP_PER_CLASS }] }));
    addXP(XP_PER_CLASS);
  };

  const handleScan = (payload) => {
    if (scanningLock.current) return;
    scanningLock.current = true;
    const data = (payload?.data || '').toString();
    if (data.startsWith('CLASS-')) {
      registerClass(data); setScanning(false);
      setTimeout(() => (scanningLock.current = false), 600);
    } else { Alert.alert('Código inválido', 'El QR debe iniciar con CLASS-'); setTimeout(() => (scanningLock.current = false), 400); }
  };

  if (!permission) return <View style={styles.center} />;
  if (!permission.granted) {
    return (
      <View style={styles.center}>
        <Text style={{ marginBottom: 10 }}>Se necesita acceso a la cámara.</Text>
        <TouchableOpacity style={styles.btn} onPress={requestPermission}>
          <Text style={styles.btnText}>Dar permiso</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const needed = 500 * user.level;
  const progress = (user.xp / needed) * 100;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Spinning Club</Text>
      <Avatar />
      <Text style={styles.subtitle}>Nivel {user.level} · {user.xp}/{needed} XP</Text>
      <XPBar progress={progress} />
      <TouchableOpacity style={[styles.btn, { marginTop: 16 }]} onPress={() => setScanning(true)}>
        <Text style={styles.btnText}>Escanear QR</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.btnGhost, { marginTop: 8 }]} onPress={() => addXP(100)}>
        <Text style={styles.btnGhostText}>+100 XP (demo)</Text>
      </TouchableOpacity>
      <Modal visible={scanning} animationType="slide">
        <CameraView style={{ flex: 1 }} barcodeScannerSettings={{ barcodeTypes: ['qr'] }} onBarcodeScanned={handleScan} />
        <TouchableOpacity style={styles.closeBtn} onPress={() => { setScanning(false); scanningLock.current = false; }}>
          <Text style={{ color: '#fff', fontWeight: '600' }}>Cerrar</Text>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f6f8fb', paddingHorizontal: 16 },
  title: { fontSize: 26, fontWeight: 'bold', color: '#007bff', marginBottom: 6 },
  subtitle: { marginVertical: 8, color: '#555' },
  btn: { backgroundColor: '#007bff', paddingVertical: 14, paddingHorizontal: 20, borderRadius: 12 },
  btnText: { color: '#fff', fontWeight: 'bold' },
  btnGhost: { borderWidth: 1, borderColor: '#d0d7e2', paddingVertical: 12, paddingHorizontal: 18, borderRadius: 12 },
  btnGhostText: { color: '#1f2937', fontWeight: '600' },
  closeBtn: { position: 'absolute', bottom: 40, alignSelf: 'center', backgroundColor: '#007bff', padding: 12, borderRadius: 10 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});


Spinning Club – Expo SDK 52

**Contenido:**
- Avatar, niveles y XP (barra de progreso)
- Escáner QR (expo-camera) — usa códigos que comiencen con `CLASS-`
- Recompensas, Tienda e Historial
- Persistencia local con AsyncStorage
- Tema azul #007bff

**Requisitos:**
- Node 18 o 20 LTS
- Expo Go actualizado (SDK 52 compatible)

**Instalación:**
1) En la carpeta del proyecto:
   npm install --legacy-peer-deps
2) Inicia con caché limpio:
   npx expo start -c
3) Abre Expo Go en tu teléfono y escanea el QR.

**Notas:**
- Si aparece error de Babel:
   npm i -D babel-preset-expo
- Si Metro falla: borra node_modules y package-lock.json y repite la instalación.

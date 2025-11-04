# 🚴‍♀️ Spinning Club App (Expo SDK 54)

![Expo](https://img.shields.io/badge/Expo-SDK%2054-blue?logo=expo)
![React Native](https://img.shields.io/badge/React%20Native-0.76.5-blue?logo=react)
![License](https://img.shields.io/badge/license-MIT-green)

---

## 🧠 Descripción
Aplicación móvil creada con **React Native + Expo** para un estudio de **spinning**.  
Permite a los usuarios registrar clases, escanear códigos QR al finalizar sus sesiones, ganar puntos de experiencia (XP), subir de nivel y desbloquear recompensas 🎁.

---

## ✨ Funcionalidades principales
- 🧍 Perfil con **avatar**, nivel y barra de experiencia  
- 📸 **Escáner QR** para registrar clases reales  
- 🏅 Sistema de niveles y recompensas automáticas  
- 💳 Tienda de paquetes de clases (8, 10, 15, mensualidad)  
- 📜 Historial de clases con fecha y XP ganada  
- 💾 Persistencia local con `AsyncStorage`  
- 🌙 Estilo limpio con colores azul/gris del estudio  

---

## ⚙️ Tecnologías
- **Expo SDK 54**
- **React 18.3.1**
- **React Native 0.76.5**
- **Expo Camera**
- **React Navigation**
- **Async Storage**

---

## 🧩 Instalación y ejecución

### 🔧 1️⃣ Instalar dependencias
```bash
npm install


### 2️⃣ Iniciar el proyecto
npx expo start


📱 3️⃣ Probar en tu teléfono

Instala Expo Go desde App Store o Google Play.

Abre la app y escanea el código QR que aparece en la terminal o el navegador.

La aplicación se cargará automáticamente en tu dispositivo.

💡 Tips de uso

Si el QR no carga, cambia el modo de conexión:

En la terminal presiona s → elige LAN o Tunnel.

Si cambias de red Wi-Fi, reinicia con:

npx expo start -c


### Para detener el servidor:
Presiona Ctrl + C en la terminal → luego Y y Enter.


🧱 Estructura del proyecto
SpinningClubApp/
│
├── App.js
├── package.json
├── app.json
├── babel.config.js
├── components/
│   ├── XPBar.js
│   ├── Avatar.js
├── screens/
│   ├── HomeScreen.js
│   ├── RewardsScreen.js
│   ├── ShopScreen.js
│   ├── HistoryScreen.js
└── assets/
    └── icon.png
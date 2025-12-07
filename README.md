🍽️ Hunger’s Harmony
AI-Based Food Recommendation for UMKM | Mood + Weather + Smart Menu Matching
Hunger’s Harmony adalah platform cerdas yang membantu UMKM kuliner memberikan rekomendasi makanan terbaik kepada pelanggan berdasarkan cuaca real-time, mood pengguna, dan data menu toko.

Pengguna cukup memilih mood atau melihat kondisi cuaca, lalu AI akan menampilkan makanan yang paling sesuai dari menu UMKM terdekat.

🚀 Fitur Utama
🔥 1. Rekomendasi Berdasarkan Cuaca (Real-Time Weather AI)
Mengambil data cuaca terkini dari OpenWeatherMap

AI memberikan rekomendasi seperti:

Hujan → makanan hangat (soto, bakso)

Panas → makanan segar (es buah, salad)

😊 2. Rekomendasi Berdasarkan Mood
User cukup memilih mood senang, sedih, lelah, marah, dll.
AI akan mencocokkan mood dengan kategori makanan yang paling relevan.

🏪 3. Data Menu UMKM
UMKM hanya perlu:

Menambahkan nama toko + daftar makanan

Upload gambar makanan

Menentukan harga + deskripsi

AI akan mencocokkannya dengan preferensi user.

🧭 4. Maps Integration
Google Maps API atau Leaflet OpenStreetMap (gratis tanpa API Key)

Menampilkan lokasi toko

Navigasi rute otomatis → langsung buka Google Maps

🤖 5. AI Food Recommendation Engine
Menggunakan:

OpenAI / Groq API

Model LLM → menghasilkan rekomendasi personal dan natural

Contoh respons AI:

“Karena cuaca sedang hujan, makanan hangat cocok. Dari menu toko Anda, Bakso Kuah menjadi pilihan terbaik.”

🎨 6. UI Modern & Ringan
React + TypeScript

ShadCN UI

Lucide Icons

Responsif mobile

🧩 Teknologi yang Digunakan
Teknologi	Fungsi
React + TypeScript	Frontend inti
ShadCN UI	Komponen modern
Lucide Icons	Icon pack
OpenWeatherMap API	Cuaca real-time
Google Maps API / Leaflet	Lokasi & rute
OpenAI / Groq API	AI rekomendasi
Vite / Next.js (opsional)	Dev & build
🔑 Konfigurasi API (API_CONFIG)
Edit API_CONFIG.ts:

export const API_CONFIG = {
  WEATHER_API_KEY: "", 
  WEATHER_API_URL: "https://api.openweathermap.org/data/2.5/weather",

  MAPS_API_KEY: "", // jika kosong → pakai OpenStreetMap

  AI_API_KEY: "",
  AI_API_URL: "https://api.openai.com/v1/chat/completions",
  AI_MODEL: "gpt-4o-mini",
};
📌 Cara Menjalankan Proyek
git clone <repo-url>
cd hungers-harmony
npm install
npm run dev
Buka di browser:

http://localhost:5173/
📂 Struktur Folder
src/
 ├── components/
 │    ├── RecommendationFilters.tsx
 │    ├── Weather.tsx
 │    ├── RestaurantCard.tsx
 │    └── ...
 ├── pages/
 ├── utils/
 │    ├── api.ts
 │    └── AI.ts
 ├── config/
 │    └── API_CONFIG.ts
 └── assets/
🎯 Target Pengguna
Untuk UMKM:
Membantu meningkatkan penjualan berdasarkan rekomendasi pintar

Memberikan pengalaman seperti aplikasi besar (GoFood/GrabFood)

Untuk Pengguna:
Tidak bingung mau makan apa

Rekomendasi personal dan cepat

📈 Manfaat Proyek
Menghubungkan preferensi user + kondisi lingkungan + menu UMKM

Membuat rekomendasi terasa lebih personal dan manusiawi

Memberi pengalaman premium meskipun berbasis web sederhana

🤝 Kontribusi
Pull Request selalu diterima!
Silakan buka issue jika ingin menambahkan fitur baru.

## 🎥 Demo Video Aplikasi

Klik gambar di bawah untuk menonton video demo aplikasi Hunger Harmony:

[![Demo Video](https://via.placeholder.com/800x450.png?text=Klik+Untuk+Menonton+Video+Demo)](https://drive.google.com/file/d/1xwYqFV3M09iyHgE_m6skEBWgGo-d3v7C/view?usp=sharing)

📝 Lisensi
MIT License — bebas dipakai untuk pengembangan UMKM & edukasi.

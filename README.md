# 🎬 Google Drive Media Gallery

Website modern untuk menampilkan koleksi video dan foto dari Google Drive dengan fitur favorit, pencarian, dan custom naming.

![Next.js](https://img.shields.io/badge/Next.js-14+-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5+-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3+-06B6D4?style=flat-square&logo=tailwindcss)

## ✨ Fitur Utama

- 📂 **Integrasi Google Drive** - Otomatis fetch media dari folder Google Drive
- 🎯 **Filter Canggih** - Filter berdasarkan tipe (Video/Foto) dan favorit
- 🔍 **Pencarian Real-time** - Cari media berdasarkan nama file
- ❤️ **Sistem Favorit** - Tandai media favorit (disimpan di localStorage)
- ✏️ **Custom Naming** - Edit nama display file (disimpan di localStorage)
- 🎨 **Desain Modern** - UI dark theme dengan animasi smooth
- 📱 **Responsive** - Optimal di desktop, tablet, dan mobile
- ⚡ **Performance** - Server-side rendering dengan Next.js App Router
- 🔒 **Secure** - API credentials tidak ter-expose di client-side

## 🏗️ Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Custom CSS dengan Tailwind CSS
- **API**: Google Drive API v3
- **Icons**: Lucide React
- **Font**: DM Serif Display + Public Sans

## 📋 Prerequisites

- Node.js 18+ dan npm/yarn
- Google Cloud Project dengan Drive API enabled
- Service Account credentials
- Folder Google Drive dengan media files

## 🚀 Setup Instructions

### 1. Clone Project

```bash
git clone <repository-url>
cd google-drive-gallery
```

### 2. Install Dependencies

```bash
npm install
# atau
yarn install
```

### 3. Setup Google Drive API

#### A. Buat Google Cloud Project

1. Buka [Google Cloud Console](https://console.cloud.google.com/)
2. Buat project baru atau pilih existing project
3. Navigate ke **APIs & Services** → **Library**
4. Cari dan enable **Google Drive API**

#### B. Buat Service Account

1. Navigate ke **APIs & Services** → **Credentials**
2. Klik **Create Credentials** → **Service Account**
3. Beri nama service account (contoh: "drive-gallery-reader")
4. Skip optional steps dan klik **Done**

#### C. Generate Private Key

1. Klik service account yang baru dibuat
2. Tab **Keys** → **Add Key** → **Create new key**
3. Pilih **JSON** format
4. Download file JSON (berisi credentials)

#### D. Share Folder dengan Service Account

1. Buka Google Drive folder yang ingin ditampilkan
2. Klik **Share**
3. Paste email service account (format: `xxx@xxx.iam.gserviceaccount.com`)
4. Berikan akses **Viewer** atau **Editor**
5. Copy **Folder ID** dari URL: `https://drive.google.com/drive/folders/[FOLDER_ID]`

### 4. Setup Environment Variables

Buat file `.env` di root project:

```bash
cp .env.example .env
```

Edit file `.env` dan isi dengan credentials dari JSON file:

```env
GOOGLE_CLIENT_EMAIL=your-service-account@your-project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour private key here\n-----END PRIVATE KEY-----\n"
GOOGLE_DRIVE_FOLDER_ID=your-folder-id-here
```

⚠️ **PENTING**: 
- Pastikan `GOOGLE_PRIVATE_KEY` dibungkus dengan quotes
- Jangan hapus `\n` di dalam private key
- Jangan commit file `.env` ke repository

### 5. Run Development Server

```bash
npm run dev
# atau
yarn dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser.

## 📁 Struktur Project

```
google-drive-gallery/
├── app/
│   ├── api/
│   │   └── media/
│   │       ├── route.ts          # API: List semua media
│   │       └── [id]/route.ts     # API: Detail media
│   ├── media/[id]/
│   │   └── page.tsx              # Detail page
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Homepage
│   └── globals.css               # Global styles
├── components/
│   ├── FilterBar.tsx             # Filter & search component
│   ├── MediaCard.tsx             # Media card component
│   ├── MediaPlayer.tsx           # Video/image player
│   └── MediaSkeleton.tsx         # Loading skeleton
├── lib/
│   ├── googleDrive.ts            # Google Drive service
│   └── useLocalStorage.ts        # LocalStorage hook
├── types/
│   └── index.ts                  # TypeScript types
├── .env.example                  # Environment variables template
├── package.json
└── README.md
```

## 🎯 Cara Pakai

### Homepage

1. **Filter Media**: Pilih "Semua", "Video Saja", atau "Foto Saja"
2. **Search**: Ketik nama file di search bar
3. **Favorit**: Klik tombol heart untuk menandai favorit
4. **Edit Nama**: Klik icon edit untuk mengubah nama display
5. **Lihat Detail**: Klik thumbnail untuk membuka detail page

### Detail Page

1. **Play/View Media**: Video otomatis bisa diplay, foto ditampilkan full size
2. **Download**: Klik icon download untuk download file
3. **Buka di Drive**: Klik icon external link
4. **Edit Nama**: Edit nama langsung di detail page
5. **Toggle Favorit**: Tandai/hapus dari favorit

## 🎨 Customization

### Mengubah Theme Colors

Edit variabel CSS di `app/globals.css`:

```css
:root {
  --color-accent: #6366f1;        /* Primary accent color */
  --color-bg: #0a0b0e;            /* Background color */
  --color-surface: #15171d;       /* Card background */
  /* ... */
}
```

### Mengubah Grid Layout

Edit di `app/globals.css`:

```css
.media-grid {
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  /* Ubah minmax value untuk ukuran card yang berbeda */
}
```

### Mengubah Fonts

Ganti import font di `app/globals.css`:

```css
@import url('https://fonts.googleapis.com/css2?family=YourFont:wght@400;600&display=swap');
```

## 🔧 Troubleshooting

### Error: "Failed to fetch media files"

**Solusi**:
1. Pastikan Service Account sudah diberi akses ke folder
2. Cek `GOOGLE_DRIVE_FOLDER_ID` sudah benar
3. Pastikan Google Drive API sudah enabled
4. Cek format `GOOGLE_PRIVATE_KEY` (harus ada quotes dan `\n`)

### Thumbnail tidak muncul

**Solusi**:
1. Google Drive membutuhkan waktu untuk generate thumbnail
2. Beberapa format file mungkin tidak support thumbnail
3. Pastikan file sudah ter-upload sempurna ke Drive

### LocalStorage tidak tersimpan

**Solusi**:
1. Cek browser settings - pastikan cookies/storage enabled
2. Clear browser cache dan reload
3. Coba di browser lain (Chrome, Firefox, Safari)

## 🚀 Deployment

### Deploy ke Vercel

1. Push code ke GitHub repository
2. Import project di [Vercel](https://vercel.com)
3. Add environment variables di Vercel dashboard
4. Deploy!

### Environment Variables di Vercel

Tambahkan di **Settings** → **Environment Variables**:
- `GOOGLE_CLIENT_EMAIL`
- `GOOGLE_PRIVATE_KEY`
- `GOOGLE_DRIVE_FOLDER_ID`

## 📝 API Documentation

### GET `/api/media`

Fetch semua media files dari Google Drive.

**Response**:
```json
{
  "success": true,
  "data": [
    {
      "id": "file-id",
      "name": "video.mp4",
      "thumbnailLink": "https://...",
      "mimeType": "video/mp4",
      "size": "10.5 MB",
      "webContentLink": "https://...",
      "isVideo": true,
      "isImage": false
    }
  ],
  "total": 25
}
```

### GET `/api/media/[id]`

Fetch detail single media file.

**Response**:
```json
{
  "success": true,
  "data": {
    "id": "file-id",
    "name": "video.mp4",
    "mimeType": "video/mp4",
    "size": "10.5 MB",
    "webContentLink": "https://...",
    "webViewLink": "https://...",
    "isVideo": true,
    "isImage": false
  }
}
```

## 🤝 Contributing

Contributions are welcome! Silakan:

1. Fork repository
2. Buat feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push ke branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📄 License

MIT License - silakan digunakan untuk project pribadi atau komersial.

## 🙏 Credits

- Design inspired by modern media galleries
- Icons by [Lucide](https://lucide.dev/)
- Fonts by [Google Fonts](https://fonts.google.com/)

## 📧 Support

Jika ada pertanyaan atau issue, silakan buat GitHub Issue atau hubungi developer.

---

**Made with ❤️ using Next.js and TypeScript**

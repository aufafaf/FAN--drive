# 🚀 Quick Start Guide

## Setup dalam 5 Langkah

### 1️⃣ Install Dependencies
```bash
npm install
```

### 2️⃣ Setup Google Cloud
1. Buka https://console.cloud.google.com/
2. Enable **Google Drive API**
3. Buat **Service Account**
4. Download **JSON credentials**

### 3️⃣ Share Folder
1. Buka folder Google Drive Anda
2. Share dengan service account email
3. Copy Folder ID dari URL

### 4️⃣ Setup Environment
```bash
cp .env.example .env
# Edit .env dengan credentials Anda
```

### 5️⃣ Run!
```bash
npm run dev
```

## ✅ Checklist

- [ ] Node.js 18+ installed
- [ ] Google Cloud project created
- [ ] Drive API enabled
- [ ] Service account created
- [ ] JSON key downloaded
- [ ] Folder shared with service account
- [ ] .env file configured
- [ ] Dependencies installed
- [ ] Dev server running

## 🎯 Features Overview

### Homepage
- Grid layout dengan thumbnail
- Search bar untuk cari media
- Filter: Semua / Video / Foto / Favorit
- Click card untuk lihat detail

### Media Card
- Thumbnail preview
- Badge tipe (Video/Foto)
- File size info
- ❤️ Favorite button
- ✏️ Edit name button

### Detail Page
- Video player / Image viewer
- Download button
- Open in Google Drive
- Edit display name
- Add/remove favorite

### Data Persistence
- Favorites → localStorage
- Custom names → localStorage
- Data persists across sessions

## 🎨 UI Highlights

- **Dark Theme** dengan accent colors
- **Smooth Animations** pada hover & transitions
- **Responsive Grid** (3 cols → 2 cols → 1 col)
- **Loading Skeletons** untuk better UX
- **Custom Fonts**: DM Serif Display + Public Sans

## 📱 Responsive Breakpoints

- **Mobile**: < 768px (1 column)
- **Tablet**: 768px - 1024px (2 columns)
- **Desktop**: > 1024px (3 columns)

## 🔐 Security

✅ API credentials hanya di server-side
✅ API routes sebagai middleman
✅ .env tidak masuk git repository
✅ Service account dengan minimal permissions

## 🚨 Common Issues

**Q: Thumbnail tidak muncul?**
A: Google butuh waktu generate thumbnail untuk file baru

**Q: Error 403?**
A: Pastikan folder sudah di-share dengan service account

**Q: LocalStorage hilang?**
A: Check browser settings, pastikan storage enabled

**Q: Video tidak bisa diplay?**
A: Beberapa format video mungkin tidak support browser player

## 📚 Resources

- [Next.js Docs](https://nextjs.org/docs)
- [Google Drive API](https://developers.google.com/drive/api/v3/about-sdk)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

---

Happy coding! 🎉

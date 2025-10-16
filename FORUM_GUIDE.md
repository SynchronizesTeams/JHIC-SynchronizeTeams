# Forum JHIC Implementation Guide

## Overview
Fitur forum JHIC adalah platform diskusi yang terinspirasi dari Threads/X dengan struktur sebagai berikut:
- **Publik**: Terbuka untuk semua orang termasuk yang tidak login
- **Alumni**: Khusus untuk alumni yang sudah diverifikasi
- **Siswa**: Khusus untuk siswa aktif

## Routing Structure
```
/forums                    - Halaman utama dengan daftar channel
/forums/public            - Forum publik
/forums/alumni            - Forum alumni  
/forums/siswa             - Forum siswa
/forums/[channel]/[postId] - Detail post dengan komentar
```

## Komponen Utama

### 1. Type Definitions (`app/types/forum.ts`)
- `User`: Informasi user dengan role (public, alumni, siswa)
- `Post`: Struktur data post dengan voting dan gambar
- `Comment`: Komentar nested dengan voting
- `Channel`: Konfigurasi channel dan access level

### 2. Mock Data (`app/utils/mockData.ts`)
- Data dummy untuk development
- Users, channels, posts, dan comments
- Contoh data dengan relasi yang proper

### 3. Pages
- `forums/index.vue`: Halaman utama dengan channel selection
- `forums/[channel].vue`: Feed post per channel
- `forums/[channel]/[postId].vue`: Detail post dengan comment thread

### 4. Components
- `PostCard.vue`: Card post di feed (mirip Threads)
- `PostDetail.vue`: Detail post lengkap
- `CommentThread.vue`: Komentar dengan nested reply
- `CreatePostModal.vue`: Modal untuk membuat post baru

## Fitur MVP

### ✅ Sudah Implementasi:
1. **Post Feed**: Tampilan mirip Threads dengan avatar, nama, timestamp
2. **Channel Separation**: 3 channel dengan access berbeda
3. **Nested Comments**: Komentar bisa dibalas (reply threading)
4. **Voting System**: Upvote/downvote untuk post dan komentar
5. **Image Support**: Upload gambar (max 4 gambar per post)
6. **Responsive Design**: Mobile-friendly dengan Tailwind CSS
7. **Character Limits**: 500 char untuk post, 300 untuk komentar

### 🔄 Next Phase (TODO):
1. **API Endpoints**: Backend integration
2. **Authentication**: Login/logout dengan role management
3. **Real Database**: PostgreSQL/MongoDB integration
4. **Real-time Updates**: WebSocket untuk live updates
5. **Image Upload**: Cloud storage (AWS S3, Cloudinary)
6. **Moderation Tools**: Admin panel, report system
7. **Search & Filter**: Advanced search functionality
8. **Notifications**: Real-time notifications
9. **User Profiles**: Profile pages dan user activity
10. **Post Analytics**: Engagement metrics

## Technical Stack
- **Frontend**: Nuxt 3 + Vue 3 + TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Vue 3 Composition API
- **Mock Data**: Static data for development
- **Routing**: Nuxt Router dengan dynamic routes

## File Structure
```
app/
├── types/
│   └── forum.ts                    # Type definitions
├── utils/
│   └── mockData.ts                 # Mock data
├── components/forum/
│   ├── PostCard.vue               # Post feed card
│   ├── PostDetail.vue             # Detailed post view
│   ├── CommentThread.vue          # Nested comments
│   └── CreatePostModal.vue        # Create post modal
├── pages/forums/
│   ├── index.vue                   # Forum home
│   ├── [channel].vue              # Channel feed
│   └── [channel]/[postId].vue     # Post detail
```

## Usage
1. Access `/forums` untuk melihat semua channel
2. Pilih channel (public/alumni/siswa) untuk melihat post
3. Klik post untuk melihat detail dan komentar
4. Create post untuk berbagi konten
5. Vote dan komentar untuk interaksi

## Styling Notes
- Menggunakan design pattern mirip Threads/X yang clean
- Responsive dengan mobile-first approach
- Hover states dan micro-interactions
- Color coding untuk channel differentiation

## Development
- Start dengan `npm run dev`
- Mock data untuk development testing
- TypeScript untuk type safety
- Component-based architecture untuk scalability

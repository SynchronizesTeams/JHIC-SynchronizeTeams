# Push Notification System

Sistem notifikasi push lengkap untuk SMK Penerbangan Bandung website.

## Fitur

- ✅ Request permission dari user saat pertama kali mengunjungi website
- ✅ Service Worker untuk handle push notifications
- ✅ Notifikasi lokal (client-side)
- ✅ Support untuk server push notifications (dengan VAPID keys)
- ✅ Template notifikasi untuk berbagai jenis update
- ✅ Cooldown 7 hari untuk request permission ulang

## Cara Kerja

### 1. User Flow

1. User membuka website
2. Setelah 3 detik, muncul modal request permission (jika belum pernah memutuskan)
3. User klik "Aktifkan" → browser menampilkan dialog permission
4. Jika granted → service worker terdaftar dan notifikasi welcome dikirim
5. User akan menerima notifikasi untuk update di website

### 2. Files Structure

```
app/
├── components/
│   └── common/
│       └── NotificationPrompt.vue      # Modal request permission
├── composables/
│   └── useNotification.ts              # Composable untuk handle notifications
├── types/
│   └── notification.ts                 # TypeScript types
└── utils/
    └── notificationUtils.ts            # Helper functions & templates

public/
└── sw.js                               # Service Worker
```

## Penggunaan

### Mengirim Notifikasi Manual (Testing)

```typescript
// Di component atau page manapun
const { showNotification } = useNotification()

// Kirim notifikasi
await showNotification({
  title: 'Judul Notifikasi',
  body: 'Isi pesan notifikasi',
  tag: 'unique-tag',
  url: '/halaman-tujuan',
  requireInteraction: false
})
```

### Menggunakan Template

```typescript
import { notificationTemplates } from '~/utils/notificationUtils'

const { showNotification } = useNotification()

// Notifikasi berita baru
await showNotification(
  notificationTemplates.newNews(
    'Juara 1 Lomba Coding Nasional',
    'juara-1-lomba-coding'
  )
)

// Notifikasi acara
await showNotification(
  notificationTemplates.newEvent(
    'Workshop Web Development',
    '20 Oktober 2025'
  )
)

// Notifikasi prestasi
await showNotification(
  notificationTemplates.newAchievement(
    'Tim Robotik Raih Medali Emas',
    'tim-robotik-medali-emas'
  )
)

// Pengumuman penting
await showNotification(
  notificationTemplates.announcement(
    'Libur sekolah diperpanjang hingga 30 Oktober'
  )
)

// Forum post
await showNotification(
  notificationTemplates.forumPost(
    'Tips Interview Kerja',
    'alumni',
    'post-123'
  )
)
```

### Mengirim dari Backend (Server Push)

**PENTING:** Untuk production, Anda perlu:

1. Generate VAPID keys untuk server push
2. Setup backend endpoint untuk handle subscriptions
3. Kirim notifications dari server

#### Generate VAPID Keys

```bash
npm install web-push -g
web-push generate-vapid-keys
```

Atau di Node.js:

```javascript
const webpush = require('web-push')
const vapidKeys = webpush.generateVAPIDKeys()

console.log('Public Key:', vapidKeys.publicKey)
console.log('Private Key:', vapidKeys.privateKey)
```

#### Update Public Key

Ganti placeholder di `app/composables/useNotification.ts`:

```typescript
applicationServerKey: urlBase64ToUint8Array(
  'YOUR_ACTUAL_VAPID_PUBLIC_KEY_HERE'
)
```

#### Backend Implementation Example (Node.js)

```javascript
const webpush = require('web-push')

// Set VAPID details
webpush.setVapidDetails(
  'mailto:your-email@example.com',
  process.env.VAPID_PUBLIC_KEY,
  process.env.VAPID_PRIVATE_KEY
)

// Endpoint untuk subscribe
app.post('/api/notifications/subscribe', async (req, res) => {
  const subscription = req.body

  // Save subscription to database
  await db.subscriptions.create(subscription)

  res.status(201).json({ success: true })
})

// Kirim notifikasi ke semua subscribers
app.post('/api/notifications/send', async (req, res) => {
  const { title, body, url } = req.body

  const payload = JSON.stringify({ title, body, url })

  // Get all subscriptions from database
  const subscriptions = await db.subscriptions.findAll()

  const notifications = subscriptions.map(sub => {
    return webpush.sendNotification(sub, payload)
  })

  await Promise.all(notifications)

  res.json({ success: true, sent: notifications.length })
})
```

## Automation - Notifikasi Otomatis

### Contoh: Notifikasi saat ada berita baru

```typescript
// Di halaman admin atau API endpoint create news
async function createNews(newsData) {
  // Save news to database
  const news = await db.news.create(newsData)

  // Send notification
  const { showNotification } = useNotification()
  await showNotification(
    notificationTemplates.newNews(news.title, news.slug)
  )

  // Or send via server
  await fetch('/api/notifications/send', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      title: '📰 Berita Baru',
      body: news.title,
      url: `/news/${news.slug}`
    })
  })
}
```

## Testing

### Test Notifikasi Lokal

Buka browser console dan jalankan:

```javascript
// Test basic notification
const { showNotification } = useNotification()
await showNotification({
  title: 'Test Notification',
  body: 'This is a test',
  url: '/'
})
```

Atau gunakan helper function:

```javascript
import { sendTestNotification } from '~/utils/notificationUtils'
sendTestNotification()
```

## Browser Support

- ✅ Chrome/Edge (Desktop & Mobile)
- ✅ Firefox (Desktop & Mobile)
- ✅ Safari (macOS 16.4+, iOS 16.4+)
- ❌ Internet Explorer (tidak support)

## Troubleshooting

### Notifikasi tidak muncul

1. **Check permission**: Buka Settings → Site Settings → Notifications
2. **Check service worker**: Buka DevTools → Application → Service Workers
3. **Check console**: Lihat error di browser console

### Service Worker tidak register

1. Pastikan website diakses via HTTPS (atau localhost)
2. Check file `/sw.js` accessible di browser
3. Clear browser cache dan reload

### Permission sudah denied

User harus manual unblock dari browser settings:
- Chrome: Site Settings → Notifications → Allow
- Firefox: Permissions → Notifications → Allow
- Safari: Preferences → Websites → Notifications → Allow

## Security

- Service Worker hanya berjalan di HTTPS (production)
- VAPID keys harus disimpan aman di environment variables
- Validasi semua input notification sebelum kirim
- Rate limiting untuk prevent spam

## Next Steps

1. ✅ Setup VAPID keys untuk production
2. ✅ Implement backend API untuk handle subscriptions
3. ✅ Add notification settings page untuk user
4. ✅ Integrate dengan admin panel untuk send notifications
5. ✅ Add analytics untuk track notification engagement

## Support

Untuk pertanyaan atau masalah, hubungi tim development.

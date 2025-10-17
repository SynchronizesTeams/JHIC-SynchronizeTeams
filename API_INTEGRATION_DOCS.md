# Dokumentasi Integrasi API - Kalender Pendidikan & Buku Tamu

## Ringkasan

Integrasi ini menghubungkan aplikasi dengan backend API untuk fitur:
1. **Kalender Pendidikan** - Menampilkan acara/event sekolah
2. **Buku Tamu** - Form untuk pengunjung mendaftarkan kunjungan
3. **Listing Acara** - Halaman untuk melihat semua acara

## Struktur File

### 1. API Composable (`app/composables/useApi.ts`)
File ini berisi semua endpoint API yang tersedia:

#### Event Endpoints:
```typescript
event: {
  create(eventData)      // POST /api/v1/event/create
  getAll()               // GET /api/v1/event/showAll
  getById(id)            // GET /api/v1/event/show/:id
  update(id, eventData)  // POST /api/v1/event/edit/:id
  delete(id)             // DELETE /api/v1/event/delete/:id
  getByCategory(category) // GET /api/v1/event/showByCategory?category=
}
```

#### Guest Book Endpoints:
```typescript
guestBook: {
  create(guestBookData)     // POST /api/v1/guest-book/create
  getAll()                  // GET /api/v1/guest-book/showAll
  getById(id)               // GET /api/v1/guest-book/show/:id
  updateStatus(id, status)  // PUT /api/v1/guest-book/updateStatus/:id
}
```

### 2. Events Composable (`app/composables/useEvents.ts`)
Composable untuk mengelola state dan operasi events:

```typescript
const {
  events,              // ref: daftar semua events
  selectedEvent,       // ref: event yang dipilih
  loading,             // ref: status loading
  error,               // ref: error message
  fetchEvents,         // method: ambil semua events
  fetchEventById,      // method: ambil event by ID
  createEvent,         // method: buat event baru
  updateEvent,         // method: update event
  deleteEvent,         // method: hapus event
  getEventsByDate,     // method: filter events by tanggal
  getUpcomingEvents    // method: ambil events mendatang
} = useEvents()
```

### 3. Guest Book Composable (`app/composables/useGuestBook.ts`)
Composable untuk mengelola buku tamu:

```typescript
const {
  guestBooks,              // ref: daftar guest books
  selectedGuestBook,       // ref: guest book yang dipilih
  loading,                 // ref: status loading
  error,                   // ref: error message
  createGuestBook,         // method: kirim buku tamu
  fetchGuestBooks,         // method: ambil semua guest books
  updateGuestBookStatus,   // method: update status
  getPendingGuestBooks,    // method: filter pending
  getApprovedGuestBooks    // method: filter approved
} = useGuestBook()
```

### 4. Komponen

#### CalendarGuestBook Component (`app/components/section/CalendarGuestBook.vue`)
Komponen utama yang menampilkan kalender dan form buku tamu.

**Props (Optional):**
```typescript
events?: CalendarEvent[]  // Jika tidak disediakan, akan fetch dari API
```

**Fitur:**
- Kalender interaktif dengan penanda event
- Daftar event untuk tanggal yang dipilih
- Form buku tamu yang terintegrasi dengan API
- Auto-fetch events jika tidak ada props

**Penggunaan:**
```vue
<!-- Otomatis fetch dari API -->
<SectionCalendarGuestBook />

<!-- Atau dengan custom events -->
<SectionCalendarGuestBook :events="customEvents" />
```

#### Events Listing Page (`app/pages/events/index.vue`)
Halaman untuk menampilkan semua acara dengan filter dan view options.

**URL:** `/events`

**Fitur:**
- Grid dan List view
- Filter berdasarkan kategori
- Modal detail event
- Auto-fetch dari API

### 5. Types (`app/types/calendar.ts`)

```typescript
interface CalendarEvent {
  id: number
  title: string
  description: string
  event_date?: string      // YYYY-MM-DD (backward compatibility)
  start_date?: string      // YYYY-MM-DD
  end_date?: string        // YYYY-MM-DD
  category?: string
  location?: string
  organizer?: string
  image: string
  created_at?: string
  updated_at?: string
}

interface GuestBook {
  id: number
  title: string
  instance_name: string
  contact_person: string
  email: string
  phone: string
  request_date: string     // YYYY-MM-DD
  description: string
  created_at: string
  status?: 'pending' | 'approved' | 'rejected'
}
```

## Konfigurasi

### API Base URL
Dikonfigurasi di `nuxt.config.ts`:

```typescript
runtimeConfig: {
  public: {
    apiBase: 'https://jhic-infra.synchronizeteams.my.id'
  }
}
```

### Environment Variables (Optional)
Untuk development, buat file `.env`:

```env
NUXT_PUBLIC_API_BASE=http://localhost:3000
```

## Cara Menggunakan

### 1. Menampilkan Events di Halaman

```vue
<script setup>
const { events, loading, fetchEvents } = useEvents()

onMounted(async () => {
  await fetchEvents()
})
</script>

<template>
  <div v-if="loading">Loading...</div>
  <div v-else>
    <div v-for="event in events" :key="event.id">
      {{ event.title }}
    </div>
  </div>
</template>
```

### 2. Membuat Event Baru

```vue
<script setup>
const { createEvent } = useEvents()

const handleSubmit = async (formData) => {
  const result = await createEvent({
    title: formData.title,
    description: formData.description,
    category: 'akademik',
    start_date: '2025-01-20',
    end_date: '2025-01-20',
    location: 'Aula Sekolah',
    organizer: 'OSIS',
    image: formData.imageFile
  })

  if (result.success) {
    console.log('Event created!', result.data)
  }
}
</script>
```

### 3. Submit Guest Book

```vue
<script setup>
const { createGuestBook } = useGuestBook()

const submitForm = async (formData) => {
  const result = await createGuestBook({
    title: formData.title,
    instance_name: formData.instance_name,
    contact_person: formData.contact_person,
    email: formData.email,
    phone: formData.phone,
    request_date: formData.request_date,
    description: formData.description
  })

  if (result.success) {
    alert('Buku tamu berhasil dikirim!')
  } else {
    alert('Gagal mengirim: ' + result.error)
  }
}
</script>
```

### 4. Filter Events by Category

```vue
<script setup>
const { fetchEventsByCategory, events } = useEvents()

const loadAkademikEvents = async () => {
  await fetchEventsByCategory('akademik')
  // events.value sekarang hanya berisi events kategori akademik
}
</script>
```

## Error Handling

Semua composable memiliki error handling built-in:

```vue
<script setup>
const { events, error, loading, fetchEvents } = useEvents()

onMounted(async () => {
  await fetchEvents()

  if (error.value) {
    console.error('Error loading events:', error.value)
  }
})
</script>

<template>
  <div v-if="error" class="error">
    {{ error }}
  </div>
</template>
```

## Testing

### Menjalankan Development Server
```bash
npm run dev
```

### Halaman yang Perlu Ditest:
1. **Homepage (`/`)** - Bagian Kalender & Buku Tamu
2. **Events Listing (`/events`)** - Halaman daftar acara

### Checklist Testing:

#### Kalender & Buku Tamu (Homepage)
- [ ] Kalender menampilkan events dengan indicator
- [ ] Klik tanggal menampilkan events di tanggal tersebut
- [ ] Form buku tamu bisa dibuka/tutup
- [ ] Submit form buku tamu berhasil
- [ ] Validasi form bekerja
- [ ] Loading state tampil saat fetch data

#### Events Listing Page
- [ ] Semua events ditampilkan
- [ ] Filter kategori bekerja
- [ ] Toggle view (Grid/List) bekerja
- [ ] Klik event membuka modal detail
- [ ] Modal detail menampilkan info lengkap

## Troubleshooting

### Events tidak muncul
1. Cek console browser untuk error
2. Pastikan API base URL benar di `nuxt.config.ts`
3. Pastikan backend API running
4. Cek network tab di DevTools

### CORS Error
Jika muncul CORS error, backend perlu menambahkan header:
```
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: GET, POST, PUT, DELETE
Access-Control-Allow-Headers: Content-Type, Authorization
```

### Form Guest Book gagal submit
1. Cek format data sesuai interface
2. Cek response error dari API
3. Pastikan semua field required terisi

## API Backend Requirements

Backend harus menyediakan endpoints berikut:

### Events API
- `GET /api/v1/event/showAll` - Return array of events
- `GET /api/v1/event/show/:id` - Return single event
- `POST /api/v1/event/create` - Create event (FormData)
- `POST /api/v1/event/edit/:id` - Update event (FormData)
- `DELETE /api/v1/event/delete/:id` - Delete event

### Guest Book API
- `GET /api/v1/guest-book/showAll` - Return array of guest books
- `POST /api/v1/guest-book/create` - Create guest book entry (FormData)
- `PUT /api/v1/guest-book/updateStatus/:id` - Update status

### Response Format
```json
{
  "data": [...],
  "message": "Success",
  "status": 200
}
```

## Future Improvements

1. **Pagination** - Untuk events listing
2. **Search** - Fitur pencarian events
3. **Calendar Export** - Export ke iCal/Google Calendar
4. **Notifications** - Reminder untuk upcoming events
5. **Guest Book Admin** - Dashboard untuk manage guest books

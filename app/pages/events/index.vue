<template>
  <div class="min-h-screen bg-gradient-to-b from-primary-white via-white/30 to-primary-white py-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="text-center mb-12">
        <h1 class="text-4xl md:text-5xl font-bold text-primary-gray mb-4">
          Kalender Acara
        </h1>
        <p class="text-lg text-primary-gray/70">
          Jadwal dan acara terbaru SMK Plus Pelita Nusantara
        </p>
      </div>

      <!-- Filter Section -->
      <div class="mb-8 flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div class="flex gap-2 flex-wrap">
          <button
            v-for="category in categories"
            :key="category.value"
            @click="selectedCategory = category.value"
            :class="[
              'px-4 py-2 rounded-full font-semibold transition-all duration-300',
              selectedCategory === category.value
                ? 'bg-secondary-red text-primary-white shadow-lg'
                : 'bg-primary-white border border-primary-gray/20 text-primary-gray hover:border-secondary-red/30'
            ]">
            {{ category.label }}
          </button>
        </div>

        <!-- View Toggle -->
        <div class="flex gap-2 bg-primary-white border border-primary-gray/20 rounded-full p-1">
          <button
            @click="viewMode = 'grid'"
            :class="[
              'px-4 py-2 rounded-full transition-all duration-300',
              viewMode === 'grid' ? 'bg-secondary-red text-primary-white' : 'text-primary-gray'
            ]">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/>
            </svg>
          </button>
          <button
            @click="viewMode = 'list'"
            :class="[
              'px-4 py-2 rounded-full transition-all duration-300',
              viewMode === 'list' ? 'bg-secondary-red text-primary-white' : 'text-primary-gray'
            ]">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
            </svg>
          </button>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="text-center py-12">
        <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-secondary-red"></div>
        <p class="mt-4 text-primary-gray/60">Memuat acara...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="text-center py-12">
        <svg class="w-16 h-16 mx-auto text-red-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
        <p class="text-red-600">{{ error }}</p>
      </div>

      <!-- Events Grid/List -->
      <div v-else>
        <!-- Grid View -->
        <div v-if="viewMode === 'grid'" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="event in filteredEvents"
            :key="event.id"
            class="bg-primary-white border border-primary-gray/20 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer group"
            @click="openEventDetail(event)">
            <div class="aspect-video bg-primary-gray/10 overflow-hidden">
              <img
                v-if="event.image"
                :src="event.image"
                :alt="event.title"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300">
              <div v-else class="w-full h-full flex items-center justify-center">
                <svg class="w-16 h-16 text-primary-gray/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                </svg>
              </div>
            </div>
            <div class="p-6">
              <div class="flex items-center gap-2 mb-2">
                <span class="px-3 py-1 bg-secondary-red/10 text-secondary-red text-xs font-semibold rounded-full">
                  {{ event.category || 'Umum' }}
                </span>
              </div>
              <h3 class="text-xl font-bold text-primary-gray mb-2 group-hover:text-secondary-red transition-colors">
                {{ event.title }}
              </h3>
              <p class="text-sm text-primary-gray/60 mb-4 line-clamp-2">
                {{ event.description }}
              </p>
              <div class="flex items-center gap-2 text-sm text-primary-gray/70">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                </svg>
                <span>{{ formatDateRange(event) }}</span>
              </div>
              <div v-if="event.location" class="flex items-center gap-2 text-sm text-primary-gray/70 mt-2">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
                <span>{{ event.location }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- List View -->
        <div v-else class="space-y-4">
          <div
            v-for="event in filteredEvents"
            :key="event.id"
            class="bg-primary-white border border-primary-gray/20 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer group"
            @click="openEventDetail(event)">
            <div class="flex flex-col md:flex-row">
              <div class="md:w-1/3 aspect-video md:aspect-auto bg-primary-gray/10 overflow-hidden">
                <img
                  v-if="event.image"
                  :src="event.image"
                  :alt="event.title"
                  class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300">
                <div v-else class="w-full h-full flex items-center justify-center min-h-[200px]">
                  <svg class="w-16 h-16 text-primary-gray/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                  </svg>
                </div>
              </div>
              <div class="p-6 md:w-2/3 flex flex-col justify-between">
                <div>
                  <div class="flex items-center gap-2 mb-2">
                    <span class="px-3 py-1 bg-secondary-red/10 text-secondary-red text-xs font-semibold rounded-full">
                      {{ event.category || 'Umum' }}
                    </span>
                  </div>
                  <h3 class="text-2xl font-bold text-primary-gray mb-2 group-hover:text-secondary-red transition-colors">
                    {{ event.title }}
                  </h3>
                  <p class="text-primary-gray/70 mb-4">
                    {{ event.description }}
                  </p>
                </div>
                <div class="space-y-2">
                  <div class="flex items-center gap-2 text-sm text-primary-gray/70">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                    </svg>
                    <span>{{ formatDateRange(event) }}</span>
                  </div>
                  <div v-if="event.location" class="flex items-center gap-2 text-sm text-primary-gray/70">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                    </svg>
                    <span>{{ event.location }}</span>
                  </div>
                  <div v-if="event.organizer" class="flex items-center gap-2 text-sm text-primary-gray/70">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
                    </svg>
                    <span>{{ event.organizer }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-if="filteredEvents.length === 0" class="text-center py-12">
          <svg class="w-16 h-16 mx-auto text-primary-gray/30 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
          </svg>
          <p class="text-primary-gray/60">Tidak ada acara tersedia</p>
        </div>
      </div>

      <!-- Event Detail Modal -->
      <transition
        enter-active-class="transition-opacity duration-300"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition-opacity duration-200"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0">
        <div
          v-if="selectedEvent"
          @click="closeEventDetail"
          class="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div
            @click.stop
            class="bg-primary-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div class="relative">
              <button
                @click="closeEventDetail"
                class="absolute top-4 right-4 z-10 p-2 bg-primary-white/90 rounded-full hover:bg-primary-white transition-colors">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>

              <div v-if="selectedEvent.image" class="aspect-video bg-primary-gray/20 rounded-t-3xl overflow-hidden">
                <img
                  :src="selectedEvent.image"
                  :alt="selectedEvent.title"
                  class="w-full h-full object-cover">
              </div>

              <div class="p-6 md:p-8">
                <div class="flex items-center gap-2 mb-4">
                  <span class="px-3 py-1 bg-secondary-red/10 text-secondary-red text-sm font-semibold rounded-full">
                    {{ selectedEvent.category || 'Umum' }}
                  </span>
                </div>

                <h3 class="text-3xl md:text-4xl font-bold text-primary-gray mb-4">
                  {{ selectedEvent.title }}
                </h3>

                <div class="space-y-3 mb-6">
                  <div class="flex items-center gap-3 text-primary-gray/70">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                    </svg>
                    <span>{{ formatDateRange(selectedEvent) }}</span>
                  </div>
                  <div v-if="selectedEvent.location" class="flex items-center gap-3 text-primary-gray/70">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                    </svg>
                    <span>{{ selectedEvent.location }}</span>
                  </div>
                  <div v-if="selectedEvent.organizer" class="flex items-center gap-3 text-primary-gray/70">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
                    </svg>
                    <span>{{ selectedEvent.organizer }}</span>
                  </div>
                </div>

                <div class="prose max-w-none">
                  <p class="text-primary-gray/80 leading-relaxed whitespace-pre-wrap">
                    {{ selectedEvent.description }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { CalendarEvent } from '~/types/calendar'

// SEO Meta Tags
useSeoMeta({
  title: 'Kalender Acara',
  description: 'Jadwal dan acara terbaru SMK Plus Pelita Nusantara',
})

const { events, loading, error, fetchEvents } = useEvents()
const selectedCategory = ref<string>('all')
const viewMode = ref<'grid' | 'list'>('grid')
const selectedEvent = ref<CalendarEvent | null>(null)

const categories = [
  { label: 'Semua', value: 'all' },
  { label: 'Akademik', value: 'akademik' },
  { label: 'Non-Akademik', value: 'non-akademik' },
  { label: 'Kunjungan', value: 'tamu' },
  { label: 'Lainnya', value: 'lainnya' }
]

const filteredEvents = computed(() => {
  if (selectedCategory.value === 'all') {
    return events.value
  }
  return events.value.filter(event =>
    event.category?.toLowerCase() === selectedCategory.value.toLowerCase()
  )
})

const formatDateRange = (event: CalendarEvent) => {
  const startDate = event.start_date || event.event_date
  const endDate = event.end_date

  if (!startDate) return ''

  const start = new Date(startDate)
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des']

  if (!endDate || startDate === endDate) {
    return `${start.getDate()} ${monthNames[start.getMonth()]} ${start.getFullYear()}`
  }

  const end = new Date(endDate)
  return `${start.getDate()} ${monthNames[start.getMonth()]} - ${end.getDate()} ${monthNames[end.getMonth()]} ${end.getFullYear()}`
}

const openEventDetail = (event: CalendarEvent) => {
  selectedEvent.value = event
}

const closeEventDetail = () => {
  selectedEvent.value = null
}

// Fetch events on mount
onMounted(async () => {
  await fetchEvents()
})
</script>

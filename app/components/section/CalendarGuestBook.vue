<template>
  <div class="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <!-- Calendar & Event List Section -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
      <!-- Calendar -->
      <div class="bg-primary-white border border-primary-gray/20 rounded-3xl overflow-hidden shadow-lg p-6">
        <div class="mb-4 flex items-center justify-between">
          <h2 class="text-xl font-bold text-primary-gray">
            Kalender Pendidikan {{ currentYear }}
          </h2>
          <div class="flex items-center gap-2">
            <button
              @click="previousMonth"
              class="p-2 hover:bg-primary-gray/10 rounded-full transition-colors">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
              </svg>
            </button>
            <span class="text-sm font-semibold min-w-[140px] text-center">
              {{ monthNames[currentMonth] }} {{ currentYear }}
            </span>
            <button
              @click="nextMonth"
              class="p-2 hover:bg-primary-gray/10 rounded-full transition-colors">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
              </svg>
            </button>
          </div>
        </div>

        <!-- Calendar Grid -->
        <div class="grid grid-cols-7 gap-1">
          <!-- Day Headers -->
          <div
            v-for="day in dayNames"
            :key="day"
            class="text-center text-xs font-semibold text-primary-gray/60 py-2">
            {{ day }}
          </div>

          <!-- Calendar Days -->
          <button
            v-for="(date, index) in calendarDays"
            :key="index"
            @click="selectDate(date)"
            :disabled="!date.isCurrentMonth"
            :class="[
              'aspect-square p-1 text-sm rounded-lg transition-all relative',
              date.isCurrentMonth ? 'hover:bg-primary-gray/10' : 'text-primary-gray/30',
              date.isToday ? 'bg-secondary-red/10 font-bold' : '',
              selectedDate === date.dateString ? 'bg-secondary-red text-primary-white font-bold' : '',
              date.hasEvent ? 'font-semibold' : ''
            ]">
            <span>{{ date.day }}</span>
            <span
              v-if="date.hasEvent && selectedDate !== date.dateString"
              class="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-secondary-red rounded-full">
            </span>
          </button>
        </div>
      </div>

      <!-- Event List -->
      <div class="bg-primary-white border border-primary-gray/20 rounded-3xl overflow-hidden shadow-lg p-6">
        <h2 class="text-xl font-bold text-primary-gray mb-4">Buku Tamu</h2>

        <div v-if="eventsForSelectedDate.length > 0" class="space-y-3 max-h-[400px] overflow-y-auto">
          <div
            v-for="event in eventsForSelectedDate"
            :key="event.id"
            class="flex items-center justify-between p-4 bg-primary-gray/5 rounded-xl hover:bg-primary-gray/10 transition-colors group cursor-pointer"
            @click="openEventDetail(event)">
            <div class="flex-1">
              <h3 class="font-semibold text-primary-gray mb-1">{{ event.title }}</h3>
              <p class="text-xs text-primary-gray/60">{{ formatEventDate(event.event_date) }}</p>
            </div>
            <button
              class="p-2 hover:bg-secondary-red/10 rounded-full transition-colors group-hover:bg-secondary-red/20">
              <svg class="w-5 h-5 text-secondary-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
              </svg>
            </button>
          </div>
        </div>

        <div v-else class="text-center py-12">
          <svg class="w-16 h-16 mx-auto text-primary-gray/30 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
          </svg>
          <p class="text-primary-gray/60">Tidak ada acara di tanggal ini</p>
        </div>
      </div>
    </div>

    <!-- Expand/Collapse Button -->
    <div class="flex justify-center mb-4">
      <button
        @click="toggleGuestBookForm"
        class="inline-flex items-center gap-2 px-6 py-3 bg-primary-white border-2 border-primary-gray/20 text-primary-gray rounded-full font-semibold hover:bg-primary-gray/5 hover:border-secondary-red/30 hover:text-secondary-red transition-all">
        <span>{{ isFormExpanded ? 'Tutup' : 'Buka' }} Form Buku Tamu</span>
        <svg
          class="w-5 h-5 transition-transform duration-300"
          :class="{ 'rotate-180': isFormExpanded }"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
        </svg>
      </button>
    </div>

    <!-- Guest Book Form (Expandable) -->
    <transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="max-h-0 opacity-0"
      enter-to-class="max-h-[1000px] opacity-100"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="max-h-[1000px] opacity-100"
      leave-to-class="max-h-0 opacity-0">
      <div v-if="isFormExpanded" class="overflow-hidden">
        <div class="bg-primary-white border border-primary-gray/20 rounded-3xl shadow-lg p-6 md:p-8">
          <h3 class="text-2xl font-bold text-primary-gray mb-6">Form Buku Tamu</h3>

          <form @submit.prevent="submitGuestBook" class="space-y-4">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <!-- Title -->
              <div>
                <label class="block text-sm font-semibold text-primary-gray mb-2">
                  Judul <span class="text-secondary-red">*</span>
                </label>
                <input
                  v-model="guestBookForm.title"
                  type="text"
                  required
                  class="w-full px-4 py-3 border border-primary-gray/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary-red/50 focus:border-secondary-red transition-all"
                  placeholder="Masukkan judul">
              </div>

              <!-- Instance Name -->
              <div>
                <label class="block text-sm font-semibold text-primary-gray mb-2">
                  Nama Instansi <span class="text-secondary-red">*</span>
                </label>
                <input
                  v-model="guestBookForm.instance_name"
                  type="text"
                  required
                  class="w-full px-4 py-3 border border-primary-gray/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary-red/50 focus:border-secondary-red transition-all"
                  placeholder="Nama instansi Anda">
              </div>

              <!-- Contact Person -->
              <div>
                <label class="block text-sm font-semibold text-primary-gray mb-2">
                  Nama PIC <span class="text-secondary-red">*</span>
                </label>
                <input
                  v-model="guestBookForm.contact_person"
                  type="text"
                  required
                  class="w-full px-4 py-3 border border-primary-gray/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary-red/50 focus:border-secondary-red transition-all"
                  placeholder="Nama person in charge">
              </div>

              <!-- Email -->
              <div>
                <label class="block text-sm font-semibold text-primary-gray mb-2">
                  Email <span class="text-secondary-red">*</span>
                </label>
                <input
                  v-model="guestBookForm.email"
                  type="email"
                  required
                  class="w-full px-4 py-3 border border-primary-gray/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary-red/50 focus:border-secondary-red transition-all"
                  placeholder="email@example.com">
              </div>

              <!-- Phone -->
              <div>
                <label class="block text-sm font-semibold text-primary-gray mb-2">
                  No WhatsApp <span class="text-secondary-red">*</span>
                </label>
                <input
                  v-model="guestBookForm.phone"
                  type="tel"
                  required
                  class="w-full px-4 py-3 border border-primary-gray/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary-red/50 focus:border-secondary-red transition-all"
                  placeholder="08xxxxxxxxxx">
              </div>

              <!-- Request Date -->
              <div>
                <label class="block text-sm font-semibold text-primary-gray mb-2">
                  Tanggal Acara Diajukan <span class="text-secondary-red">*</span>
                </label>
                <input
                  v-model="guestBookForm.request_date"
                  type="date"
                  required
                  class="w-full px-4 py-3 border border-primary-gray/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary-red/50 focus:border-secondary-red transition-all text-base text-primary-gray cursor-pointer hover:border-primary-gray/40 date-input">
              </div>
            </div>

            <!-- Description -->
            <div>
              <label class="block text-sm font-semibold text-primary-gray mb-2">
                Deskripsi <span class="text-secondary-red">*</span>
              </label>
              <textarea
                v-model="guestBookForm.description"
                required
                rows="4"
                class="w-full px-4 py-3 border border-primary-gray/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary-red/50 focus:border-secondary-red transition-all resize-none"
                placeholder="Tulis pesan atau keperluan Anda...">
              </textarea>
            </div>

            <!-- Submit Button -->
            <div class="flex items-center gap-4">
              <button
                type="submit"
                :disabled="isSubmitting"
                class="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-secondary-red to-secondary-red/90 text-primary-white rounded-full font-semibold hover:from-secondary-red/90 hover:to-secondary-red hover:shadow-xl transition-all duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed">
                <svg v-if="isSubmitting" class="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>{{ isSubmitting ? 'Mengirim...' : 'Kirim Buku Tamu' }}</span>
              </button>

              <button
                v-if="submitStatus === 'success'"
                type="button"
                class="text-green-600 text-sm font-semibold flex items-center gap-1">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                </svg>
                Terkirim!
              </button>

              <button
                v-if="submitStatus === 'error'"
                type="button"
                class="text-red-600 text-sm font-semibold flex items-center gap-1">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/>
                </svg>
                Gagal terkirim
              </button>
            </div>
          </form>
        </div>
      </div>
    </transition>

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
          class="bg-primary-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div class="relative">
            <button
              @click="closeEventDetail"
              class="absolute top-4 right-4 z-10 p-2 bg-primary-white/90 rounded-full hover:bg-primary-white transition-colors">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>

            <div class="aspect-video bg-primary-gray/20 rounded-t-3xl overflow-hidden">
              <img
                :src="selectedEvent.image"
                :alt="selectedEvent.title"
                class="w-full h-full object-cover">
            </div>

            <div class="p-6 md:p-8">
              <h3 class="text-2xl md:text-3xl font-bold text-primary-gray mb-3">
                {{ selectedEvent.title }}
              </h3>
              <p class="text-sm text-primary-gray/60 mb-6">
                {{ formatEventDate(selectedEvent.event_date) }}
              </p>
              <p class="text-primary-gray/80 leading-relaxed">
                {{ selectedEvent.description }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import type { CalendarEvent } from '~/types/calendar'

const props = defineProps<{
  events?: CalendarEvent[]
}>()

// Use composables
const { events: apiEvents, loading: eventsLoading, fetchEvents, getEventsByDate } = useEvents()
const { createGuestBook, loading: guestBookLoading } = useGuestBook()

// Use events from props or API
const allEvents = computed(() => props.events || apiEvents.value)

const monthNames = [
  'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
  'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
]

const dayNames = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab']

const currentDate = new Date()
const currentMonth = ref(currentDate.getMonth())
const currentYear = ref(currentDate.getFullYear())
const selectedDate = ref<string | null>(null)
const selectedEvent = ref<CalendarEvent | null>(null)
const isFormExpanded = ref(false)
const isSubmitting = ref(false)
const submitStatus = ref<'idle' | 'success' | 'error'>('idle')

const guestBookForm = ref({
  title: '',
  instance_name: '',
  contact_person: '',
  email: '',
  phone: '',
  request_date: '',
  description: ''
})

interface CalendarDay {
  day: number
  dateString: string
  isCurrentMonth: boolean
  isToday: boolean
  hasEvent: boolean
}

const calendarDays = computed<CalendarDay[]>(() => {
  const year = currentYear.value
  const month = currentMonth.value
  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)
  const daysInMonth = lastDay.getDate()
  const startingDayOfWeek = firstDay.getDay()

  const days: CalendarDay[] = []

  // Previous month days
  const prevMonthLastDay = new Date(year, month, 0).getDate()
  for (let i = startingDayOfWeek - 1; i >= 0; i--) {
    const day = prevMonthLastDay - i
    const dateString = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`
    days.push({
      day,
      dateString,
      isCurrentMonth: false,
      isToday: false,
      hasEvent: false
    })
  }

  // Current month days
  for (let day = 1; day <= daysInMonth; day++) {
    const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
    const isToday =
      day === currentDate.getDate() &&
      month === currentDate.getMonth() &&
      year === currentDate.getFullYear()

    const hasEvent = allEvents.value.some(event => {
      const eventDate = event.event_date || event.start_date
      const endDate = event.end_date || eventDate
      return dateString >= eventDate && dateString <= endDate
    })

    days.push({
      day,
      dateString,
      isCurrentMonth: true,
      isToday,
      hasEvent
    })
  }

  // Next month days to fill the grid
  const remainingDays = 42 - days.length // 6 rows * 7 days
  for (let day = 1; day <= remainingDays; day++) {
    const dateString = `${year}-${String(month + 2).padStart(2, '0')}-${String(day).padStart(2, '0')}`
    days.push({
      day,
      dateString,
      isCurrentMonth: false,
      isToday: false,
      hasEvent: false
    })
  }

  return days
})

const eventsForSelectedDate = computed(() => {
  if (!selectedDate.value) return []

  // Use getEventsByDate from composable which handles date ranges
  const eventsOnDate = getEventsByDate(selectedDate.value)

  // Fallback to simple filter for backward compatibility
  if (eventsOnDate.length === 0) {
    return allEvents.value.filter(event => event.event_date === selectedDate.value)
  }

  return eventsOnDate
})

const previousMonth = () => {
  if (currentMonth.value === 0) {
    currentMonth.value = 11
    currentYear.value--
  } else {
    currentMonth.value--
  }
}

const nextMonth = () => {
  if (currentMonth.value === 11) {
    currentMonth.value = 0
    currentYear.value++
  } else {
    currentMonth.value++
  }
}

const selectDate = (date: CalendarDay) => {
  if (!date.isCurrentMonth) return
  selectedDate.value = date.dateString
}

const formatEventDate = (dateString: string) => {
  const date = new Date(dateString)
  const day = date.getDate()
  const month = monthNames[date.getMonth()]
  const year = date.getFullYear()
  return `${day} ${month} ${year}`
}

const openEventDetail = (event: CalendarEvent) => {
  selectedEvent.value = event
}

const closeEventDetail = () => {
  selectedEvent.value = null
}

const toggleGuestBookForm = () => {
  isFormExpanded.value = !isFormExpanded.value
}

const submitGuestBook = async () => {
  isSubmitting.value = true
  submitStatus.value = 'idle'

  try {
    // Call API to create guest book entry
    const result = await createGuestBook(guestBookForm.value)

    if (result.success) {
      console.log('Guest Book Submitted Successfully:', result.data)
      submitStatus.value = 'success'

      // Reset form after 2 seconds
      setTimeout(() => {
        guestBookForm.value = {
          title: '',
          instance_name: '',
          contact_person: '',
          email: '',
          phone: '',
          request_date: '',
          description: ''
        }
        submitStatus.value = 'idle'
        isFormExpanded.value = false
      }, 2000)
    } else {
      throw new Error(result.error || 'Gagal mengirim buku tamu')
    }

  } catch (error: any) {
    console.error('Error submitting guest book:', error)
    submitStatus.value = 'error'

    setTimeout(() => {
      submitStatus.value = 'idle'
    }, 3000)
  } finally {
    isSubmitting.value = false
  }
}

// Auto-select today's date on mount and fetch events if not provided via props
onMounted(async () => {
  const today = `${currentYear.value}-${String(currentMonth.value + 1).padStart(2, '0')}-${String(currentDate.getDate()).padStart(2, '0')}`
  selectedDate.value = today

  // Fetch events from API if not provided via props
  if (!props.events || props.events.length === 0) {
    await fetchEvents()
  }
})
</script>

<style scoped>
/* Custom scrollbar for event list */
.overflow-y-auto::-webkit-scrollbar {
  width: 6px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: transparent;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: #cbd5e0;
  border-radius: 3px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: #a0aec0;
}

/* Custom date input styling */
.date-input {
  position: relative;
  font-size: 1rem;
  line-height: 1.5;
  min-height: 48px;
  color-scheme: light;
}

.date-input::-webkit-calendar-picker-indicator {
  cursor: pointer;
  padding: 4px;
  border-radius: 6px;
  transition: all 0.2s;
  width: 20px;
  height: 20px;
  opacity: 0.6;
}

.date-input::-webkit-calendar-picker-indicator:hover {
  background-color: rgba(239, 68, 68, 0.1);
  opacity: 1;
}

.date-input::-webkit-datetime-edit {
  padding: 0;
  display: flex;
  align-items: center;
}

.date-input::-webkit-datetime-edit-fields-wrapper {
  padding: 0;
}

.date-input::-webkit-datetime-edit-text {
  padding: 0 0.25rem;
}

.date-input::-webkit-datetime-edit-month-field,
.date-input::-webkit-datetime-edit-day-field,
.date-input::-webkit-datetime-edit-year-field {
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  transition: all 0.2s;
}

.date-input::-webkit-datetime-edit-month-field:hover,
.date-input::-webkit-datetime-edit-day-field:hover,
.date-input::-webkit-datetime-edit-year-field:hover {
  background-color: rgba(239, 68, 68, 0.05);
}

.date-input::-webkit-datetime-edit-month-field:focus,
.date-input::-webkit-datetime-edit-day-field:focus,
.date-input::-webkit-datetime-edit-year-field:focus {
  background-color: rgba(239, 68, 68, 0.1);
  outline: none;
}
</style>

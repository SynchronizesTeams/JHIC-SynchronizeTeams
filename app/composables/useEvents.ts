import type { CalendarEvent } from '~/types/calendar'

export const useEvents = () => {
  const api = useApi()
  const events = ref<CalendarEvent[]>([])
  const selectedEvent = ref<CalendarEvent | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  // Fetch all events
  const fetchEvents = async () => {
    loading.value = true
    error.value = null

    try {
      const response = await api.event.getAll()
      events.value = response.data || []
      return events.value
    } catch (err: any) {
      error.value = err.message || 'Gagal memuat acara'
      console.error('Error fetching events:', err)
      return []
    } finally {
      loading.value = false
    }
  }

  // Fetch event by ID
  const fetchEventById = async (id: number) => {
    loading.value = true
    error.value = null

    try {
      const response = await api.event.getById(id)
      selectedEvent.value = response.data || null
      return selectedEvent.value
    } catch (err: any) {
      error.value = err.message || 'Gagal memuat detail acara'
      console.error('Error fetching event:', err)
      return null
    } finally {
      loading.value = false
    }
  }

  // Fetch events by category
  const fetchEventsByCategory = async (category: string) => {
    loading.value = true
    error.value = null

    try {
      const response = await api.event.getByCategory(category)
      events.value = response.data || []
      return events.value
    } catch (err: any) {
      error.value = err.message || 'Gagal memuat acara'
      console.error('Error fetching events by category:', err)
      return []
    } finally {
      loading.value = false
    }
  }

  // Create new event
  const createEvent = async (eventData: {
    title: string
    description: string
    category: string
    start_date: string
    end_date: string
    location: string
    organizer: string
    image?: File
  }) => {
    loading.value = true
    error.value = null

    try {
      const response = await api.event.create(eventData)

      // Refresh events list after creating
      await fetchEvents()

      return { success: true, data: response.data }
    } catch (err: any) {
      error.value = err.message || 'Gagal membuat acara'
      console.error('Error creating event:', err)
      return { success: false, error: error.value }
    } finally {
      loading.value = false
    }
  }

  // Update event
  const updateEvent = async (id: number, eventData: {
    title: string
    description: string
    category: string
    start_date: string
    end_date: string
    location: string
    organizer: string
    image?: File
  }) => {
    loading.value = true
    error.value = null

    try {
      const response = await api.event.update(id, eventData)

      // Refresh events list after updating
      await fetchEvents()

      return { success: true, data: response.data }
    } catch (err: any) {
      error.value = err.message || 'Gagal memperbarui acara'
      console.error('Error updating event:', err)
      return { success: false, error: error.value }
    } finally {
      loading.value = false
    }
  }

  // Delete event
  const deleteEvent = async (id: number) => {
    loading.value = true
    error.value = null

    try {
      await api.event.delete(id)

      // Remove from local state
      events.value = events.value.filter(event => event.id !== id)

      return { success: true }
    } catch (err: any) {
      error.value = err.message || 'Gagal menghapus acara'
      console.error('Error deleting event:', err)
      return { success: false, error: error.value }
    } finally {
      loading.value = false
    }
  }

  // Get events for specific date
  const getEventsByDate = (date: string) => {
    return events.value.filter(event => {
      // Check if date falls between start_date and end_date
      const eventStartDate = event.event_date || event.start_date
      const eventEndDate = event.end_date || event.event_date || event.start_date

      return date >= eventStartDate && date <= eventEndDate
    })
  }

  // Get upcoming events
  const getUpcomingEvents = (limit?: number) => {
    const today = new Date().toISOString().split('T')[0]
    const upcoming = events.value
      .filter(event => {
        const eventDate = event.event_date || event.start_date
        return eventDate >= today
      })
      .sort((a, b) => {
        const dateA = a.event_date || a.start_date
        const dateB = b.event_date || b.start_date
        return dateA.localeCompare(dateB)
      })

    return limit ? upcoming.slice(0, limit) : upcoming
  }

  return {
    events,
    selectedEvent,
    loading,
    error,
    fetchEvents,
    fetchEventById,
    fetchEventsByCategory,
    createEvent,
    updateEvent,
    deleteEvent,
    getEventsByDate,
    getUpcomingEvents
  }
}

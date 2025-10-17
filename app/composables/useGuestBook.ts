import type { GuestBook } from '~/types/calendar'

export const useGuestBook = () => {
  const api = useApi()
  const guestBooks = ref<GuestBook[]>([])
  const selectedGuestBook = ref<GuestBook | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  // Fetch all guest books
  const fetchGuestBooks = async () => {
    loading.value = true
    error.value = null

    try {
      const response = await api.guestBook.getAll()
      guestBooks.value = response.data || []
      return guestBooks.value
    } catch (err: any) {
      error.value = err.message || 'Gagal memuat buku tamu'
      console.error('Error fetching guest books:', err)
      return []
    } finally {
      loading.value = false
    }
  }

  // Fetch guest book by ID
  const fetchGuestBookById = async (id: number) => {
    loading.value = true
    error.value = null

    try {
      const response = await api.guestBook.getById(id)
      selectedGuestBook.value = response.data || null
      return selectedGuestBook.value
    } catch (err: any) {
      error.value = err.message || 'Gagal memuat detail buku tamu'
      console.error('Error fetching guest book:', err)
      return null
    } finally {
      loading.value = false
    }
  }

  // Create new guest book entry
  const createGuestBook = async (guestBookData: {
    title: string
    instance_name: string
    contact_person: string
    email: string
    phone: string
    request_date: string
    description: string
  }) => {
    loading.value = true
    error.value = null

    try {
      const response = await api.guestBook.create(guestBookData)

      // Optionally refresh list after creating
      // await fetchGuestBooks()

      return { success: true, data: response.data }
    } catch (err: any) {
      error.value = err.message || 'Gagal mengirim buku tamu'
      console.error('Error creating guest book:', err)
      return { success: false, error: error.value }
    } finally {
      loading.value = false
    }
  }

  // Update guest book status
  const updateGuestBookStatus = async (id: number, status: 'pending' | 'approved' | 'rejected') => {
    loading.value = true
    error.value = null

    try {
      const response = await api.guestBook.updateStatus(id, status)

      // Update local state
      const index = guestBooks.value.findIndex(gb => gb.id === id)
      if (index !== -1) {
        guestBooks.value[index].status = status
      }

      return { success: true, data: response.data }
    } catch (err: any) {
      error.value = err.message || 'Gagal memperbarui status'
      console.error('Error updating guest book status:', err)
      return { success: false, error: error.value }
    } finally {
      loading.value = false
    }
  }

  // Get pending guest books
  const getPendingGuestBooks = () => {
    return guestBooks.value.filter(gb => gb.status === 'pending' || !gb.status)
  }

  // Get approved guest books
  const getApprovedGuestBooks = () => {
    return guestBooks.value.filter(gb => gb.status === 'approved')
  }

  // Get guest books by date range
  const getGuestBooksByDateRange = (startDate: string, endDate: string) => {
    return guestBooks.value.filter(gb => {
      return gb.request_date >= startDate && gb.request_date <= endDate
    })
  }

  return {
    guestBooks,
    selectedGuestBook,
    loading,
    error,
    fetchGuestBooks,
    fetchGuestBookById,
    createGuestBook,
    updateGuestBookStatus,
    getPendingGuestBooks,
    getApprovedGuestBooks,
    getGuestBooksByDateRange
  }
}

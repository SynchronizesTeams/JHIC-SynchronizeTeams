export interface SchoolPortal {
  id: number
  name: string
  title?: string
  description: string
  url: string
  logo: string
  category: string
  is_sso_enabled: boolean
  is_active: boolean
  order?: number
  icon?: string | File
  created_at: string
  updated_at?: string
}

export const usePortals = () => {
  const api = useApi()
  const { token } = useAuth()
  
  // State
  const portals = ref<SchoolPortal[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  // Fetch all portals (public endpoint, no auth required)
  const fetchPortals = async () => {
    isLoading.value = true
    error.value = null
    
    try {
      const response: any = await api.portal.getAll()
      
      // Transform response and construct full logo URLs
      const config = useRuntimeConfig()
      const BASE_URL = config.public.apiBaseUrl.replace('/api', '') // Remove /api suffix
      
      const transformedPortals = (response || []).map((portal: any) => ({
        ...portal,
        title: portal.name, // Map name to title for backward compatibility
        logo: portal.logo.startsWith('http') 
          ? portal.logo 
          : `${BASE_URL}/${portal.logo}`,
        icon: getPortalIcon(portal.category, portal.name)
      }))
      
      portals.value = transformedPortals
      return portals.value
    } catch (err: any) {
      error.value = err.data?.message || 'Failed to fetch portals'
      console.error('Error fetching portals:', err)
      // Return empty array instead of throwing
      portals.value = []
      return []
    } finally {
      isLoading.value = false
    }
  }

  // Helper function to get icon emoji based on category and name
  const getPortalIcon = (category: string, name: string): string => {
    const nameLower = name.toLowerCase()
    const categoryLower = category.toLowerCase()

    // Social media icons
    if (nameLower.includes('instagram')) return '📷'
    if (nameLower.includes('facebook')) return '👥'
    if (nameLower.includes('twitter') || nameLower.includes('x')) return '🐦'
    if (nameLower.includes('youtube')) return '▶️'
    if (nameLower.includes('tiktok')) return '🎵'
    if (nameLower.includes('whatsapp')) return '💬'
    if (nameLower.includes('linkedin')) return '💼'
    
    // Learning platforms
    if (nameLower.includes('learning') || nameLower.includes('lms')) return '📚'
    if (nameLower.includes('classroom')) return '🏫'
    if (nameLower.includes('moodle')) return '🎓'
    
    // Other services
    if (nameLower.includes('library') || nameLower.includes('perpustakaan')) return '📖'
    if (nameLower.includes('email') || nameLower.includes('mail')) return '✉️'
    if (nameLower.includes('drive') || nameLower.includes('storage')) return '💾'
    if (nameLower.includes('calendar')) return '📅'
    if (nameLower.includes('news') || nameLower.includes('berita')) return '📰'
    
    // Category-based fallback
    if (categoryLower.includes('social')) return '🌐'
    if (categoryLower.includes('education')) return '📚'
    if (categoryLower.includes('admin')) return '⚙️'
    
    // Default
    return '🔗'
  }

  // Create new portal (admin only)
  const createPortal = async (portalData: Omit<SchoolPortal, 'id'>) => {
    if (!token.value) {
      error.value = 'Authentication required'
      return
    }

    isLoading.value = true
    error.value = null

    try {
      const response: any = await api.portal.create(portalData)
      
      // Refresh portals after creation
      await fetchPortals()
      
      return response
    } catch (err: any) {
      error.value = err.data?.message || 'Failed to create portal'
      console.error('Error creating portal:', err)
      throw err
    } finally {
      isLoading.value = false
    }
  }

  // Update existing portal (admin only)
  const updatePortal = async (id: number, portalData: Omit<SchoolPortal, 'id'>) => {
    if (!token.value) {
      error.value = 'Authentication required'
      return
    }

    isLoading.value = true
    error.value = null

    try {
      const response: any = await api.portal.update(id, portalData)
      
      // Refresh portals after update
      await fetchPortals()
      
      return response
    } catch (err: any) {
      error.value = err.data?.message || 'Failed to update portal'
      console.error('Error updating portal:', err)
      throw err
    } finally {
      isLoading.value = false
    }
  }

  // Delete portal (admin only)
  const deletePortal = async (id: number) => {
    if (!token.value) {
      error.value = 'Authentication required'
      return
    }

    isLoading.value = true
    error.value = null

    try {
      const response = await api.portal.delete(id)
      
      // Remove from local state
      portals.value = portals.value.filter(portal => portal.id !== id)
      
      return response
    } catch (err: any) {
      error.value = err.data?.message || 'Failed to delete portal'
      console.error('Error deleting portal:', err)
      throw err
    } finally {
      isLoading.value = false
    }
  }

  // Get portal by ID
  const getPortalById = async (id: number) => {
    isLoading.value = true
    error.value = null

    try {
      const response: any = await api.portal.getById(id)
      return response.data || response
    } catch (err: any) {
      error.value = err.data?.message || 'Failed to fetch portal'
      console.error('Error fetching portal:', err)
      throw err
    } finally {
      isLoading.value = false
    }
  }

  return {
    // State
    portals: readonly(portals),
    isLoading: readonly(isLoading),
    error: readonly(error),
    
    // Methods
    fetchPortals,
    createPortal,
    updatePortal,
    deletePortal,
    getPortalById
  }
}

export interface SchoolPortal {
  id?: number
  title: string
  url: string
  order?: number
  is_active?: boolean
  icon?: string | File
  created_at?: string
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
      const config = useRuntimeConfig()
      const BASE_URL = config.public.apiBase
      
      // Use public endpoint that doesn't require auth
      const response: any = await $fetch(`${BASE_URL}/api/v1/public/portal/showAll`, {
        method: 'GET'
      })
      
      portals.value = response.data || []
      return portals.value
    } catch (err: any) {
      // If public endpoint doesn't exist, try with auth
      try {
        const response: any = await api.portal.getAll()
        portals.value = response.data || []
        return portals.value
      } catch (authErr: any) {
        error.value = authErr.data?.message || 'Failed to fetch portals'
        console.error('Error fetching portals:', authErr)
        // Return empty array instead of throwing
        portals.value = []
        return []
      }
    } finally {
      isLoading.value = false
    }
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

export interface UserLink {
  id?: number
  title: string
  url: string
  icon?: string | File
  user_id?: number
  created_at?: string
  updated_at?: string
}

export const useUserLinks = () => {
  const api = useApi()
  const { token } = useAuth()
  
  // State
  const userLinks = ref<UserLink[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  // Fetch user links
  const fetchUserLinks = async () => {
    if (!token.value) {
      error.value = 'Authentication required'
      return
    }

    isLoading.value = true
    error.value = null
    
    try {
      const response: any = await api.userLinks.getSelf()
      const links = response.data || []
      
      // Add locally stored icons to links
      userLinks.value = links.map((link: UserLink) => ({
        ...link,
        icon: localStorage.getItem(`userlink_icon_${link.title}`) || link.icon || ''
      }))
      
      return userLinks.value
    } catch (err: any) {
      error.value = err.data?.message || 'Failed to fetch user links'
      console.error('Error fetching user links:', err)
      throw err
    } finally {
      isLoading.value = false
    }
  }

  // Create new user link
  const createUserLink = async (linkData: Omit<UserLink, 'id'>) => {
    if (!token.value) {
      error.value = 'Authentication required'
      return
    }

    isLoading.value = true
    error.value = null

    try {
      const response: any = await api.userLinks.create(linkData)
      
      // Refresh links after creation
      await fetchUserLinks()
      
      return response
    } catch (err: any) {
      error.value = err.data?.message || 'Failed to create user link'
      console.error('Error creating user link:', err)
      throw err
    } finally {
      isLoading.value = false
    }
  }

  // Update existing user link
  const updateUserLink = async (id: number, linkData: Omit<UserLink, 'id'>) => {
    if (!token.value) {
      error.value = 'Authentication required'
      return
    }

    isLoading.value = true
    error.value = null

    try {
      const response: any = await api.userLinks.update(id, linkData)
      
      // Refresh links after update
      await fetchUserLinks()
      
      return response
    } catch (err: any) {
      error.value = err.data?.message || 'Failed to update user link'
      console.error('Error updating user link:', err)
      throw err
    } finally {
      isLoading.value = false
    }
  }

  // Delete user link
  const deleteUserLink = async (id: number) => {
    if (!token.value) {
      error.value = 'Authentication required'
      return
    }

    isLoading.value = true
    error.value = null

    try {
      const response = await api.userLinks.delete(id)
      
      // Remove from local state
      userLinks.value = userLinks.value.filter(link => link.id !== id)
      
      return response
    } catch (err: any) {
      error.value = err.data?.message || 'Failed to delete user link'
      console.error('Error deleting user link:', err)
      throw err
    } finally {
      isLoading.value = false
    }
  }

  return {
    // State
    userLinks: readonly(userLinks),
    isLoading: readonly(isLoading),
    error: readonly(error),
    
    // Methods
    fetchUserLinks,
    createUserLink,
    updateUserLink,
    deleteUserLink
  }
}

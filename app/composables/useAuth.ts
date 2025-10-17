// composables/useAuth.ts
import type { User } from '~/types/user'

interface LoginCredentials {
  email: string
  password: string
}

interface ProfileData {
  name?: string
  no_induk?: string
  role?: string
  phone?: string
  alamat?: string
  tahun_ajaran_mulai?: string
  jabatan?: string
  email?: string
  password?: string
  photo_url?: File | string
}

export const useAuth = () => {
  const token = useState<string>('token', () => '');
  const user = useState<User | null>('user', () => null);

  const setToken = (newToken: string) => {
    token.value = newToken;
    // Simpan token di localStorage atau cookie jika perlu
    if (process.client) {
      localStorage.setItem('user_token', newToken);
    }
  };

  const setUser = (userData: User) => {
    user.value = userData;
    if (process.client) {
      localStorage.setItem('user_data', JSON.stringify(userData));
    }
  };

  const logout = () => {
    token.value = '';
    user.value = null;
    if (process.client) {
      localStorage.removeItem('user_token');
      localStorage.removeItem('user_data');
    }
  };

  const login = async (credentials: LoginCredentials) => {
    const api = useApi()

    try {
      const response: any = await api.auth.login(credentials)

      if (response.token) {
        setToken(response.token)

        // Fetch user profile
        try {
          const profileResponse: any = await api.auth.profile()
          const userData = profileResponse.data || profileResponse
          setUser(userData)
          return { success: true, user: userData }
        } catch (error) {
          console.error('Error fetching profile:', error)
          return { success: true, user: null }
        }
      }

      return { success: false, error: 'No token received' }
    } catch (error: any) {
      console.error('Login error:', error)
      return {
        success: false,
        error: error.data?.message || error.message || 'Login failed'
      }
    }
  }

  const checkAuth = async () => {
    if (!token.value) return false

    try {
      const api = useApi()
      const response: any = await api.auth.profile()
      const userData = response.data || response
      setUser(userData)
      return true
    } catch (error) {
      console.error('Auth check failed:', error)
      logout()
      return false
    }
  }

  const editProfile = async (profileData: ProfileData) => {
    if (!token.value) {
      return { success: false, error: 'Not authenticated' }
    }

    const api = useApi()

    try {
      const response: any = await api.auth.editProfile(profileData)

      // Update local user data after successful edit
      if (response.success !== false) {
        // Fetch updated profile
        const profileResponse: any = await api.auth.profile()
        const userData = profileResponse.data || profileResponse
        setUser(userData)
        return { success: true, data: userData }
      }

      return { success: false, error: response.message || 'Failed to update profile' }
    } catch (error: any) {
      console.error('Edit profile error:', error)
      return {
        success: false,
        error: error.data?.message || error.message || 'Failed to update profile'
      }
    }
  }

  // Initialize token dan user dari localStorage
  if (process.client) {
    const savedToken = localStorage.getItem('user_token');
    const savedUser = localStorage.getItem('user_data');

    if (savedToken) {
      token.value = savedToken;
    }

    if (savedUser) {
      try {
        user.value = JSON.parse(savedUser);
      } catch (error) {
        console.error('Error parsing saved user data:', error);
      }
    }
  }

  return {
    token: readonly(token),
    user: readonly(user),
    setToken,
    setUser,
    logout,
    login,
    editProfile,
    checkAuth,
    isAuthenticated: computed(() => !!token.value)
  };
};
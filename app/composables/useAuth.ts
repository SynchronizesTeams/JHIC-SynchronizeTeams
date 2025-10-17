// composables/useAuth.ts
export const useAuth = () => {
  const token = useState<string>('token', () => '');
  const user = useState<any>('user', () => null);

  const setToken = (newToken: string) => {
    token.value = newToken;
    // Simpan token di localStorage atau cookie jika perlu
    if (process.client) {
      localStorage.setItem('user_token', newToken);
    }
  };

  const setUser = (userData: any) => {
    user.value = userData;
  };

  const logout = () => {
    token.value = '';
    user.value = null;
    if (process.client) {
      localStorage.removeItem('user_token');
    }
  };

  // Initialize token dari localStorage
  if (process.client) {
    const savedToken = localStorage.getItem('user_token');
    if (savedToken) {
      token.value = savedToken;
    }
  }

  return {
    token: readonly(token),
    user: readonly(user),
    setToken,
    setUser,
    logout
  };
};
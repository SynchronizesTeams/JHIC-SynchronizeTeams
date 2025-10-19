export interface User {
  id: number
  no_induk: string
  name: string
  email: string
  username?: string
  role: 'siswa' | 'guru' | 'alumni' | 'admin'
  photo_url?: string
  phone: string
  alamat: string
  jabatan: string
  tahun_ajaran_mulai: string
}

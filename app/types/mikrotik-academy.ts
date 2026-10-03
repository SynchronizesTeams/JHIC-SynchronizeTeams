export interface AcademyImage {
  src: string
  alt: string
}

export interface AcademySeo {
  title: string
  ogTitle: string
  description: string
  canonical: string
}

export interface AcademyHero {
  judulUtama: string
  subjudul: string
  deskripsi: string
  gambar: AcademyImage
  cta: { label: string; href: string }
  kredensial: string[]
}

export interface AcademySubbagian {
  judul: string
  teks: string
}

export interface AcademySertifikasi {
  judul: string
  teks: string
  kemitraanLabel: string
  kemitraan: string
  logo: AcademyImage
}

export interface AcademyTentang {
  label: string
  judul: string
  subbagian: AcademySubbagian[]
  gambar: AcademyImage
  sertifikasi: AcademySertifikasi
}

export interface AcademyKepalaSekolah {
  label: string
  nama: string
  jabatan: string
  pernyataan: string
  quote: string
  foto: AcademyImage
}

export interface AcademySertifikat {
  judul: string
  gambar: AcademyImage
}

export interface AcademyTrainer {
  nama: string
  peran: string
  badgeSertifikasi: string[]
  foto: AcademyImage
  sertifikat: AcademySertifikat[]
}

export interface AcademyTrainerSection {
  label: string
  judul: string
  quoteSection: string
  labelSertifikasi: string
  daftar: AcademyTrainer[]
}

export interface AcademyMetodeItem {
  judul: string
  deskripsi: string
  /** 25 atau 75 untuk segmen bar; null untuk butir tanpa porsi */
  porsi: number | null
}

export interface AcademyMetode {
  label: string
  judul: string
  daftar: AcademyMetodeItem[]
}

export interface AcademyModul {
  nomor: number
  nama: string
  topik: string[]
}

export interface AcademyKurikulum {
  label: string
  judul: string
  deskripsi: string
  labelModul: string
  labelTopik: string
  modul: AcademyModul[]
}

export interface AcademyKontakLink {
  label: string
  teks: string
  href: string
}

export interface AcademyKontak {
  label: string
  judul: string
  namaSekolah: string
  whatsapp: AcademyKontakLink
  email: AcademyKontakLink
  alamat: { label: string; teks: string }
  gambar: AcademyImage
}

export interface MikrotikAcademyContent {
  seo: AcademySeo
  hero: AcademyHero
  tentang: AcademyTentang
  kepalaSekolah: AcademyKepalaSekolah
  trainer: AcademyTrainerSection
  metode: AcademyMetode
  kurikulum: AcademyKurikulum
  kontak: AcademyKontak
}

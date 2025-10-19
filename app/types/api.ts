export interface News {
  id?: number;
  title: string;
  slug?: string;
  thumbnail?: File | string;
  content: string;
  author_id: number;
  excerpt: string;
  status: string;
  tags: string;
  view_count?: number;
}

export interface AuthCredentials {
  name?: string;
  email: string;
  password: string;
}

export interface UserProfile {
  name?: string;
  no_induk?: string;
  role?: string;
  phone?: string;
  alamat?: string;
  tahun_ajaran_mulai?: string;
  jabatan?: string;
  email?: string;
  password?: string;
  photo_url?: File;
}

export interface ImageUpload {
  category: string;
  file_path: File;
}

export interface UserLink {
  title: string;
  url: string;
  icon?: File;
}

export interface ForumSection {
  name: string;
  slug?: string;
  description: string;
  icon?: File;
}

export interface ForumPost {
  section_id: number;
  title: string;
  content: string;
  image?: File;
}

export interface ForumReply {
  post_id: number;
  content: string;
}

export interface Event {
  title: string;
  description: string;
  category: string;
  start_date: string;
  end_date: string;
  location: string;
  organizer: string;
  image?: File;
}

export interface Portal {
  title: string;
  url: string;
  order?: number;
  is_active?: boolean;
  icon?: File;
}

export interface Mading {
  title: string;
  type: string;
  content: string;
  image?: File;
}

export interface Teacher {
  nig: string;
  full_name: string;
  position: string;
  subject: string;
  description: string;
}

export interface Eskul {
  name: string;
  description: string;
  pembina_id: number;
}

export interface Achievement {
  title: string;
  description: string;
  image?: File;
  achievement_date: string;
  news_id?: number;
}

export interface Industry {
  name: string;
  logo?: File;
  website: string;
  description: string;
}

export interface Certification {
  name: string;
  issuer: string;
  description: string;
  image?: File;
  certification_number: string;
  issue_date: string;
  expiry_date: string;
}

export interface Testimonial {
  name: string;
  position: string;
  photo?: File;
  testimonial: string;
}
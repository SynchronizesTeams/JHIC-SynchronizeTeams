export interface PersonalLink {
  id: string
  title: string
  url: string
  icon?: string
  order: number
  isActive: boolean
  clicks?: number
}

export interface PersonalProfile {
  username: string
  name: string
  email: string
  phone: string
  avatar: string
  bio?: string
  coverImage?: string
  links: PersonalLink[]
  theme?: 'light' | 'dark'
  createdAt: string
  updatedAt: string
}

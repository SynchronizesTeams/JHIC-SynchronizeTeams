export interface Portal {
  id: string
  name: string
  description: string
  url: string
  image: string
  icon?: string
  category?: string
  isActive: boolean
  order: number
}

export interface PortalProfile {
  username: string
  displayName: string
  bio: string
  avatar: string
  coverImage?: string
}

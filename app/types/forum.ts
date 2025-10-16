export interface User {
  id: string
  username: string
  name: string
  avatar?: string
  role: 'public' | 'alumni' | 'siswa'
}

export interface Post {
  id: string
  content: string
  author: User
  createdAt: string
  updatedAt: string
  channel: 'public' | 'alumni' | 'siswa'
  images?: string[]
  upvotes: number
  downvotes: number
  userVote?: 'up' | 'down' | null
  commentsCount: number
  isPinned?: boolean
  views: number
}

export interface Comment {
  id: string
  content: string
  author: User
  createdAt: string
  updatedAt: string
  postId: string
  parentId?: string
  upvotes: number
  downvotes: number
  userVote?: 'up' | 'down' | null
  replies?: Comment[]
}

export interface Channel {
  id: string
  name: string
  slug: string
  description: string
  access: 'public' | 'authenticated'
  color: string
}

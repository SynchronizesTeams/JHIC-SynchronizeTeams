import type { User, Post, Comment, Channel } from '~/types/forum'

export const mockUsers: User[] = [
  {
    id: '1',
    username: 'john_doe',
    name: 'John Doe',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
    role: 'alumni'
  },
  {
    id: '2',
    username: 'jane_smith',
    name: 'Jane Smith',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jane',
    role: 'siswa'
  },
  {
    id: '3',
    username: 'bob_wilson',
    name: 'Bob Wilson',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Bob',
    role: 'alumni'
  }
]

export const mockChannels: Channel[] = [
  {
    id: '1',
    name: 'Publik',
    slug: 'public',
    description: 'Forum terbuka untuk semua orang',
    access: 'public',
    color: 'blue'
  },
  {
    id: '2',
    name: 'Alumni',
    slug: 'alumni',
    description: 'Forum khusus untuk alumni, siswa, dan guru',
    access: 'authenticated',
    color: 'green'
  },
  {
    id: '3',
    name: 'Siswa',
    slug: 'siswa',
    description: 'Forum khusus untuk siswa aktif dan guru',
    access: 'authenticated',
    color: 'purple'
  }
]

export const mockPosts: Post[] = [
  {
    id: '1',
    content: 'Halo semuanya! Senang bisa bergabung di forum ini. Siapa yang sudah lulus dan kerja di tech industry?',
    author: mockUsers[0],
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z',
    channel: 'alumni',
    images: ['https://picsum.photos/400/300?random=1'],
    upvotes: 24,
    downvotes: 2,
    commentsCount: 8
  },
  {
    id: '2',
    content: 'Ada tips buat siswa yang mau persiapan masuk kerja? Aku masih semester 5 nih.',
    author: mockUsers[1],
    createdAt: '2024-01-14T15:30:00Z',
    updatedAt: '2024-01-14T15:30:00Z',
    channel: 'siswa',
    upvotes: 15,
    downvotes: 1,
    commentsCount: 12,
    isPinned: true
  },
  {
    id: '3',
    content: 'Sharing pengalaman interview di startup 2 tahun lalu. Banyak puzzling programming tapi seru!',
    author: mockUsers[2],
    createdAt: '2024-01-13T09:15:00Z',
    updatedAt: '2024-01-13T09:15:00Z',
    channel: 'public',
    upvotes: 89,
    downvotes: 5,
    commentsCount: 23
  },
  {
    id: '4',
    content: 'Barusan dapet offer dari tech company! Gak nyangka proses nya cepet banget cuma 2 minggu 🎉',
    author: mockUsers[0],
    createdAt: '2024-01-15T08:00:00Z',
    updatedAt: '2024-01-15T08:00:00Z',
    channel: 'public',
    images: ['https://picsum.photos/400/300?random=4', 'https://picsum.photos/400/300?random=5'],
    upvotes: 156,
    downvotes: 3,
    commentsCount: 45
  },
  {
    id: '5',
    content: 'Ada yang tau bootcamp coding yang bagus? Mau career switch nih',
    author: mockUsers[1],
    createdAt: '2024-01-14T18:00:00Z',
    updatedAt: '2024-01-14T18:00:00Z',
    channel: 'public',
    upvotes: 34,
    downvotes: 5,
    commentsCount: 28
  },
  {
    id: '6',
    content: 'Tips interview: jangan takut bilang "saya tidak tahu tapi saya bisa belajar". Honesty is the best policy!',
    author: mockUsers[2],
    createdAt: '2024-01-14T14:00:00Z',
    updatedAt: '2024-01-14T14:00:00Z',
    channel: 'public',
    upvotes: 203,
    downvotes: 8,
    commentsCount: 67
  },
  {
    id: '7',
    content: 'Kerja remote vs office, kalian prefer yang mana? Aku struggle banget work-life balance nya',
    author: mockUsers[0],
    createdAt: '2024-01-14T12:00:00Z',
    updatedAt: '2024-01-14T12:00:00Z',
    channel: 'public',
    upvotes: 78,
    downvotes: 12,
    commentsCount: 89
  },
  {
    id: '8',
    content: 'Rekomendasi laptop untuk programming? Budget 10-15jt',
    author: mockUsers[1],
    createdAt: '2024-01-14T10:00:00Z',
    updatedAt: '2024-01-14T10:00:00Z',
    channel: 'public',
    images: ['https://picsum.photos/400/300?random=8'],
    upvotes: 45,
    downvotes: 6,
    commentsCount: 52
  },
  {
    id: '9',
    content: 'Belajar React atau Vue dulu? Bingung milih framework 😅',
    author: mockUsers[2],
    createdAt: '2024-01-13T16:00:00Z',
    updatedAt: '2024-01-13T16:00:00Z',
    channel: 'public',
    upvotes: 92,
    downvotes: 15,
    commentsCount: 103
  },
  {
    id: '10',
    content: 'Pengalaman magang di startup vs big corp. AMA!',
    author: mockUsers[0],
    createdAt: '2024-01-13T14:00:00Z',
    updatedAt: '2024-01-13T14:00:00Z',
    channel: 'public',
    upvotes: 234,
    downvotes: 7,
    commentsCount: 178,
    isPinned: true
  }
]

export const mockComments: Comment[] = [
  {
    id: '1',
    content: 'Aku kerja di e-commerce, banyak challenge nya tapi worth it!',
    author: mockUsers[2],
    createdAt: '2024-01-15T11:00:00Z',
    updatedAt: '2024-01-15T11:00:00Z',
    postId: '1',
    upvotes: 8,
    downvotes: 0
  },
  {
    id: '2',
    content: 'Wah keren! Apa aya tips buat interview di e-commerce?',
    author: mockUsers[1],
    createdAt: '2024-01-15T11:30:00Z',
    updatedAt: '2024-01-15T11:30:00Z',
    postId: '1',
    parentId: '1',
    upvotes: 3,
    downvotes: 0
  },
  {
    id: '3',
    content: 'Fokus pada sistem design dan problem solving, biasanya yang diuji.',
    author: mockUsers[2],
    createdAt: '2024-01-15T12:00:00Z',
    updatedAt: '2024-01-15T12:00:00Z',
    postId: '1',
    parentId: '2',
    upvotes: 5,
    downvotes: 0
  }
]

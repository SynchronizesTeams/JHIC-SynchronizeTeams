import type { User, Post, Comment, Channel } from '~/types/forum'
import type { Portal, PortalProfile } from '~/types/portal'
import type { PersonalProfile } from '~/types/personalProfile'

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
    commentsCount: 8,
    views: 342
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
    isPinned: true,
    views: 567
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
    commentsCount: 23,
    views: 1240
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
    commentsCount: 45,
    views: 2834
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
    commentsCount: 28,
    views: 891
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
    commentsCount: 67,
    views: 4521
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
    commentsCount: 89,
    views: 3267
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
    commentsCount: 52,
    views: 1678
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
    commentsCount: 103,
    views: 2456
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
    isPinned: true,
    views: 8934
  }
]

export const mockComments: Comment[] = [
  // Comments for Post #1 - "Halo semuanya! Senang bisa bergabung..."
  {
    id: '1',
    content: 'Aku kerja di e-commerce sebagai backend engineer, banyak challenge nya tapi worth it!',
    author: mockUsers[2],
    createdAt: '2024-01-15T11:00:00Z',
    updatedAt: '2024-01-15T11:00:00Z',
    postId: '1',
    upvotes: 8,
    downvotes: 0
  },
  {
    id: '2',
    content: 'Wah keren! Ada tips buat interview di e-commerce?',
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
    content: 'Fokus pada sistem design dan problem solving, biasanya yang diuji. Plus pastiin kamu paham konsep database dan caching.',
    author: mockUsers[2],
    createdAt: '2024-01-15T12:00:00Z',
    updatedAt: '2024-01-15T12:00:00Z',
    postId: '1',
    parentId: '2',
    upvotes: 5,
    downvotes: 0
  },
  {
    id: '4',
    content: 'Thanks for the tips! Aku lagi prepare nih, ada rekomendasi resources?',
    author: mockUsers[1],
    createdAt: '2024-01-15T12:30:00Z',
    updatedAt: '2024-01-15T12:30:00Z',
    postId: '1',
    parentId: '3',
    upvotes: 2,
    downvotes: 0
  },
  {
    id: '5',
    content: 'Aku juga kerja di tech! Tapi di startup, atmosfer nya lebih santai daripada big corp.',
    author: mockUsers[0],
    createdAt: '2024-01-15T13:00:00Z',
    updatedAt: '2024-01-15T13:00:00Z',
    postId: '1',
    upvotes: 6,
    downvotes: 1
  },
  {
    id: '6',
    content: 'Startup emang lebih fleksibel ya? Gimana work-life balance nya?',
    author: mockUsers[1],
    createdAt: '2024-01-15T13:30:00Z',
    updatedAt: '2024-01-15T13:30:00Z',
    postId: '1',
    parentId: '5',
    upvotes: 4,
    downvotes: 0
  },

  // Comments for Post #4 - "Barusan dapet offer..."
  {
    id: '7',
    content: 'Selamat! 🎉 Boleh share proses interview nya kayak gimana?',
    author: mockUsers[1],
    createdAt: '2024-01-15T08:30:00Z',
    updatedAt: '2024-01-15T08:30:00Z',
    postId: '4',
    upvotes: 15,
    downvotes: 0
  },
  {
    id: '8',
    content: 'Congrats bro! Company nya boleh tau atau rahasia? 😄',
    author: mockUsers[2],
    createdAt: '2024-01-15T08:45:00Z',
    updatedAt: '2024-01-15T08:45:00Z',
    postId: '4',
    upvotes: 12,
    downvotes: 1
  },
  {
    id: '9',
    content: 'Thanks! Proses nya ada 3 tahap: HR screening, technical test, sama user interview. Yang paling challenging technical test nya karena live coding.',
    author: mockUsers[0],
    createdAt: '2024-01-15T09:00:00Z',
    updatedAt: '2024-01-15T09:00:00Z',
    postId: '4',
    parentId: '7',
    upvotes: 20,
    downvotes: 0
  },
  {
    id: '10',
    content: 'Live coding nya pake bahasa apa? Dan dikasih waktu berapa lama?',
    author: mockUsers[1],
    createdAt: '2024-01-15T09:15:00Z',
    updatedAt: '2024-01-15T09:15:00Z',
    postId: '4',
    parentId: '9',
    upvotes: 8,
    downvotes: 0
  },
  {
    id: '11',
    content: 'Bebas pilih bahasa, aku pake JavaScript. Dikasih 1 jam untuk 2 soal algoritma.',
    author: mockUsers[0],
    createdAt: '2024-01-15T09:30:00Z',
    updatedAt: '2024-01-15T09:30:00Z',
    postId: '4',
    parentId: '10',
    upvotes: 11,
    downvotes: 0
  },
  {
    id: '12',
    content: 'Itu startup atau corporate? Karena biasanya startup proses nya lebih cepet.',
    author: mockUsers[2],
    createdAt: '2024-01-15T09:45:00Z',
    updatedAt: '2024-01-15T09:45:00Z',
    postId: '4',
    parentId: '9',
    upvotes: 6,
    downvotes: 0
  },
  {
    id: '13',
    content: 'Wah mantap! Kapan mulai kerja nya?',
    author: mockUsers[1],
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z',
    postId: '4',
    upvotes: 9,
    downvotes: 0
  },
  {
    id: '14',
    content: 'Bulan depan! Masih ada waktu buat istirahat dulu sebelum mulai 😊',
    author: mockUsers[0],
    createdAt: '2024-01-15T10:15:00Z',
    updatedAt: '2024-01-15T10:15:00Z',
    postId: '4',
    parentId: '13',
    upvotes: 7,
    downvotes: 0
  },

  // Comments for Post #3 - "Sharing pengalaman interview..."
  {
    id: '15',
    content: 'Boleh share contoh puzzle programming nya kayak gimana?',
    author: mockUsers[0],
    createdAt: '2024-01-13T10:00:00Z',
    updatedAt: '2024-01-13T10:00:00Z',
    postId: '3',
    upvotes: 25,
    downvotes: 1
  },
  {
    id: '16',
    content: 'Biasanya seputar algoritma dan data structure. Ada binary tree, dynamic programming, sama graph problems.',
    author: mockUsers[2],
    createdAt: '2024-01-13T10:30:00Z',
    updatedAt: '2024-01-13T10:30:00Z',
    postId: '3',
    parentId: '15',
    upvotes: 18,
    downvotes: 0
  },
  {
    id: '17',
    content: 'Waduh advanced ya. Aku masih struggle sama dynamic programming nih 😅',
    author: mockUsers[1],
    createdAt: '2024-01-13T11:00:00Z',
    updatedAt: '2024-01-13T11:00:00Z',
    postId: '3',
    parentId: '16',
    upvotes: 12,
    downvotes: 0
  },
  {
    id: '18',
    content: 'Aku juga dulu gitu! Practice terus di LeetCode, lama-lama ngerti pola nya.',
    author: mockUsers[2],
    createdAt: '2024-01-13T11:30:00Z',
    updatedAt: '2024-01-13T11:30:00Z',
    postId: '3',
    parentId: '17',
    upvotes: 15,
    downvotes: 0
  },
  {
    id: '19',
    content: 'Startup nya masih exist sampe sekarang? Gimana kultur kerja nya?',
    author: mockUsers[0],
    createdAt: '2024-01-13T12:00:00Z',
    updatedAt: '2024-01-13T12:00:00Z',
    postId: '3',
    upvotes: 10,
    downvotes: 0
  },
  {
    id: '20',
    content: 'Masih! Malah udah jadi unicorn sekarang. Kultur nya keren, sangat mendukung learning dan growth.',
    author: mockUsers[2],
    createdAt: '2024-01-13T12:30:00Z',
    updatedAt: '2024-01-13T12:30:00Z',
    postId: '3',
    parentId: '19',
    upvotes: 14,
    downvotes: 0
  },
  {
    id: '21',
    content: 'Wah inspiring banget! Makasih sharing nya 👍',
    author: mockUsers[1],
    createdAt: '2024-01-13T13:00:00Z',
    updatedAt: '2024-01-13T13:00:00Z',
    postId: '3',
    parentId: '20',
    upvotes: 8,
    downvotes: 0
  },

  // Comments for Post #6 - "Tips interview: jangan takut bilang..."
  {
    id: '22',
    content: 'Setuju banget! Interviewer lebih appreciate honesty daripada ngaku-ngaku bisa.',
    author: mockUsers[0],
    createdAt: '2024-01-14T14:30:00Z',
    updatedAt: '2024-01-14T14:30:00Z',
    postId: '6',
    upvotes: 45,
    downvotes: 2
  },
  {
    id: '23',
    content: 'Bener sih, tapi tetep harus show willingness to learn ya?',
    author: mockUsers[1],
    createdAt: '2024-01-14T15:00:00Z',
    updatedAt: '2024-01-14T15:00:00Z',
    postId: '6',
    parentId: '22',
    upvotes: 30,
    downvotes: 0
  },
  {
    id: '24',
    content: 'Absolutely! Yang penting tunjukin curiosity dan initiative buat belajar hal baru.',
    author: mockUsers[0],
    createdAt: '2024-01-14T15:30:00Z',
    updatedAt: '2024-01-14T15:30:00Z',
    postId: '6',
    parentId: '23',
    upvotes: 38,
    downvotes: 1
  },
  {
    id: '25',
    content: 'Pengalaman aku malah pernah interview di tempat yang toxic. Pas bilang gak tau langsung di-judge keras 😔',
    author: mockUsers[2],
    createdAt: '2024-01-14T16:00:00Z',
    updatedAt: '2024-01-14T16:00:00Z',
    postId: '6',
    upvotes: 22,
    downvotes: 3
  },
  {
    id: '26',
    content: 'Wah red flag tuh. Bagus juga jadi tau kultur company nya dari interview process.',
    author: mockUsers[1],
    createdAt: '2024-01-14T16:30:00Z',
    updatedAt: '2024-01-14T16:30:00Z',
    postId: '6',
    parentId: '25',
    upvotes: 28,
    downvotes: 0
  },
  {
    id: '27',
    content: 'Betul! Sekarang aku malah thankful gak lolos interview di sana. Ended up di tempat yang lebih supportive.',
    author: mockUsers[2],
    createdAt: '2024-01-14T17:00:00Z',
    updatedAt: '2024-01-14T17:00:00Z',
    postId: '6',
    parentId: '26',
    upvotes: 35,
    downvotes: 0
  },

  // Comments for Post #9 - "Belajar React atau Vue..."
  {
    id: '28',
    content: 'React! Lebih banyak job opportunities dan community support nya lebih gede.',
    author: mockUsers[0],
    createdAt: '2024-01-13T16:30:00Z',
    updatedAt: '2024-01-13T16:30:00Z',
    postId: '9',
    upvotes: 40,
    downvotes: 8
  },
  {
    id: '29',
    content: 'Vue dong! Learning curve nya lebih gentle dan documentation nya lebih friendly.',
    author: mockUsers[1],
    createdAt: '2024-01-13T17:00:00Z',
    updatedAt: '2024-01-13T17:00:00Z',
    postId: '9',
    upvotes: 35,
    downvotes: 5
  },
  {
    id: '30',
    content: 'Tergantung goal nya sih. Kalo mau cepet dapet kerja, React. Kalo mau belajar dengan lebih structured, Vue.',
    author: mockUsers[2],
    createdAt: '2024-01-13T17:30:00Z',
    updatedAt: '2024-01-13T17:30:00Z',
    postId: '9',
    upvotes: 55,
    downvotes: 2
  },
  {
    id: '31',
    content: 'Aku prefer React karena ecosystem nya kaya banget. Banyak library pendukung.',
    author: mockUsers[0],
    createdAt: '2024-01-13T18:00:00Z',
    updatedAt: '2024-01-13T18:00:00Z',
    postId: '9',
    parentId: '30',
    upvotes: 22,
    downvotes: 4
  },
  {
    id: '32',
    content: 'Vue juga ecosystem nya bagus kok! Nuxt, Vite, Pinia semua well-maintained.',
    author: mockUsers[1],
    createdAt: '2024-01-13T18:30:00Z',
    updatedAt: '2024-01-13T18:30:00Z',
    postId: '9',
    parentId: '30',
    upvotes: 28,
    downvotes: 3
  },
  {
    id: '33',
    content: 'Honestly, just pick one and stick with it. Fundamental nya mirip-mirip kok.',
    author: mockUsers[2],
    createdAt: '2024-01-13T19:00:00Z',
    updatedAt: '2024-01-13T19:00:00Z',
    postId: '9',
    parentId: '32',
    upvotes: 48,
    downvotes: 1
  },

  // Additional comments for Post #10 - "Pengalaman magang..."
  {
    id: '34',
    content: 'Boleh jelasin benefit dan drawback masing-masing?',
    author: mockUsers[1],
    createdAt: '2024-01-13T14:30:00Z',
    updatedAt: '2024-01-13T14:30:00Z',
    postId: '10',
    upvotes: 60,
    downvotes: 2
  },
  {
    id: '35',
    content: 'Startup: fast pace, bisa touching banyak hal, tapi kadang overwhelming. Big corp: structured, mentorship bagus, tapi bureaucracy nya ribet.',
    author: mockUsers[0],
    createdAt: '2024-01-13T15:00:00Z',
    updatedAt: '2024-01-13T15:00:00Z',
    postId: '10',
    parentId: '34',
    upvotes: 75,
    downvotes: 3
  },
  {
    id: '36',
    content: 'Dari segi gaji gimana? Lebih worth mana?',
    author: mockUsers[2],
    createdAt: '2024-01-13T15:30:00Z',
    updatedAt: '2024-01-13T15:30:00Z',
    postId: '10',
    parentId: '35',
    upvotes: 42,
    downvotes: 1
  },
  {
    id: '37',
    content: 'Big corp biasanya gaji lebih tinggi dan benefit lebih lengkap. Tapi startup bisa offer equity yang potentially valuable.',
    author: mockUsers[0],
    createdAt: '2024-01-13T16:00:00Z',
    updatedAt: '2024-01-13T16:00:00Z',
    postId: '10',
    parentId: '36',
    upvotes: 55,
    downvotes: 2
  },
  {
    id: '38',
    content: 'Work-life balance nya gimana di kedua tempat?',
    author: mockUsers[1],
    createdAt: '2024-01-13T16:30:00Z',
    updatedAt: '2024-01-13T16:30:00Z',
    postId: '10',
    parentId: '35',
    upvotes: 38,
    downvotes: 0
  },
  {
    id: '39',
    content: 'Big corp lebih respect work hours. Startup bisa lebih demanding tapi ada flexibility juga.',
    author: mockUsers[0],
    createdAt: '2024-01-13T17:00:00Z',
    updatedAt: '2024-01-13T17:00:00Z',
    postId: '10',
    parentId: '38',
    upvotes: 44,
    downvotes: 1
  }
]

// Portal mock data
export const mockPortalProfile: PortalProfile = {
  username: 'smkpnb',
  displayName: 'SMK Penerbangan Bandung',
  bio: 'Portal resmi SMK Penerbangan Bandung - Hub untuk berbagai informasi dan link penting sekolah',
  avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=SMKPNB&backgroundColor=ef4444',
  coverImage: 'https://picsum.photos/1200/300?random=cover'
}

export const mockPortals: Portal[] = [
  {
    id: '1',
    name: 'Website Resmi',
    description: 'Website resmi SMK Penerbangan Bandung',
    url: 'https://smkpnb.sch.id',
    image: 'https://api.dicebear.com/7.x/shapes/svg?seed=website',
    icon: '🌐',
    category: 'official',
    isActive: true,
    order: 1
  },
  {
    id: '2',
    name: 'Portal Akademik',
    description: 'Sistem informasi akademik siswa dan guru',
    url: 'https://akademik.smkpnb.sch.id',
    image: 'https://api.dicebear.com/7.x/shapes/svg?seed=akademik',
    icon: '📚',
    category: 'academic',
    isActive: true,
    order: 2
  },
  {
    id: '3',
    name: 'E-Learning',
    description: 'Platform pembelajaran online',
    url: 'https://elearning.smkpnb.sch.id',
    image: 'https://api.dicebear.com/7.x/shapes/svg?seed=elearning',
    icon: '💻',
    category: 'academic',
    isActive: true,
    order: 3
  },
  {
    id: '4',
    name: 'Perpustakaan Digital',
    description: 'Akses ke koleksi buku dan jurnal digital',
    url: 'https://library.smkpnb.sch.id',
    image: 'https://api.dicebear.com/7.x/shapes/svg?seed=library',
    icon: '📖',
    category: 'academic',
    isActive: true,
    order: 4
  },
  {
    id: '5',
    name: 'Instagram',
    description: 'Follow kami di Instagram untuk update terbaru',
    url: 'https://instagram.com/smkpnb',
    image: 'https://api.dicebear.com/7.x/shapes/svg?seed=instagram',
    icon: '📸',
    category: 'social',
    isActive: true,
    order: 5
  },
  {
    id: '6',
    name: 'YouTube',
    description: 'Channel YouTube resmi SMK Penerbangan Bandung',
    url: 'https://youtube.com/@smkpnb',
    image: 'https://api.dicebear.com/7.x/shapes/svg?seed=youtube',
    icon: '🎥',
    category: 'social',
    isActive: true,
    order: 6
  },
  {
    id: '7',
    name: 'PPDB Online',
    description: 'Pendaftaran Peserta Didik Baru',
    url: 'https://ppdb.smkpnb.sch.id',
    image: 'https://api.dicebear.com/7.x/shapes/svg?seed=ppdb',
    icon: '📝',
    category: 'official',
    isActive: true,
    order: 7
  },
  {
    id: '8',
    name: 'Alumni Network',
    description: 'Jaringan dan komunitas alumni',
    url: 'https://alumni.smkpnb.sch.id',
    image: 'https://api.dicebear.com/7.x/shapes/svg?seed=alumni',
    icon: '🎓',
    category: 'community',
    isActive: true,
    order: 8
  }
]

// Personal Profile mock data
export const mockPersonalProfiles: PersonalProfile[] = [
  {
    username: 'johndoe',
    name: 'John Doe',
    email: 'john.doe@smkpnb.sch.id',
    phone: '+62 812-3456-7890',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
    bio: 'Alumni SMK Penerbangan Bandung | Software Engineer | Tech Enthusiast',
    coverImage: 'https://picsum.photos/1200/300?random=user1',
    theme: 'light',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z',
    links: [
      {
        id: '1',
        title: 'LinkedIn Profile',
        url: 'https://linkedin.com/in/johndoe',
        icon: '💼',
        order: 1,
        isActive: true,
        clicks: 245
      },
      {
        id: '2',
        title: 'GitHub',
        url: 'https://github.com/johndoe',
        icon: '💻',
        order: 2,
        isActive: true,
        clicks: 189
      },
      {
        id: '3',
        title: 'Portfolio Website',
        url: 'https://johndoe.dev',
        icon: '🌐',
        order: 3,
        isActive: true,
        clicks: 321
      },
      {
        id: '4',
        title: 'Instagram',
        url: 'https://instagram.com/johndoe',
        icon: '📸',
        order: 4,
        isActive: true,
        clicks: 156
      },
      {
        id: '5',
        title: 'YouTube Channel',
        url: 'https://youtube.com/@johndoe',
        icon: '🎥',
        order: 5,
        isActive: true,
        clicks: 98
      }
    ]
  },
  {
    username: 'janesmith',
    name: 'Jane Smith',
    email: 'jane.smith@smkpnb.sch.id',
    phone: '+62 813-9876-5432',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jane',
    bio: 'UI/UX Designer | Creative Thinker | Coffee Lover ☕',
    coverImage: 'https://picsum.photos/1200/300?random=user2',
    theme: 'light',
    createdAt: '2024-01-05T00:00:00Z',
    updatedAt: '2024-01-14T15:30:00Z',
    links: [
      {
        id: '1',
        title: 'Behance Portfolio',
        url: 'https://behance.net/janesmith',
        icon: '🎨',
        order: 1,
        isActive: true,
        clicks: 412
      },
      {
        id: '2',
        title: 'Dribbble',
        url: 'https://dribbble.com/janesmith',
        icon: '🏀',
        order: 2,
        isActive: true,
        clicks: 367
      },
      {
        id: '3',
        title: 'Twitter',
        url: 'https://twitter.com/janesmith',
        icon: '🐦',
        order: 3,
        isActive: true,
        clicks: 289
      },
      {
        id: '4',
        title: 'Medium Blog',
        url: 'https://medium.com/@janesmith',
        icon: '📝',
        order: 4,
        isActive: true,
        clicks: 178
      }
    ]
  }
]

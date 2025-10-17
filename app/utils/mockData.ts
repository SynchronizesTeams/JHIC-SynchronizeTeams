import type { User, Post, Comment, Channel } from '~/types/forum'
import type { Portal, PortalProfile } from '~/types/portal'
import type { PersonalProfile } from '~/types/personalProfile'
import type { Teacher } from '~/types/teacher'
import type { Achievement } from '~/types/achievement'
import type { User as UserProfile } from '~/types/user'
import type { CalendarEvent } from '~/types/calendar'

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

// Teacher mock data
export const mockTeachers: Teacher[] = [
  {
    id: 1,
    nig: '09832101',
    full_name: 'Dr. Ahmad Hidayat',
    position: 'Guru',
    subject: 'Matematika',
    photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ahmad',
    description: 'Guru Matematika dengan pengalaman mengajar lebih dari 15 tahun. Spesialisasi dalam Aljabar dan Kalkulus. Saya percaya bahwa matematika adalah bahasa universal yang dapat dipahami semua orang dengan pendekatan yang tepat.',
    user: {
      id: 1,
      name: 'ahmadh'
    }
  },
  {
    id: 2,
    nig: '09832102',
    full_name: 'Siti Nurhaliza, M.Pd',
    position: 'Guru',
    subject: 'Bahasa Indonesia',
    photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Siti',
    description: 'Guru Bahasa Indonesia yang passionate dalam mengembangkan kemampuan literasi siswa. Aktif dalam berbagai kegiatan sastra dan penulisan kreatif.',
    user: {
      id: 2,
      name: 'sitinur'
    }
  },
  {
    id: 3,
    nig: '09832103',
    full_name: 'Budi Santoso, S.Si',
    position: 'Guru',
    subject: 'Fisika',
    photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Budi',
    description: 'Mengajar Fisika dengan pendekatan eksperimental dan praktis. Membantu siswa memahami konsep fisika melalui eksperimen dan aplikasi kehidupan sehari-hari.',
    user: {
      id: 3,
      name: 'budis'
    }
  },
  {
    id: 4,
    nig: '09832104',
    full_name: 'Rina Kusuma, M.Si',
    position: 'Guru',
    subject: 'Kimia',
    photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rina',
    description: 'Guru Kimia yang berpengalaman dalam olimpiade sains. Membimbing siswa untuk memahami kimia organik dan anorganik dengan metode yang menyenangkan.',
    user: {
      id: 4,
      name: 'rinak'
    }
  },
  {
    id: 5,
    nig: '09832105',
    full_name: 'Dedi Prasetyo, S.Pd',
    position: 'Guru',
    subject: 'Biologi',
    photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Dedi',
    description: 'Guru Biologi dengan fokus pada ekologi dan konservasi. Aktif dalam kegiatan lingkungan dan penelitian biodiversitas.',
    user: {
      id: 5,
      name: 'dedip'
    }
  },
  {
    id: 6,
    nig: '09832106',
    full_name: 'Lisa Andriani, M.Pd',
    position: 'Guru',
    subject: 'Bahasa Inggris',
    photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa',
    description: 'Guru Bahasa Inggris yang berpengalaman mengajar TOEFL dan IELTS. Membantu siswa meningkatkan kemampuan speaking, writing, reading, dan listening.',
    user: {
      id: 6,
      name: 'lisaa'
    }
  },
  {
    id: 7,
    nig: '09832107',
    full_name: 'Hendra Wijaya, S.Sos',
    position: 'Guru',
    subject: 'Sosiologi',
    photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Hendra',
    description: 'Mengajar Sosiologi dengan pendekatan kritis dan kontekstual. Membimbing siswa memahami fenomena sosial di masyarakat.',
    user: {
      id: 7,
      name: 'hendraw'
    }
  },
  {
    id: 8,
    nig: '09832108',
    full_name: 'Maya Putri, S.Pd',
    position: 'Guru',
    subject: 'Seni Budaya',
    photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Maya',
    description: 'Guru Seni Budaya yang passionate dalam mengembangkan kreativitas siswa. Aktif dalam berbagai pameran seni dan kegiatan budaya.',
    user: {
      id: 8,
      name: 'mayap'
    }
  }
]

// Achievement mock data
export const mockAchievements: Achievement[] = [
  {
    id: 1,
    title: 'Juara 1 JHIC',
    description: 'Prestasi luar biasa dalam kompetisi JHIC tingkat nasional',
    image: 'https://picsum.photos/seed/achievement1/800/600',
    achievement_date: '2025-01-15',
    News: {
      id: 1,
      title: 'Tim SMK Penerbangan Juara JHIC 2025',
      slug: 'tim-smk-penerbangan-juara-jhic-2025',
      excerpt: 'Tim SMK Penerbangan Bandung berhasil meraih juara 1 dalam kompetisi JHIC tingkat nasional, mengalahkan lebih dari 100 sekolah peserta.'
    }
  },
  {
    id: 2,
    title: 'Juara 1 Lomba Web Dev Nasional',
    description: 'Memenangkan kompetisi web development tingkat nasional',
    image: 'https://picsum.photos/seed/achievement2/800/600',
    achievement_date: '2024-12-10',
    News: {
      id: 2,
      title: 'Prestasi Gemilang Web Development Competition 2024',
      slug: 'prestasi-gemilang-web-development-2024',
      excerpt: 'Siswa SMK Penerbangan berhasil memenangkan kompetisi pengembangan web tingkat nasional, mengalahkan lebih dari 500 tim dari seluruh Indonesia.'
    }
  },
  {
    id: 3,
    title: 'Sertifikasi Internasional ISO 9001',
    description: 'Sekolah mendapat sertifikasi ISO 9001',
    image: 'https://picsum.photos/seed/achievement3/800/600',
    achievement_date: '2024-11-20',
    News: {
      id: 3,
      title: 'SMK Penerbangan Raih Sertifikasi ISO 9001',
      slug: 'smk-penerbangan-raih-sertifikasi-iso-9001',
      excerpt: 'Sekolah telah berhasil mendapatkan sertifikasi ISO 9001, menjamin kualitas manajemen dan layanan pendidikan yang terbaik.'
    }
  },
  {
    id: 4,
    title: 'Penghargaan Inovasi Terbaik',
    description: 'Diakui sebagai inovator terbaik bidang teknologi',
    image: 'https://picsum.photos/seed/achievement4/800/600',
    achievement_date: '2024-10-05',
    News: {
      id: 4,
      title: 'Penghargaan Inovasi Teknologi Pendidikan',
      slug: 'penghargaan-inovasi-teknologi-pendidikan',
      excerpt: 'Diakui sebagai yang terbaik dalam kategori inovasi teknologi untuk solusi pembelajaran digital yang inovatif.'
    }
  },
  {
    id: 5,
    title: 'Kontributor Open Source Terbaik',
    description: 'Tim aktif berkontribusi pada komunitas open source',
    image: 'https://picsum.photos/seed/achievement5/800/600',
    achievement_date: '2024-09-15',
    News: {
      id: 5,
      title: 'Siswa SMK Penerbangan Aktif di Open Source',
      slug: 'siswa-smk-penerbangan-aktif-di-open-source',
      excerpt: 'Tim siswa kami secara aktif berkontribusi pada komunitas sumber terbuka global, diakui sebagai kontributor terbaik tahun 2024.'
    }
  },
  {
    id: 6,
    title: 'Mitra Pendidikan Unggulan',
    description: 'Dipercaya sebagai mitra pendidikan vokasi',
    image: 'https://picsum.photos/seed/achievement6/800/600',
    achievement_date: '2024-08-20',
    News: {
      id: 6,
      title: 'Kerjasama Strategis dengan Industri',
      slug: 'kerjasama-strategis-dengan-industri',
      excerpt: 'Dipercaya sebagai mitra utama dalam program vokasi dan pendidikan industri oleh berbagai perusahaan teknologi terkemuka.'
    }
  },
  {
    id: 7,
    title: 'Juara Olimpiade Sains Nasional',
    description: 'Prestasi dalam bidang sains dan matematika',
    image: 'https://picsum.photos/seed/achievement7/800/600',
    achievement_date: '2024-07-12',
    News: {
      id: 7,
      title: 'Siswa Raih Medali Emas OSN 2024',
      slug: 'siswa-raih-medali-emas-osn-2024',
      excerpt: 'Siswa SMK Penerbangan berhasil meraih medali emas dalam Olimpiade Sains Nasional bidang matematika dan fisika.'
    }
  },
  {
    id: 8,
    title: 'Best Digital Marketing Campaign',
    description: 'Kampanye digital terbaik tingkat sekolah',
    image: 'https://picsum.photos/seed/achievement8/800/600',
    achievement_date: '2024-06-18',
    News: {
      id: 8,
      title: 'Kampanye Digital Siswa SMK Raih Penghargaan',
      slug: 'kampanye-digital-siswa-smk-raih-penghargaan',
      excerpt: 'Proyek kampanye digital siswa jurusan multimedia berhasil meraih penghargaan kampanye terbaik tingkat nasional.'
    }
  }
]

// Current User mock data for dashboard
export const mockCurrentUser: UserProfile = {
  id: 1,
  no_induk: '2021001',
  name: 'John Doe',
  email: 'john.doe@smkpnb.sch.id',
  role: 'alumni',
  photo_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
  phone: '+62 812-3456-7890',
  alamat: 'Jl. Raya Bandung No. 123, Bandung, Jawa Barat 40123',
  jabatan: 'Software Engineer',
  tahun_ajaran_mulai: '2021'
}

// Calendar Events mock data
export const mockCalendarEvents: CalendarEvent[] = [
  {
    id: 1,
    title: 'Upacara Hari Sumpah Pemuda',
    description: 'Peringatan Hari Sumpah Pemuda dengan upacara bendera dan berbagai kegiatan untuk menumbuhkan semangat nasionalisme di kalangan siswa.',
    event_date: '2025-10-28',
    image: 'https://picsum.photos/seed/event1/800/600',
    created_at: '2025-10-01T00:00:00Z'
  },
  {
    id: 2,
    title: 'Workshop Web Development',
    description: 'Workshop intensif pengembangan web modern menggunakan Vue.js dan Nuxt 3. Dibimbing oleh praktisi industri dengan pengalaman lebih dari 10 tahun.',
    event_date: '2025-10-20',
    image: 'https://picsum.photos/seed/event2/800/600',
    created_at: '2025-09-25T00:00:00Z'
  },
  {
    id: 3,
    title: 'Open House PPDB 2026',
    description: 'Acara terbuka untuk calon siswa baru dan orang tua. Kami akan memperkenalkan program-program unggulan, fasilitas sekolah, dan sistem pembelajaran.',
    event_date: '2025-10-25',
    image: 'https://picsum.photos/seed/event3/800/600',
    created_at: '2025-10-05T00:00:00Z'
  },
  {
    id: 4,
    title: 'Seminar Karir & Industri 4.0',
    description: 'Seminar tentang peluang karir di era Industri 4.0 dengan pembicara dari perusahaan teknologi terkemuka. Gratis untuk semua siswa dan alumni.',
    event_date: '2025-10-15',
    image: 'https://picsum.photos/seed/event4/800/600',
    created_at: '2025-09-20T00:00:00Z'
  },
  {
    id: 5,
    title: 'Lomba Coding Competition',
    description: 'Kompetisi pemrograman antar siswa SMK se-Jawa Barat. Hadiah total puluhan juta rupiah dan sertifikat untuk semua peserta.',
    event_date: '2025-10-22',
    image: 'https://picsum.photos/seed/event5/800/600',
    created_at: '2025-09-15T00:00:00Z'
  },
  {
    id: 6,
    title: 'Kunjungan Industri ke Tech Company',
    description: 'Kunjungan edukatif ke perusahaan teknologi untuk memberikan gambaran nyata tentang dunia kerja profesional di bidang IT.',
    event_date: '2025-10-18',
    image: 'https://picsum.photos/seed/event6/800/600',
    created_at: '2025-09-30T00:00:00Z'
  },
  {
    id: 7,
    title: 'Pelatihan Sertifikasi Internasional',
    description: 'Pelatihan persiapan untuk mendapatkan sertifikasi internasional di bidang jaringan komputer dan cloud computing.',
    event_date: '2025-10-30',
    image: 'https://picsum.photos/seed/event7/800/600',
    created_at: '2025-10-02T00:00:00Z'
  },
  {
    id: 8,
    title: 'Donor Darah Bersama PMI',
    description: 'Kegiatan donor darah bekerja sama dengan PMI untuk membantu sesama. Terbuka untuk siswa, guru, dan staff yang sehat.',
    event_date: '2025-10-12',
    image: 'https://picsum.photos/seed/event8/800/600',
    created_at: '2025-09-28T00:00:00Z'
  },
  {
    id: 9,
    title: 'Festival Seni & Budaya Sekolah',
    description: 'Pentas seni dan budaya tahunan menampilkan berbagai pertunjukan dari siswa. Mulai dari musik, tari, teater, hingga stand pameran karya seni.',
    event_date: '2025-10-26',
    image: 'https://picsum.photos/seed/event9/800/600',
    created_at: '2025-10-01T00:00:00Z'
  },
  {
    id: 10,
    title: 'Peringatan Hari Guru Nasional',
    description: 'Acara spesial untuk menghormati dan mengapresiasi dedikasi para guru dengan berbagai kegiatan menarik dan penghargaan.',
    event_date: '2025-11-25',
    image: 'https://picsum.photos/seed/event10/800/600',
    created_at: '2025-10-10T00:00:00Z'
  },
  {
    id: 11,
    title: 'Expo Teknologi & Inovasi Siswa',
    description: 'Pameran hasil karya dan inovasi teknologi siswa dari berbagai jurusan. Terbuka untuk umum dan industri partner.',
    event_date: '2025-11-15',
    image: 'https://picsum.photos/seed/event11/800/600',
    created_at: '2025-10-08T00:00:00Z'
  },
  {
    id: 12,
    title: 'Turnamen Futsal Antar Kelas',
    description: 'Kompetisi futsal antar kelas untuk mempererat tali persaudaraan dan sportivitas. Hadiah menarik untuk juara.',
    event_date: '2025-10-15',
    image: 'https://picsum.photos/seed/event12/800/600',
    created_at: '2025-09-22T00:00:00Z'
  }
]

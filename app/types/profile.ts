export interface Program {
  id: number
  name: string
  description: string
  icon: string
}

export interface Facility {
  id: number
  name: string
  icon: string
}

export interface Advantage {
  id: number
  title: string
  description: string
}

export interface ProfileData {
  hero: { title: string; subtitle: string; image: string }
  sejarah: string[]
  visi: string
  misi: string[]
  programs: Program[]
  facilities: Facility[]
  advantages: Advantage[]
}
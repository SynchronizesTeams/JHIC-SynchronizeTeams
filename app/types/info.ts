export interface Tagline {
  lines: string[]
  footer: string
}

export interface Card {
  title: string
  image: string
  description: string
}

export interface Profile {
  title: string
  paragraphs: string[]
}

export interface SchoolProfileContent {
  tagline: Tagline
  cards: Card[]
  profile: Profile
}

export interface SaprasItem {
  title: string
  description: string
  linkText: string
  linkUrl: string
  image: string
}

export interface SectionProfileContent {
  title: string
  description: string
  linkText?: string
  linkUrl?: string
  image: string
}

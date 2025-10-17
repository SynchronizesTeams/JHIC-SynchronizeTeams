export interface AchievementNews {
  id: number
  title: string
  slug: string
  excerpt: string
}

export interface Achievement {
  id: number
  title: string
  description: string
  image: string
  achievement_date: string
  News: AchievementNews
}

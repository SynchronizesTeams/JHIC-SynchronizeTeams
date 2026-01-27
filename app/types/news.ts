export interface News {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  cover: string;
  date: string;
  content: string;
  author?: string;
}

export type NewsList = News[];

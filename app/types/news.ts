export interface News {
  slug: string;
  title: string;
  excerpt: string;
  cover: string;
  date: string;
  content: string;
  author?: string;
}

export type NewsList = News[];

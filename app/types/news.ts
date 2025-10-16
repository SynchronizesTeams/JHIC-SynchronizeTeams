export interface News {
  slug: string;
  title: string;
  excerpt: string;
  cover: string;
  date: string;
  author: string;
  content: string;
}

export type NewsList = News[];

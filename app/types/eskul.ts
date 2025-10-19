export interface Pembina {
  id: number;
  full_name: string;
}
export interface Eskul {
  id: number;
  title: string;
  description: string;
  image: string;
  logo: string;
  pembina: Pembina[];
}

export interface EskulApiResponse {
  id: number;
  name: string;
  description: string;
  image: string;
  Pembina: Pembina;
}
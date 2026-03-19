export interface Book {
  _id?: string;
  title: string;
  author: string;
  coverImageUrl?: string;
  description?: string;
  publicationDate?: Date;
  genre?: string;
  publisher?: string;
  isbn?: string;
  isAvailable?: boolean | string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface BookFilters {
  page: number;
  limit: number;
  genre?: string;
  isAvailable?: boolean;
  search?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export const GENRES = [
  "Fiction",
  "Non-Fiction",
  "Mystery",
  "Thriller",
  "Romance",
  "Science Fiction",
  "Fantasy",
  "Biography",
  "History",
  "Self-Help",
  "Business",
  "Technology",
  "Poetry",
  "Drama",
  "Horror",
  "Adventure",
  "Children",
  "Other",
] as const;

export type Genre = (typeof GENRES)[number];

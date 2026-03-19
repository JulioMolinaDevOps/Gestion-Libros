import { Document } from "mongoose";

export interface IBook {
  title: string;
  author: string;
  coverImageUrl?: string;
  description?: string;
  publicationDate?: Date;
  genre?: string;
  publisher?: string;
  isbn?: string;
  isAvailable?: boolean | string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IBookDocument extends IBook, Document {}

export interface BookFilters {
  page?: number;
  limit?: number;
  genre?: string;
  isAvailable?: boolean;
  search?: string;
}

export interface PaginatedBooksResult {
  books: IBook[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface CreateBookInput {
  title: string;
  author: string;
  coverImageUrl?: string;
  description?: string;
  publicationDate?: Date;
  genre?: string;
  publisher?: string;
  isbn?: string;
  isAvailable?: boolean;
}

export interface UpdateBookInput extends Partial<CreateBookInput> {}

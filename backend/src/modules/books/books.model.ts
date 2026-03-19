import mongoose, { Schema } from "mongoose";
import { IBookDocument } from "./books.types";

const bookSchema = new Schema<IBookDocument>(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      minlength: [1, "Title must be at least 1 character long"],
      maxlength: [200, "Title cannot exceed 200 characters"],
      index: true,
    },
    author: {
      type: String,
      required: [true, "Author is required"],
      trim: true,
      minlength: [1, "Author must be at least 1 character long"],
      maxlength: [100, "Author cannot exceed 100 characters"],
      index: true,
    },
    coverImageUrl: {
      type: String,
      trim: true,
      maxlength: [500, "Cover image URL cannot exceed 500 characters"],
      validate: {
        validator: function (v: string) {
          if (!v) return true;
          try {
            const url = new URL(v);
            return url.protocol === "http:" || url.protocol === "https:";
          } catch {
            return false;
          }
        },
        message: "Cover image URL must be a valid HTTP/HTTPS URL",
      },
    },
    description: {
      type: String,
      trim: true,
      maxlength: [2000, "Description cannot exceed 2000 characters"],
    },
    publicationDate: {
      type: Date,
    },
    genre: {
      type: String,
      trim: true,
      maxlength: [50, "Genre cannot exceed 50 characters"],
      index: true,
    },
    publisher: {
      type: String,
      trim: true,
      maxlength: [100, "Publisher cannot exceed 100 characters"],
    },
    isbn: {
      type: String,
      trim: true,
      unique: true,
      sparse: true,
      validate: {
        validator: function (v: string) {
          return !v || /^[\d-]{10,17}$/.test(v);
        },
        message:
          "ISBN must be 10-17 characters containing only digits and hyphens",
      },
    },
    isAvailable: {
      type: Boolean,
      default: true,
      index: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (_doc, ret) => {
        ret.id = ret._id;
        delete (ret as any)._id;
        delete (ret as any).__v;
        return ret;
      },
    },
  },
);

bookSchema.index({ title: "text", author: "text" });

export const Book = mongoose.model<IBookDocument>("Book", bookSchema);

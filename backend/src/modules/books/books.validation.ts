import { body, param, query } from "express-validator";

export const createBookValidation = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Title is required")
    .isLength({ min: 1, max: 200 })
    .withMessage("Title must be between 1 and 200 characters"),
  body("author")
    .trim()
    .notEmpty()
    .withMessage("Author is required")
    .isLength({ min: 1, max: 100 })
    .withMessage("Author must be between 1 and 100 characters"),
  body("coverImageUrl")
    .optional()
    .trim()
    .isURL({ require_protocol: true, protocols: ["http", "https"] })
    .withMessage("Cover image URL must be a valid HTTP/HTTPS URL")
    .isLength({ max: 500 })
    .withMessage("Cover image URL cannot exceed 500 characters"),
  body("description")
    .optional()
    .trim()
    .isLength({ max: 2000 })
    .withMessage("Description cannot exceed 2000 characters"),
  body("publicationDate")
    .optional()
    .isISO8601()
    .withMessage("Invalid publication date format"),
  body("genre")
    .optional()
    .trim()
    .isLength({ max: 50 })
    .withMessage("Genre cannot exceed 50 characters"),
  body("publisher")
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage("Publisher cannot exceed 100 characters"),
  body("isbn")
    .optional()
    .trim()
    .matches(/^[\d-]{10,17}$/)
    .withMessage(
      "ISBN must be 10-17 characters containing only digits and hyphens",
    ),
  body("isAvailable")
    .optional()
    .isBoolean()
    .withMessage("isAvailable must be a boolean"),
];

export const updateBookValidation = [
  param("id").isMongoId().withMessage("Invalid book ID"),
  body("title")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Title cannot be empty")
    .isLength({ min: 1, max: 200 })
    .withMessage("Title must be between 1 and 200 characters"),
  body("author")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Author cannot be empty")
    .isLength({ min: 1, max: 100 })
    .withMessage("Author must be between 1 and 100 characters"),
  body("coverImageUrl")
    .optional()
    .trim()
    .isURL({ require_protocol: true, protocols: ["http", "https"] })
    .withMessage("Cover image URL must be a valid HTTP/HTTPS URL")
    .isLength({ max: 500 })
    .withMessage("Cover image URL cannot exceed 500 characters"),
  body("description")
    .optional()
    .trim()
    .isLength({ max: 2000 })
    .withMessage("Description cannot exceed 2000 characters"),
  body("publicationDate")
    .optional()
    .isISO8601()
    .withMessage("Invalid publication date format"),
  body("genre")
    .optional()
    .trim()
    .isLength({ max: 50 })
    .withMessage("Genre cannot exceed 50 characters"),
  body("publisher")
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage("Publisher cannot exceed 100 characters"),
  body("isbn")
    .optional()
    .trim()
    .matches(/^[\d-]{10,17}$/)
    .withMessage(
      "ISBN must be 10-17 characters containing only digits and hyphens",
    ),
  body("isAvailable")
    .optional()
    .isBoolean()
    .withMessage("isAvailable must be a boolean"),
];

export const getBooksValidation = [
  query("page")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Page must be a positive integer")
    .toInt(),
  query("limit")
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage("Limit must be between 1 and 100")
    .toInt(),
  query("genre").optional().trim(),
  query("isAvailable")
    .optional()
    .isBoolean()
    .withMessage("isAvailable must be a boolean")
    .toBoolean(),
  query("search")
    .optional()
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage("Search query must be between 1 and 100 characters"),
];

export const bookIdValidation = [
  param("id").isMongoId().withMessage("Invalid book ID"),
];

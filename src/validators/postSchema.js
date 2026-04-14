import { z } from "zod";

// Validating the ID in URL parameters
export const getPostSchema = z.object({
  params: z.object({
    id: z.string().regex(/^\d+$/, "ID must be a number"), // Ensure ID is numeric string
  }),
});

// Validating Post Creation
export const createPostSchema = z.object({
  body: z.object({
    title: z.string().min(3, "Title must be at least 3 characters"),
    short_content: z
      .string()
      .min(10, "Short content must be at least 10 characters"),
    content: z.string().min(20, "Content must be at least 20 characters"),
  }),
});

// Validating Post Update
export const updatePostSchema = z.object({
  params: z.object({
    id: z.string().regex(/^\d+$/, "ID must be a number"),
  }),
  body: z
    .object({
      title: z.string().min(3).optional(),
      short_content: z.string().min(10).optional(),
      content: z.string().min(20).optional(),
    })
    .refine((data) => Object.keys(data).length > 0, {
      message: "At least one field must be provided for update",
    }),
});

// Validating Post Deletion
export const deletePostSchema = z.object({
  params: z.object({
    id: z.string().regex(/^\d+$/, "ID must be a number"),
  }),
});

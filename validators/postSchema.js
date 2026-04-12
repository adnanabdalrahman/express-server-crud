import { z } from "zod";

export const getPostSchema = z.object({
  params: z.object({
    id: z.string(),
  }),
});

export const updatePostSchema = z.object({
  params: z.object({
    id: z.string(),
  }),
  body: z
    .object({
      title: z.string().min(3, "Title must be at least 3 characters"),
      short_content: z
        .string()
        .min(10, "Short content must be at least 10 characters"),
      content: z.string().min(20, "Content must be at least 20 characters"),
    })
    .refine((data) => Object.keys(data).length > 0, {
      message: "At least one field must be provided for update",
    }),
});

export const createPostSchema = z.object({
  body: z
    .object({
      title: z.string().min(3),
      short_content: z.string().min(10),
      content: z.string().min(20),
    })
    .refine((data) => Object.keys(data).length > 0, {
      message: "At least one field must be provided for update",
    }),
});

export const deletePostSchema = z.object({
  params: z.object({
    id: z.string(),
  }),
});

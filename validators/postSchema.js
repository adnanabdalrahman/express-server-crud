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
      url: z.string().url().optional(),
      title: z.string().min(3).optional(),
      shortContent: z.string().min(10).optional(),
      content: z.string().min(20).optional(),
    })
    .refine((data) => Object.keys(data).length > 0, {
      message: "At least one field must be provided for update",
    }),
});

export const createPostSchema = z.object({
  body: z
    .object({
      url: z.string().url(),
      title: z.string().min(3),
      shortContent: z.string().min(10),
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

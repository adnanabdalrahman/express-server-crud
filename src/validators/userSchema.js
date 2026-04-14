import { z } from "zod";

export const getUserSchema = z.object({
  params: z.object({
    id: z.string(),
  }),
});

export const updateUserSchema = z.object({
  params: z.object({
    id: z.string(),
  }),
  body: z.object({
    age: z.number().min(18).optional(),
    name: z.string().optional(),
  }),
});

export const createUserSchema = z.object({
  body: z.object({
    age: z.number().min(18),
    name: z.string(),
  }),
});

export const deleteUserSchema = z.object({
  params: z.object({
    id: z.string(),
  }),
});

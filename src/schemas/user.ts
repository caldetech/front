import { z } from "zod";

export const userSchema = z.object({
  id: z.string(),
  avatarUrl: z.string().optional(),
  createdAt: z.date().optional(),
  email: z.string().email().optional(),
  name: z.string().nullish(),
  number: z.string().nullish(),
  passwordHash: z.string().optional(),
  status: z.enum(["ACTIVE", "PENDING", "INACTIVE"]),
  updatedAt: z.date().optional(),
});

export type User = z.infer<typeof userSchema>;

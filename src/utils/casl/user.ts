import { z } from "zod";

export const userSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  avatarUrl: z.string().url().nullable(),
  iat: z.number(),
  exp: z.number(),
  membership: z.string(),
  role: z.enum(["ADMIN", "MEMBER", "BILLING", "MANAGER"]),
});

export type User = z.infer<typeof userSchema>;

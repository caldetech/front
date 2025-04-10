import { z } from "zod";

export const blingTokensSchema = z.object({
  id: z.string().optional(),
  accessToken: z.string(),
  refreshToken: z.string().optional(),
  expiresAt: z.date().optional(),
  organizationId: z.string().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export type BlingTokensSchema = z.infer<typeof blingTokensSchema>;

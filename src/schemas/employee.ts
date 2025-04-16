import { z } from "zod";

export const employeeSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  number: z.string(),
  passwordHash: z.string(),
  avatarUrl: z.string(),
  status: z.string(),
  createdAt: z.string(),
  updatedAt: z.date(),
});

export type Employee = z.infer<typeof employeeSchema>;

import { z } from "zod";

export const roleSchema = z.enum([
  "ADMIN",
  "MEMBER",
  "BILLING",
  "MANAGER",
  "DEV",
]);

export type Role = z.infer<typeof roleSchema>;

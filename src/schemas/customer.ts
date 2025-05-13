import { z } from "zod";

export const customerSchema = z.object({
  id: z.string(),
  customerType: z.enum(["COMPANY", "PERSON"]),
  name: z.string(),
  document: z.string().optional(),
  mainNumber: z.string(),
  contactNumber: z.string(),
  address: z.string(),
  createdAt: z.string().optional(),
  updatedAt: z.date().optional(),
  organizationId: z.date().optional(),
});

export type Customer = z.infer<typeof customerSchema>;

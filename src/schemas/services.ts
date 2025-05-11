import { z } from "zod";

export const serviceSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  price: z.number(),
  organizationId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const ServiceResponseSchema = z.object({
  data: z.array(serviceSchema),
});

export type Service = z.infer<typeof serviceSchema>;
export type ServiceResponse = z.infer<typeof ServiceResponseSchema>;

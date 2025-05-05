import { z } from "zod";

const orderAttachmentSchema = z.object({
  id: z.string().uuid(),
  orderId: z.string().uuid(),
  filename: z.string(),
  url: z.string().url(),
  mimetype: z.string(),
});

export const orderSchema = z.object({
  __typename: z.literal("Order").default("Order"),
  id: z.string().uuid(),
  customer: z.string(),
  orderAttachment: z.array(orderAttachmentSchema),
  payment: z.enum(["PENDING", "RECEIVED", "CANCELLED"]),
  status: z.enum(["OPEN", "CLOSED", "CANCELLED"]),
  type: z.enum(["SALE", "BUDGET", "WARRANTY"]),
});

export type Order = z.infer<typeof orderSchema>;

import { z } from "zod";

export const serviceSubject = z.tuple([
  z.union([
    z.literal("manage"),
    z.literal("get"),
    z.literal("update"),
    z.literal("delete"),
    z.literal("create"),
  ]),
  z.literal("Service"),
]);

export type ServiceSubject = z.infer<typeof serviceSubject>;

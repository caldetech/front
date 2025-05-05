import { z } from "zod";

export const integrationSubject = z.tuple([
  z.union([
    z.literal("manage"),
    z.literal("get"),
    z.literal("update"),
    z.literal("delete"),
    z.literal("create"),
  ]),
  z.literal("Integration"),
]);

export type IntegrationSubject = z.infer<typeof integrationSubject>;

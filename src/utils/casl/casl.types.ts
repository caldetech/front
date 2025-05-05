import { z } from "zod";
import { createMongoAbility, MongoAbility, CreateAbility } from "@casl/ability";
import { orderSubject } from "./subjects/order";
import { integrationSubject } from "./subjects/integration";
import { commissionSubject } from "./subjects/commission";
import { serviceSubject } from "./subjects/service";
import { customerSubject } from "./subjects/customer";
import { userSubject } from "./subjects/user";

export const appAbilitiesSchema = z.union([
  orderSubject,
  integrationSubject,
  commissionSubject,
  serviceSubject,
  customerSubject,
  userSubject,
  z.tuple([z.literal("manage"), z.literal("all")]),
]);

export type AppAbilities = z.infer<typeof appAbilitiesSchema>;

export type AppAbility = MongoAbility<AppAbilities>;
export const createAppAbility = createMongoAbility as CreateAbility<AppAbility>;

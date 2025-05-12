import { AbilityBuilder } from "@casl/ability";

import { AppAbility } from "./casl.types";
import { User } from "./user";
import { Role } from "../../schemas/role";

type PermissionsByRole = (
  user: User,
  builder: AbilityBuilder<AppAbility>
) => void;

export const permissions: Record<Role, PermissionsByRole> = {
  ADMIN(_, { can }) {
    can("get", [
      "Order",
      "Service",
      "Customer",
      "User",
      "Commission",
      "Integration",
    ]);
    can("editVisibility", "Order");
  },
  MEMBER(_, { can }) {
    can("get", ["Order", "Service", "Customer", "Commission"]);
  },
  BILLING(_, { can }) {
    can("get", [
      "Order",
      "Service",
      "Customer",
      "User",
      "Commission",
      "Integration",
    ]);
    can("editVisibility", "Order");
  },
  MANAGER(_, { can }) {
    can("get", [
      "Order",
      "Service",
      "Customer",
      "User",
      "Commission",
      "Integration",
    ]);
    can("editVisibility", "Order");
  },
};

import { AbilityBuilder, createMongoAbility } from "@casl/ability";
import { AppAbility } from "./casl.types";
import { permissions } from "./permissions";
import { Role } from "@/schemas/role";
import { User } from "./user";

export function defineAbilitiesFor(user: User): AppAbility {
  const builder = new AbilityBuilder<AppAbility>(createMongoAbility);
  const permissionsForRole = permissions[user.role as Role];

  if (permissionsForRole) {
    permissionsForRole(user, builder);
  }

  return builder.build();
}

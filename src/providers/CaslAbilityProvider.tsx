"use client";

import { ReactNode } from "react";
import { AbilityContext } from "@/contexts/AbilityContext";
import { defineAbilitiesFor } from "@/utils/casl/define-abilities";
import type { User } from "@/utils/casl/user";

export function AbilityProvider({
  user,
  children,
}: {
  user: User;
  children: ReactNode;
}) {
  const ability = defineAbilitiesFor(user);
  return (
    <AbilityContext.Provider value={ability}>
      {children}
    </AbilityContext.Provider>
  );
}

import { createContext } from "react";
import type { AppAbility } from "../utils/casl/casl.types";

export const AbilityContext = createContext<AppAbility>(null!);

"use client";
import { useContext } from "react";
import { Can as CaslCan } from "@casl/react";
import { AbilityContext } from "@/contexts/AbilityContext";

export function Can({
  I,
  a,
  children,
}: {
  I: string;
  a: string;
  children: React.ReactNode;
}) {
  const ability = useContext(AbilityContext);
  return (
    <CaslCan I={I} a={a} ability={ability}>
      {children}
    </CaslCan>
  );
}

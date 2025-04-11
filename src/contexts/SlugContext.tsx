"use client";

import { createContext, useContext, ReactNode } from "react";

const SlugContext = createContext<string | undefined>(undefined);

export const SlugProvider = ({
  slug,
  children,
}: {
  slug?: string;
  children: ReactNode;
}) => {
  return <SlugContext.Provider value={slug}>{children}</SlugContext.Provider>;
};

export const useSlug = () => {
  const slug = useContext(SlugContext);
  if (slug === undefined) {
    throw new Error("useSlug must be used within an SlugProvider");
  }
  return slug;
};

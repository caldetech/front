"use client";

import { createContext, useContext } from "react";

type User = {
  id: string;
  name: string;
  email: string;
  role: "DEV" | "ADMIN" | "BILLING" | "MANAGER" | "MEMBER";
  membership: string;
  avatarUrl: string | null;
};

const UserContext = createContext<User | null>(null);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

export const UserProvider = ({
  user,
  children,
}: {
  user: User;
  children: React.ReactNode;
}) => {
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

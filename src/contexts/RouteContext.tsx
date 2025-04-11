"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

const RouteContext = createContext<{ previous: string | null }>({
  previous: null,
});

export function RouteProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [previous, setPrevious] = useState<string | null>(null);
  const current = useRef(pathname);

  useEffect(() => {
    if (current.current !== pathname) {
      setPrevious(current.current);
      current.current = pathname;
    }
  }, [pathname]);

  return (
    <RouteContext.Provider value={{ previous }}>
      {children}
    </RouteContext.Provider>
  );
}

export const useRouteContext = () => useContext(RouteContext);

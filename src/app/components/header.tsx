import { SidebarTrigger } from "@/components/ui/sidebar"; 
import UserMenu from "./user-menu";

export default function Header() {
  return (
    <div className="sticky top-0 z-10 flex flex-col">
      <header className="flex h-14 items-center gap-2 border-b border-foreground/10 bg-background px-4 lg:h-[60px] justify-between">
        <SidebarTrigger className="*:size-5" />
        <UserMenu />
      </header>
    </div>
  );
}


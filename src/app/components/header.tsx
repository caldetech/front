import { SidebarTrigger } from "@/components/ui/sidebar"; 

export default function Header() {
  return (
    <div className="sticky top-0 z-10 flex flex-col">
      <header className="flex h-14 items-center gap-2 border-b border-foreground/10 bg-background px-4 lg:h-[60px]">
        <SidebarTrigger className="*:size-5" />
        <h1>Teste</h1>
      </header>
    </div>
  );
}


import { SidebarTrigger } from "@/components/ui/sidebar";
import UserMenu from "./UserMenu";

export default function Header({ slug }: { slug: string }) {
  return (
    <div className="absolute sm:static top-0 sm:z-10 sm:flex sm:flex-col flex w-full">
      <header className="sm:w-full sm:flex sm:h-14 sm:items-center sm:gap-2 sm:border-b sm:border-foreground/10 sm:bg-background sm:px-4 lg:h-[60px] sm:justify-between">
        <SidebarTrigger className="*:size-5 hidden sm:flex" />
        <UserMenu slug={slug} />
      </header>
    </div>
  );
}

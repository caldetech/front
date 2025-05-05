import { SidebarTrigger } from "@/components/ui/sidebar";
import UserMenu from "./UserMenu";
import { User } from "@/utils/casl/user";

export default function NewHeader({
  slug,
  user,
}: {
  slug: string;
  user: User;
}) {
  return (
    <div className="absolute sm:static top-0 sm:z-10 sm:flex sm:flex-col flex w-full">
      <header className="sm:w-full sm:flex sm:h-14 sm:items-center sm:gap-2 sm:border-b sm:border-foreground/10 sm:bg-background sm:px-4 lg:h-[60px] sm:justify-between">
        <SidebarTrigger className="*:size-5 hidden sm:flex" />
        <UserMenu slug={slug} user={user} />
      </header>
    </div>
  );
}

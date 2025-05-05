import { User } from "@/utils/casl/user";
import NewHeader from "./NewHeader";
import NewSidebar from "./NewSidebar";

export default function MainLayout({
  children,
  slug,
  user,
}: {
  children: React.ReactNode;
  slug: string;
  user: User;
}) {
  return (
    <div className="relative sm:static flex w-full h-screen overflow-hidden flex-col sm:flex-row">
      <NewSidebar slug={slug} user={user} />
      <div className="absolute sm:static w-full h-full">
        <NewHeader slug={slug} user={user} />
        <main className="top-16 sm:static flex-1 overflow-hidden relative">
          <div className="flex flex-col h-full w-full overflow-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

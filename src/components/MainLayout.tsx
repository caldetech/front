import Header from "./Header";
import Sidebar from "./Sidebar";

export default function MainLayout({
  children,
  slug,
}: {
  children: React.ReactNode;
  slug: string;
}) {
  return (
    <div className="relative sm:static flex w-full h-screen overflow-hidden flex-col sm:flex-row">
      <Sidebar slug={slug} />
      <div className="absolute sm:static w-full h-full">
        <Header slug={slug} />
        <main className="top-16 sm:static flex-1 overflow-hidden relative">
          <div className="flex flex-col h-full w-full overflow-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

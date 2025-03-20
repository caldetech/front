import Header from "./header";
import Sidebar from "./sidebar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
      <div className="relative sm:static flex w-full h-screen overflow-hidden flex-col sm:flex-row">
        <Sidebar />
        <div className="absolute sm:static w-full h-full">
          <Header />
          <main className="top-14 sm:static flex-1 overflow-hidden relative">
            <div className="flex flex-col h-full w-full overflow-auto">
              {children}
            </div>
          </main>
        </div>
      </div>
  );
}




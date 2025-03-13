import Header from "../components/header";
import Sidebar from "../components/sidebar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
      <div className="flex w-full h-screen overflow-hidden">
        <Sidebar />
        <div className="flex flex-col w-full h-full">
          <Header />
          <main className="flex-1 overflow-hidden relative">
            <div className="flex flex-col h-full w-full overflow-auto">
              {children}
            </div>
          </main>
        </div>
      </div>
  );
}

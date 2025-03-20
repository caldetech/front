import MainLayout from "../components/main-layout"; 
import { SidebarProvider } from "@/components/ui/sidebar";

export default async function AuthLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <MainLayout>{children}</MainLayout>
    </SidebarProvider>
  );
}










import MainLayout from "@/components/MainLayout";
import { SidebarProvider } from "@/components/ui/sidebar";

export default async function AuthLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { slug: string };
}>) {
  return (
    <SidebarProvider>
      <MainLayout slug={params.slug}>{children}</MainLayout>
    </SidebarProvider>
  );
}

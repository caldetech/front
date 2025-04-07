import MainLayout from "@/components/MainLayout";
import { SidebarProvider } from "@/components/ui/sidebar";
import { SlugProvider } from "@/contexts/SlugContext";

export default async function AuthLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { slug: string };
}>) {
  return (
    <SlugProvider slug={params.slug}>
      <SidebarProvider>
        <MainLayout slug={params.slug}>{children}</MainLayout>
      </SidebarProvider>
    </SlugProvider>
  );
}

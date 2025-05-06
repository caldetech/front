import MainLayout from "@/components/MainLayout";
import { SidebarProvider } from "@/components/ui/sidebar";
import { SlugProvider } from "@/contexts/SlugContext";
import { getProfile } from "@/http/get-profile";
import { AbilityProvider } from "@/providers/CaslAbilityProvider";

export default async function AuthLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { slug: string };
}>) {
  const { slug } = await params;
  const user = await getProfile(slug);

  return (
    <AbilityProvider user={user}>
      <SlugProvider slug={slug}>
        <SidebarProvider>
          <MainLayout slug={slug} user={user}>
            {children}
          </MainLayout>
        </SidebarProvider>
      </SlugProvider>
    </AbilityProvider>
  );
}

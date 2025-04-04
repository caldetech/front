"use client";

import React from "react";
import {
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { page_routes } from "@/data/routes";
import { usePathname } from "next/navigation";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Collapsible, CollapsibleTrigger } from "@/components/ui/collapsible";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import IconComponent from "./Icon";
import { Power, Star } from "lucide-react";

export default function Sidebar({ slug }: { slug?: string }) {
  const pathname = usePathname();

  const groupTitles = {
    Pages: "Páginas",
  };

  const routeTitles = {
    Orders: "Ordens",
    Services: "Serviços",
    Products: "Produtos",
    Customers: "Clientes",
    Users: "Funcionários",
    Comissions: "Comissões",
  };

  async function handleLogout() {
    await fetch("/api/auth/sign-out", { method: "GET" });
    window.location.href = "/entrar";
  }

  return (
    <div className="p-6 flex flex-col sm:h-full border-r border-foreground/10 sm:min-w-60 z-10 items-center sm:items-start sm:w-fit">
      <SidebarHeader className="h-16 items-center justify-center hidden sm:flex">
        <SidebarMenu>
          <SidebarMenuItem className="flex items-center justify-items-start select-none px-2">
            <Star className="me-2 group-data-[collapsible=icon]:me-0" />
            Caldetech
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent className="pr-2 bg-card text-card-foreground sm:border-none sm:shadow-none flex flex-row sm:flex-col gap-2 rounded-md border shadow-sm overflow-hidden flex-1 w-full items-center justify-between sm:items-start sm:justify-items-start">
        <ScrollArea className="w-full">
          {page_routes
            .filter((route) => Object.keys(groupTitles).includes(route.title))
            .map((route, key) => (
              <SidebarGroup key={key}>
                <SidebarGroupLabel className="hidden sm:flex">
                  {groupTitles[route.title as keyof typeof groupTitles]}
                </SidebarGroupLabel>

                <SidebarGroupContent>
                  <SidebarMenu className="flex flex-row sm:flex-col font-light">
                    {route.items
                      .filter((item) =>
                        Object.keys(routeTitles).includes(item.title)
                      )
                      .map((item, key) => {
                        return (
                          <SidebarMenuItem key={key}>
                            {item.items?.length ? (
                              <Collapsible className="group/collapsible">
                                <CollapsibleTrigger asChild>
                                  <Link href={`/${slug}${item.href}`}>
                                    <SidebarMenuButton
                                      tooltip={item.title}
                                      isActive={
                                        pathname === `/${slug}${item.href}`
                                      }
                                      className="cursor-pointer"
                                    >
                                      <IconComponent
                                        iconName={item.icon || ""}
                                      />
                                      <span className="hidden sm:flex">
                                        {
                                          routeTitles[
                                            item.title as keyof typeof routeTitles
                                          ]
                                        }
                                      </span>
                                    </SidebarMenuButton>
                                  </Link>
                                </CollapsibleTrigger>
                              </Collapsible>
                            ) : (
                              <SidebarMenuButton
                                asChild
                                tooltip={item.title}
                                isActive={pathname === `/${slug}${item.href}`}
                              >
                                <Link
                                  href={`/${slug}${item.href}`}
                                  target={item.newTab ? "_blank" : ""}
                                >
                                  <span>{item.title}</span>
                                </Link>
                              </SidebarMenuButton>
                            )}
                            {item.isComing ? (
                              <SidebarMenuBadge className="opacity-50">
                                Coming
                              </SidebarMenuBadge>
                            ) : null}
                            {item.isNew ? (
                              <SidebarMenuBadge className="text-green-500 dark:text-green-200">
                                New
                              </SidebarMenuBadge>
                            ) : null}
                          </SidebarMenuItem>
                        );
                      })}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            ))}
        </ScrollArea>

        <Button className="sm:hidden rounded-md h-8 w-8" onClick={handleLogout}>
          <Power />
        </Button>
      </SidebarContent>

      <SidebarFooter className="hidden sm:flex w-full">
        <Card className="group-data-[collapsible=icon]:hidden">
          <CardContent>
            <Button className="w-full" onClick={handleLogout}>
              Sair
            </Button>
          </CardContent>
        </Card>
      </SidebarFooter>
    </div>
  );
}

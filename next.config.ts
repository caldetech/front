import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/ordens",
        destination: "/orders",
      },
      {
        source: "/clientes",
        destination: "/customers",
      },
      {
        source: "/servicos",
        destination: "/services",
      },
      {
        source: "/produtos",
        destination: "/products",
      },
      {
        source: "/comissoes",
        destination: "/comissions",
      },
      {
        source: "/funcionarios",
        destination: "/users",
      },
      {
        source: "/entrar",
        destination: "/sign-in",
      },
      {
        source: "/cadastrar",
        destination: "/sign-up",
      },
      {
        source: "/contas",
        destination: "/accounts",
      },
    ];
  },
};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["caldetech-orders-prod.s3.amazonaws.com"],
  },
  async rewrites() {
    return [
      {
        source: "/:slug/ordens",
        destination: "/:slug/orders",
      },
      {
        source: "/:slug/clientes",
        destination: "/:slug/customers",
      },
      {
        source: "/:slug/servicos",
        destination: "/:slug/services",
      },
      {
        source: "/:slug/produtos",
        destination: "/:slug/products",
      },
      {
        source: "/:slug/comissoes",
        destination: "/:slug/comissions",
      },
      {
        source: "/:slug/funcionarios",
        destination: "/:slug/users",
      },
      {
        source: "/entrar",
        destination: "/log-in",
      },
      {
        source: "/cadastrar",
        destination: "/register",
      },
      {
        source: "/:slug/contas",
        destination: "/:slug/accounts",
      },
      {
        source: "/:slug/integracoes",
        destination: "/:slug/integrations",
      },
      {
        source: "/confirmar-conta",
        destination: "/confirm-account",
      },
      {
        source: "/recuperar-senha",
        destination: "/password-recover",
      },
      {
        source: "/nova-senha",
        destination: "/new-password",
      },
      {
        source: "/integracoes/bling",
        destination: "/integrations/bling",
      },
      {
        source: "/:slug/integracoes",
        destination: "/:slug/integrations",
      },
    ];
  },
};

export default nextConfig;

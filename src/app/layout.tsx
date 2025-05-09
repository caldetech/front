import {
  Inter,
  Roboto,
  Montserrat,
  Poppins,
  Overpass_Mono,
} from "next/font/google";
import { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
import CookiesProviderWrapper from "@/components/CookieProviderWrapper";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-roboto",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-montserrat",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-poppins",
});

const overpass_mono = Overpass_Mono({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-overpass-mono",
});

export const metadata: Metadata = {
  title: "Caldetech - Sistema de Gerenciamento",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${inter.className} ${inter.variable} ${roboto.variable} ${montserrat.variable} ${poppins.variable} ${overpass_mono.variable}`}
      >
        <CookiesProviderWrapper>
          <AuthProvider>{children}</AuthProvider>
        </CookiesProviderWrapper>
      </body>
    </html>
  );
}

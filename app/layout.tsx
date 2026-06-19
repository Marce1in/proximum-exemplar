import type { Metadata } from "next";
import { ptBR } from "@clerk/localizations";
import { ClerkProvider } from "@clerk/nextjs";
import { Geist, Geist_Mono } from "next/font/google";
import { TRPCReactProvider } from "@/components/providers/trpc-provider";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Proximum Exemplar",
  description: "Template full-stack em Next.js para hackathons",
};

const clerkProxyUrl = process.env.NEXT_PUBLIC_CLERK_PROXY_URL || undefined;
const clerkLocalization = {
  ...ptBR,
  signIn: {
    ...ptBR.signIn,
    start: {
      ...ptBR.signIn?.start,
      subtitle: "Acesse sua conta para continuar.",
      subtitleCombined: "Bem-vindo de volta. Acesse sua conta para continuar.",
      title: "Entrar",
      titleCombined: "Entrar no Proximum Exemplar",
    },
  },
  signUp: {
    ...ptBR.signUp,
    start: {
      ...ptBR.signUp?.start,
      subtitle: "Crie sua conta para continuar.",
      subtitleCombined: "Crie sua conta para continuar.",
      title: "Criar conta",
      titleCombined: "Criar sua conta no Proximum Exemplar",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <ClerkProvider
          localization={clerkLocalization}
          proxyUrl={clerkProxyUrl}
          appearance={{
            cssLayerName: "clerk",
          }}
        >
          <TRPCReactProvider>
            {children}
            <Toaster />
          </TRPCReactProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}

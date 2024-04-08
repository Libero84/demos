import type { Metadata } from "next";

import "@/styles/globals.css";

import { ApolloWrapper } from "@/lib/apollo-wrapper";
import { Roboto_Condensed as FontSans } from "next/font/google";

import { cn } from "@/lib/utils";
import Footer from "@/components/custom/molecules/footer";
import Header from "@/components/custom/molecules/header";

const fontSans = FontSans({
  weight: "400",
  style: "normal",
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Vertuoza interview task",
  description: "Interview application, Polcode company",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={
          (cn("font-sans, antialiased text-base, sm:text-sm"),
          fontSans.variable)
        }
      >
        <>
          <Header />

          <main className="p-10 flex-1 bg-slate-50 overflow-auto">
            <ApolloWrapper>{children}</ApolloWrapper>
          </main>

          <aside id="portal" />

          <Footer />
        </>
      </body>
    </html>
  );
}

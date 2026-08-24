import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import { OldSiteMigrationDialog } from "@/components/OldSiteMigrationDialog";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Programmes2027 — Comparateur des programmes politiques",
  description:
    "Comparez les propositions des partis politiques français pour 2027, jouez à l'aveugle et trouvez le parti le plus proche de vos idées.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="fr"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900">
        <NavBar />
        <div className="flex flex-1 flex-col">{children}</div>
        <Footer />
        <OldSiteMigrationDialog />
      </body>
    </html>
  );
}

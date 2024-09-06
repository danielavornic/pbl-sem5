import "@/styles/globals.css";

import type { Metadata } from "next";
import { Lato, Montserrat } from "next/font/google";
import { Toaster } from "sonner";

import { cn } from "@/lib/utils";
import { ReactQueryProvider } from "@/providers/react-query-provider";

const lato = Lato({
  subsets: ["latin-ext"],
  weight: ["400", "700"],
  variable: "--font-lato"
});
const montserrat = Montserrat({
  subsets: ["latin-ext"],
  weight: ["400", "600", "700"],
  variable: "--font-montserrat"
});

export const metadata: Metadata = {
  title: "Voluntariat Moldova",
  description:
    "Voluntariat Moldova este o platformă de voluntariat care conectează persoanele care doresc să ajute cu organizațiile care au nevoie de voluntari."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ReactQueryProvider>
      <html lang="ro" className={cn(lato.variable, montserrat.variable)}>
        <body>{children}</body>
        <Toaster richColors position="top-right" />
      </html>
    </ReactQueryProvider>
  );
}

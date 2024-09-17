import "@/styles/globals.css";

import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import { Suspense } from "react";
import { Toaster } from "sonner";

import { cn } from "@/lib/utils";
import ProgressBarProvider from "@/providers/progress-bar-provider";
import ReactQueryProvider from "@/providers/react-query-provider";

const inter = Inter({
  subsets: ["latin-ext"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap"
});
const montserrat = Montserrat({
  subsets: ["latin-ext"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-montserrat",
  display: "swap"
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
      <html lang="ro" className={cn(inter.variable, montserrat.variable)}>
        <body>
          <Suspense>
            <ProgressBarProvider>{children}</ProgressBarProvider>
            <Toaster richColors closeButton />
          </Suspense>
        </body>
      </html>
    </ReactQueryProvider>
  );
}

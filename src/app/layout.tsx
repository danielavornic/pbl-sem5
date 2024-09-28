import "@/styles/globals.css";

import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import { Suspense } from "react";
import { Toaster } from "sonner";

import { cn } from "@/lib/utils";
import { AuthProvider } from "@/providers/auth-provider";
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

const cspContent = `
  default-src 'self';
  script-src 'self' 'unsafe-eval' 'unsafe-inline';
  style-src 'self' 'unsafe-inline';
  object-src 'none';
  base-uri 'self';
  form-action 'self';
  frame-ancestors 'none';
  block-all-mixed-content;
  upgrade-insecure-requests;
`;

export const metadata: Metadata = {
  title: "Voluntariat Moldova",
  description:
    "Voluntariat Moldova este o platformă de voluntariat care conectează persoanele care doresc să ajute cu organizațiile care au nevoie de voluntari.",
  other: {
    "Content-Security-Policy": cspContent.replace(/\s{2,}/g, " ").trim()
  }
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
            <ProgressBarProvider>
              <AuthProvider>{children}</AuthProvider>
            </ProgressBarProvider>
            <Toaster richColors closeButton />
          </Suspense>
        </body>
      </html>
    </ReactQueryProvider>
  );
}

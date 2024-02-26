import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.scss";
import Providers from "@/utils/query-client/query-client";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import "react-toastify/dist/ReactToastify.css";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Toaster from "@/components/shared/toaster/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <head>
        <title>Taroko Project</title>
      </head>

      <body suppressHydrationWarning={true} className={inter.className}>
        <Providers>
          {children}
          <Analytics />
          <SpeedInsights />
          <ReactQueryDevtools initialIsOpen={false} />
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import ProModalProvider from "@/components/proModalProvider";
import StoreProvider from "./StoreProvider";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Riddle's",
  description: "Generated by create next app",
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">

        <body className={inter.className}>
          <StoreProvider>

            <ProModalProvider />
            {children}
          </StoreProvider>


        </body>
      </html>
    </ClerkProvider>
  );
}






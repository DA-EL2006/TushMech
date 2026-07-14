import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "./components/Providers";
import { ThemeProvider } from "./components/ThemeProvider";
import ThemeToggle from "./components/ThemeToggle";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "TushMech — Precision Autocare Ecosystem",
  description: "On-demand mobile mechanics, spare parts marketplace, and fleet management — all in one premium platform.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`} suppressHydrationWarning>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col font-[Inter,sans-serif]">
        <ThemeProvider attribute="class" defaultTheme="light" disableTransitionOnChange>
          <Providers>
            {children}
            <ThemeToggle className="fixed bottom-6 left-6 z-[9999] bg-[var(--surface-container-highest)] shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-[var(--outline-variant)]/30 backdrop-blur-md" />
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}

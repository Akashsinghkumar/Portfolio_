import type { Metadata } from "next";
import { Outfit, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Akash Kumar | Full-Stack Developer & Portfolio",
  description: "Freelance Software Developer specializing in MERN Stack, React, Next.js, and high-performance web applications.",
  keywords: ["Akash Kumar", "MERN Stack Developer", "Freelance Software Developer", "React Developer", "Next.js Portfolio"],
  authors: [{ name: "Akash Kumar" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${plusJakartaSans.variable} scroll-smooth`}
      suppressHydrationWarning
    >
      <head />
      <body className="bg-dark-bg text-text-main min-h-screen antialiased flex flex-col transition-colors duration-300">
        {children}
      </body>
    </html>
  );
}

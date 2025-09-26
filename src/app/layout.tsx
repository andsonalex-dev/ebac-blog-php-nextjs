import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/app/globals.css";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Blog PHP Tecnologia EBAC",
    template: "%s | Blog PHP EBAC"
  },
  description: "Blog sobre tecnologia PHP, desenvolvimento web e as melhores práticas do mercado.",
  keywords: ["php", "desenvolvimento web", "programação", "tecnologia", "EBAC"],
  authors: [{ name: "EBAC" }],
  creator: "EBAC",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://blog-php-ebac.vercel.app",
    siteName: "Blog PHP EBAC",
    title: "Blog PHP Tecnologia EBAC",
    description: "Blog sobre tecnologia PHP, desenvolvimento web e as melhores práticas do mercado.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog PHP Tecnologia EBAC",
    description: "Blog sobre tecnologia PHP, desenvolvimento web e as melhores práticas do mercado.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}

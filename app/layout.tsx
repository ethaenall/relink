import type { Metadata } from "next";
import localFont from "next/font/local";
import { Newsreader } from "next/font/google";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const paper = Newsreader({
  subsets: ["latin"],
  variable: "--font-paper",
  style: ["normal", "italic"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Relink — tonight’s page has undefined references",
  description:
    "For Lena, 16, first night back in Algebra 2 after nine days of flu. Relink names the marks the worksheet assumes she already has, resolves only those, and returns her to the page.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${paper.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

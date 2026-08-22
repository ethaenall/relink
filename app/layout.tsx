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
  adjustFontFallback: false,
});

export const metadata: Metadata = {
  metadataBase: new URL("https://relink-two.vercel.app"),
  title: "Relink — tonight’s page has undefined references",
  description:
    "Lena Park, 16, first night back in Algebra 2. Relink names only the marks the worksheet assumes she has, then she writes the next line. No account. No model.",
  openGraph: {
    title: "Relink — tonight’s page has undefined references",
    description:
      "error[E0425]: 3 undefined references. Lena writes the next line. Relink does not.",
    url: "https://relink-two.vercel.app/",
    siteName: "Relink",
    type: "website",
  },
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

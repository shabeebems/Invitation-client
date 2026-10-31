import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const plusJakarta = localFont({
  src: "../fonts/plus-jakarta-sans-latin.woff2",
  variable: "--font-plus-jakarta",
  weight: "200 800",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: "Save the Kath",
  applicationName: "Save the Kath",
  description: "Elegant digital invitations for weddings, housewarmings and celebrations.",
  openGraph: {
    siteName: "Save the Kath",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${plusJakarta.variable} h-full antialiased`}
      data-scroll-behavior="smooth"
    >
      <body className="h-full font-sans">{children}</body>
    </html>
  );
}

import type { Metadata } from "next";
import { Poppins, Corben } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const corben = Corben({
  variable: "--font-corben",
  subsets: ["latin"],
  weight: ["700"], // Corben 700 is very similar to Cooper Black
  display: "swap",
});

export const metadata: Metadata = {
  title: "SSF Alparamba - Digital Varisankhya",
  description: "Digital Varisankhya Collection Portal for SSF Alparamba Unit",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} ${corben.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}

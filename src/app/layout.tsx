import { Space_Mono } from "next/font/google";

import "./globals.css";

const spaceMono = Space_Mono({ subsets: ["latin"], weight: ["400", "700"] });

export const metadata = {
  title: "Password Generator",
  description: "By Facundo Perez Montalvo",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={spaceMono.className}>{children}</body>
    </html>
  );
}

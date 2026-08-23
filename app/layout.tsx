import type { Metadata } from "next";
import "./globals.css";

// Yeh function browser tab ka content set karta hai
export const metadata: Metadata = {
  title: "MovieFlex - Clean Stream", // Browser Tab Title
  description: "A zero-ad cloud movie experience.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Yeh line browser tab mein icon lagayegi */}
        <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🎬</text></svg>" />
      </head>
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  );
}

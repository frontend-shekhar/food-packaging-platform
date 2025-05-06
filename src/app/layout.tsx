import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import type { Metadata } from "next";
import "./globals.css";
import Providers from "./Providers";

export const metadata: Metadata = {
  title: "Mineramax",
  description: "Mineramax",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* <link
          href="https://fonts.googleapis.com/css2?family=Tektur:wght@400..900&display=swap"
          rel="stylesheet"
        ></link> */}
        <link href="/favicon.svg" rel="icon" />
      </head>
      <body className={`font-chopinTrial`}>
        <Providers>
          <ReactQueryDevtools initialIsOpen={false} /> {children}
        </Providers>
      </body>
    </html>
  );
}

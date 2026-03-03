// "use client"

import "./globals.css";
import { Providers } from "./providers";

export const metadata = {
  title: "NIHSS",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="da">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}

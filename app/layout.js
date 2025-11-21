import "./globals.css";

export const metadata = {
  title: "NIHSS",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="da">
      <body>
        {children}
      </body>
    </html>
  );
}

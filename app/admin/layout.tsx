import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: "Admin | Manfred Parbatia",
  robots: { index: false, follow: false },
};

export default function AdminRootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr">
      <body>
        <div className="scroll-progress" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: "Manfred Parbatia — Full-Stack Developer",
};

export default function LegacyRootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <div className="scroll-progress" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}

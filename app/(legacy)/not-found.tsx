import Link from "next/link";
import { BrandLogo } from "@/components/brand-logo";

export default function NotFound() {
  return (
    <main className="not-found-page">
      <BrandLogo />
      <p className="eyebrow">404</p>
      <h1>This page<br />does not exist.</h1>
      <p>The link may have changed, or the project may not be published.</p>
      <Link href="/en">Back to home ↗</Link>
    </main>
  );
}

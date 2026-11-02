import Link from "next/link";
import { locale } from "next/root-params";
import { getMessages, getSiteLocale } from "@/lib/i18n";

export default async function NotFound() {
  const currentLocale = getSiteLocale((await locale()) ?? "en");
  const messages = getMessages(currentLocale);
  return (
    <main className="not-found-page">
      <p className="eyebrow">404</p>
      <h1>{messages.detail.notFoundTitle}</h1>
      <p>{messages.detail.notFoundDescription}</p>
      <Link href={`/${currentLocale}`}>← {messages.footer.home}</Link>
    </main>
  );
}

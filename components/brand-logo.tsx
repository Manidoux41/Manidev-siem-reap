import Image from "next/image";
import logo from "@/public/images/logo-manidev-brand.webp";

export function BrandLogo() {
  return (
    <Image
      className="brand-logo"
      src={logo}
      alt="Manidev"
      sizes="(max-width: 800px) 128px, 180px"
    />
  );
}

import Link from "next/link";
import Image from "next/image";
import { Instagram, Twitter, Facebook, Linkedin, Phone, Mail, Copyright } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { footer } from "@/lib/content/footer";

const socialIcons = { instagram: Instagram, x: Twitter, facebook: Facebook, linkedin: Linkedin };

export function Footer() {
  return (
    <footer className="bg-[var(--bg-canvas)] text-[var(--text-primary)] border-t border-[var(--border-hairline)]">
      <Container className="grid grid-cols-1 gap-12 py-16 sm:py-20 md:grid-cols-[1.2fr_1fr_1fr_1fr]">
        <div className="flex flex-col gap-6">
          <Link href="/" className="relative flex overflow-hidden w-[160px] h-[52px] -ml-2 transition-transform duration-300 hover:scale-[1.02]">
            <Image src="/images/villeto-logo.png" alt={footer.brand} fill className="object-contain scale-[2.2] object-center" />
          </Link>
          <p className="max-w-[320px] text-[15px] leading-relaxed opacity-70">{footer.tagline}</p>
          <div className="flex items-center gap-4">
            {footer.social.map((s) => {
              const Icon = socialIcons[s.icon];
              return (
                <Link
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="group relative flex size-9 items-center justify-center rounded-full border border-[var(--border-hairline)] transition-all duration-300 hover:border-[var(--accent)] hover:bg-[var(--accent)]/10 text-[var(--text-secondary)] hover:text-[var(--accent)] hover:shadow-[0_0_12px_rgba(var(--accent-rgb),0.5)]"
                >
                  <Icon className="size-4 relative z-10 transition-transform duration-300 group-hover:scale-110" />
                </Link>
              );
            })}
          </div>
        </div>

        {footer.columns.map((col) => (
          <div key={col.heading} className="flex flex-col gap-5">
            <span className="font-display text-[16px] font-semibold">{col.heading}</span>
            <ul className="flex flex-col gap-3.5">
              {col.links.map((l) => (
                <li key={l.label}>
                  <Link 
                    href={l.href} 
                    className="group relative text-[15px] text-[var(--text-secondary)] transition-colors duration-300 hover:text-[var(--text-primary)]"
                  >
                    {l.label}
                    <span className="absolute -bottom-0.5 left-0 h-[1.5px] w-full origin-left scale-x-0 bg-[var(--accent)] transition-transform duration-300 ease-out group-hover:scale-x-100" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div className="flex flex-col gap-5">
          <span className="font-display text-[16px] font-semibold">{footer.contact.heading}</span>
          <div className="flex flex-col gap-3.5 text-[15px] text-[var(--text-secondary)]">
            <a href={`tel:${footer.contact.phone.replace(/\s/g, "")}`} className="group relative flex items-center gap-2 w-fit transition-colors duration-300 hover:text-[var(--text-primary)]">
              <Phone className="size-4 shrink-0 transition-transform duration-300 group-hover:-rotate-12 group-hover:text-[var(--accent)]" /> 
              <span>{footer.contact.phone}</span>
              <span className="absolute -bottom-0.5 left-0 h-[1.5px] w-full origin-left scale-x-0 bg-[var(--accent)] transition-transform duration-300 ease-out group-hover:scale-x-100" />
            </a>
            <a href={`mailto:${footer.contact.email}`} className="group relative flex items-center gap-2 w-fit transition-colors duration-300 hover:text-[var(--text-primary)]">
              <Mail className="size-4 shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:text-[var(--accent)]" /> 
              <span>{footer.contact.email}</span>
              <span className="absolute -bottom-0.5 left-0 h-[1.5px] w-full origin-left scale-x-0 bg-[var(--accent)] transition-transform duration-300 ease-out group-hover:scale-x-100" />
            </a>
          </div>
        </div>
      </Container>

      <div className="border-t border-[var(--border-hairline)]">
        <Container className="flex items-center gap-2 py-5 text-[13px] opacity-60">
          <Copyright className="size-3.5" />
          <span>{footer.copyrightYear}</span>
          <span>{footer.brand}</span>
        </Container>
      </div>
    </footer>
  );
}

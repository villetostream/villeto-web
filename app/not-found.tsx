import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="flex min-h-[60vh] items-center justify-center py-24">
      <Container className="flex flex-col items-center gap-4 text-center">
        <p className="font-display text-[15px] font-semibold text-[var(--accent-text)]">404</p>
        <h1 className="text-[length:var(--fs-h2)] font-semibold text-[var(--text-primary)]">Page not found</h1>
        <p className="max-w-[48ch] text-[15px] text-[var(--text-secondary)]">
          The page you're looking for doesn't exist or has moved.
        </p>
        <Button href="/">Back home</Button>
      </Container>
    </section>
  );
}

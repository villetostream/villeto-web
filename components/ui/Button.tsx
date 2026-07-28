import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

const buttonStyles = cva(
  "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-200 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50 disabled:pointer-events-none min-h-[44px]",
  {
    variants: {
      variant: {
        primary:
          "bg-[var(--accent)] text-[var(--accent-contrast)] hover:brightness-110 active:brightness-95 shadow-[0_1px_2px_rgba(0,0,0,0.08)]",
        secondary:
          "bg-transparent text-[var(--text-primary)] border border-[var(--border-hairline)] hover:bg-[var(--bg-surface)]",
        ghost: "bg-transparent text-[var(--text-primary)] hover:bg-[var(--bg-surface)]",
      },
      size: {
        sm: "px-4 py-2 text-sm",
        md: "px-5 py-3 text-[15px]",
        lg: "px-6 py-4 text-base",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

type ButtonProps = VariantProps<typeof buttonStyles> & {
  href?: string;
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
};

export function Button({ href, variant, size, className, children, onClick, type = "button" }: ButtonProps) {
  const classes = cn(buttonStyles({ variant, size }), className);
  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }
  return (
    <button type={type} onClick={onClick} className={classes}>
      {children}
    </button>
  );
}

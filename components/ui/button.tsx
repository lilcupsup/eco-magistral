import { cva, type VariantProps } from "class-variance-authority";
import type { ButtonHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

export const buttonVariants = cva(
  "inline-flex min-h-12 cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-full px-6 text-sm font-semibold tracking-[-0.01em] transition-[transform,background-color,color,border-color] duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-forest text-white hover:bg-forest-bright",
        light: "bg-paper text-ink hover:bg-white",
        glass:
          "border border-white/35 bg-white/12 text-white shadow-[inset_0_1px_0_rgba(255,255,255,.22)] backdrop-blur-xl hover:bg-white/20",
        outline:
          "border border-ink/25 bg-transparent text-ink hover:border-accent hover:bg-forest hover:text-white",
      },
      size: {
        default: "h-12",
        large: "h-14 px-8 text-[15px]",
        icon: "size-12 p-0",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  },
);

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants>;

export function Button({ className, variant, size, ...props }: ButtonProps) {
  return (
    <button
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}

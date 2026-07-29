import Image from "next/image";

import { cn } from "@/lib/utils";

export function BrandLockup({
  className,
  compact = false,
  inverse = false,
}: {
  className?: string;
  compact?: boolean;
  inverse?: boolean;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-3 font-display font-semibold tracking-[-0.045em]",
        className,
      )}
      aria-label="ECO MAGISTRAL"
    >
      <Image
        src="/images/brand/eco-magistral-mark-v2.png"
        alt=""
        aria-hidden="true"
        width={44}
        height={44}
        className={cn("size-11 shrink-0 object-contain", inverse && "brightness-0 invert")}
      />
      <span className={cn(compact && "hidden sm:inline")}>ECO MAGISTRAL</span>
    </span>
  );
}

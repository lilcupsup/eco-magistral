import Image from "next/image";

import { cn } from "@/lib/utils";

export function BrandLockup({
  className,
  compact = false,
}: {
  className?: string;
  compact?: boolean;
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
        src="/images/brand/eco-magistral-mark.png"
        alt=""
        aria-hidden="true"
        width={32}
        height={32}
        className="size-8 object-contain"
      />
      <span className={cn(compact && "hidden sm:inline")}>ECO MAGISTRAL</span>
    </span>
  );
}

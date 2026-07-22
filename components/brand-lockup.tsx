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
      <span className="brand-mark" aria-hidden="true">
        <span />
        <span />
      </span>
      <span className={cn(compact && "hidden sm:inline")}>ECO MAGISTRAL</span>
    </span>
  );
}

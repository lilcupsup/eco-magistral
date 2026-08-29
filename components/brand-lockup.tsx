import Image from "next/image";

import { assetPath } from "@/lib/assets";
import { cn } from "@/lib/utils";

export function BrandLockup({
  className,
  compact = false,
  inverse = false,
  monochrome = false,
}: {
  className?: string;
  compact?: boolean;
  inverse?: boolean;
  monochrome?: boolean;
}) {
  const horizontal = inverse
    ? {
        src: "/images/brand/eco-magistral-reversed.png",
        width: 378,
        height: 162,
        className: "w-[13rem]",
      }
    : monochrome
      ? {
          src: "/images/brand/eco-magistral-monochrome.png",
          width: 325,
          height: 82,
          className: "w-[10rem] sm:w-[11rem]",
        }
      : {
          src: "/images/brand/eco-magistral-horizontal.png",
          width: 400,
          height: 114,
          className: "w-[10rem] sm:w-[11.5rem]",
        };

  return (
    <span
      className={cn(
        "inline-flex items-center",
        className,
      )}
      role="img"
      aria-label="ECO MAGISTRAL"
    >
      {compact && !inverse && !monochrome ? (
        <Image
          src={assetPath("/images/brand/eco-magistral-compact.png")}
          alt=""
          aria-hidden="true"
          width={138}
          height={122}
          className="h-auto w-11 shrink-0 object-contain min-[421px]:hidden"
        />
      ) : null}
      <Image
        src={assetPath(horizontal.src)}
        alt=""
        aria-hidden="true"
        width={horizontal.width}
        height={horizontal.height}
        className={cn(
          "h-auto shrink-0 object-contain",
          horizontal.className,
          compact && !inverse && !monochrome && "hidden min-[421px]:block",
        )}
      />
    </span>
  );
}

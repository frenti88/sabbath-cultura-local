import React from "react";
import Image from "next/image";

interface SabbathLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export const SabbathSymbol: React.FC<{ className?: string; size?: number }> = ({
  className = "",
  size = 28,
}) => {
  return (
    <Image
      src="/assets/sabbath-symbol.png"
      alt="Sabbath"
      width={size}
      height={Math.round(size * 1.28)}
      className={`inline-block flex-shrink-0 w-auto h-auto object-contain ${className}`}
    />
  );
};

export const SabbathLogo: React.FC<SabbathLogoProps> = ({
  className = "",
  size = "md",
}) => {
  const heights = {
    sm: "h-[22px]",
    md: "h-[30px] xl:h-[32px]",
    lg: "h-[38px] md:h-[44px]",
  };

  const pixelHeights = {
    sm: 22,
    md: 32,
    lg: 44,
  };

  return (
    <div className={`inline-flex items-center select-none ${className}`}>
      <Image
        src="/assets/sabbath-logo.png"
        alt="Sabbath"
        width={Math.round(pixelHeights[size] * 4.177)}
        height={pixelHeights[size]}
        priority
        className={`${heights[size]} w-auto object-contain`}
      />
    </div>
  );
};

export default SabbathLogo;

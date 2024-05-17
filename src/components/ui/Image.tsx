import React, { LegacyRef } from "react";
import cn from "../../libs/utils/cn";
import { ClassValue } from "clsx";

interface IImageProps {
  src: string | undefined;
  alt?: string;
  className?: ClassValue;
  onClick?: () => void;
  ref?: LegacyRef<HTMLImageElement> | undefined;
}
const Image: React.FC<IImageProps> = ({
  src,
  alt,
  className,
  onClick,
  ref,
}) => {
  return (
    <div className={cn(" ", className)} onClick={onClick}>
      <img
        ref={ref}
        src={src ?? ""}
        alt={alt ?? "Unknown"}
        className={cn("object-cover", className)}
        onClick={onClick}
      />
    </div>
  );
};

export default Image;

import React from "react";
import cn from "../../libs/utils/cn";
import { ClassValue } from "clsx";

interface IImageProps {
  src: string | undefined;
  alt?: string;
  className?: ClassValue;
  onClick?: () => void;
}
const Image: React.FC<IImageProps> = ({ src, alt, className, onClick }) => {
  return (
    <div className={cn(" ", className)} onClick={onClick}>
      <img
        src={src ?? ""}
        alt={alt ?? "Unknown"}
        className={cn("", className)}
        onClick={onClick}
      />
    </div>
  );
};

export default Image;

import React from "react";
import cn from "../../libs/utils/cn";
import { ClassValue } from "clsx";
interface ITextHighLightProps {
  className?: ClassValue;
  value: string;
  type: "success" | "warning" | "error";
}
const TextHighLight: React.FC<ITextHighLightProps> = ({
  value,
  className,
  type,
}) => {
  return (
    <p
      className={cn(
        "rounded-lg px-2 py-2",
        {
          "bg-primary-content-color": type === "success",
          "bg-yellow-700": type === "warning",
          "bg-red-700": type === "error",
        },
        className
      )}
    >
      {value}
    </p>
  );
};

export default TextHighLight;

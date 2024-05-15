/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import cn from "../../libs/utils/cn";
import { Size } from "../../libs/utils/type.d";
import { ClassValue } from "clsx";
interface IHeadingProps {
  value: string | undefined;
  className?: ClassValue;
  size?: Size;
  onClick?: (value: string | undefined) => void;
}
const Heading: React.FC<IHeadingProps> = ({
  value,
  className,
  size = Size.MD,
  onClick = (_value: string | undefined) => {},
}) => {
  return (
    <h1
      onChange={() => {
        onClick(value);
      }}
      className={cn(
        "font-bold",
        {
          "text-base": size === Size.MD,
          "text-lg": size === Size.SM,
          "text-xl": size === Size.LG,
          "text-2xl": size === Size.XL,
          "text-3xl": size === Size.XXL,
        },
        className
      )}
    >
      {value}
    </h1>
  );
};

export default Heading;

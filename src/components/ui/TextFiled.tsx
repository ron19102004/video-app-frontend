import React from "react";
import cn from "../../libs/utils/cn";
import { ClassValue } from "clsx";

interface ITextFieldProps {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type: React.HTMLInputTypeAttribute | undefined;
  placeholder?: string | undefined;
  label?: string | undefined;
  inputClassName?: ClassValue ;
  className?: ClassValue ;
  somethings?: React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >;
  error?: boolean;
  labelClassName?: ClassValue | undefined;
}
const TextFiled: React.FC<ITextFieldProps> = ({
  type,
  placeholder,
  className,
  somethings,
  value,
  onChange,
  label,
  inputClassName,
  labelClassName,
  error = false,
}) => {
  return (
    <section
      className={cn(
        "flex flex-col justify-center items-start space-y-1",
        className
      )}
    >
      {label && <label className={cn(labelClassName)}>{label}</label>}
      <input
        value={value}
        onChange={onChange}
        type={type}
        placeholder={placeholder}
        className={cn(
          "outline-none ring-1 hover:ring-2 focus:ring-2 ring-white  rounded-lg h-14 w-full bg-bg-container-color px-2 ",
          {
            "hover:ring-primary-content-color focus:ring-primary-content-color":
              error === false,
            "ring-red-700": error === true,
          },
          inputClassName
        )}
        {...somethings}
      />
    </section>
  );
};

export default TextFiled;

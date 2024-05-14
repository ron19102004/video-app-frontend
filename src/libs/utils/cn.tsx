import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

const cn = (...value: ClassValue[]) => {
  return twMerge(clsx(value));
};
export default cn;

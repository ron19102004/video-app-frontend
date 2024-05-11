import { Children } from "react";

interface IProps<T> {
  list: T[];
  render: (index: number, item: T) => JSX.Element;
}
const ForEach = <T,>({ list, render }: IProps<T>) =>
  Children.toArray(list.map((item: T, index: number) => render(index, item)));

export default ForEach;

import Item, { IItem } from "./Item";

export interface IItems {
  items: IItem[];
}

interface IItemsProps extends IItems {}

export default function Items({ items }: IItemsProps) {
  return <ul>{items?.map((item, idx) => <Item key={idx} {...item} />)}</ul>;
}

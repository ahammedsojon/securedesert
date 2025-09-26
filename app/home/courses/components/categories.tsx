"use client";

import { category as Category } from "@prisma/client";
import React from "react";
import { CategoryItem } from "./category-item";

interface Props {
  items: Category[];
}
function Categories({ items }: Props) {
  return (
    <div className="flex items-center gap-x-2 overflow-x-auto pb-2">
      {items.map((item) => (
        <CategoryItem key={item.id} label={item.name} value={item.id} />
      ))}
    </div>
  );
}

export default Categories;

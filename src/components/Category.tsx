import React from "react";
import { useRecoilState } from "recoil";
import { CategoriesState, categoryState, newCategoryState } from "../atoms";

function Category() {
  const [category, setCategory] = useRecoilState(categoryState);
  const [categories, setCategories] = useRecoilState(CategoriesState);
  const [newCategory, setNewCategory] = useRecoilState(newCategoryState);
  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value as any);
  };
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setCategories([...categories, newCategory]);
    setNewCategory("");
  };
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewCategory(event.currentTarget.value);
  };
  return (
    <>
      <select value={category} onInput={onInput}>
        {categories.map((categori, idx) => {
          return (
            <option key={idx} value={categori}>
              {categori}
            </option>
          );
        })}
      </select>
      <input
        value={newCategory}
        onChange={onChange}
        type="text"
        placeholder="새로운 카테고리 이름"
      />
      <button onClick={onClick}>새로운 카테고리</button>
    </>
  );
}

export default Category;

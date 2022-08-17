import React from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { CategoriesState, IToDo, toDoState } from "../atoms";

function ToDo({ text, category, id }: IToDo) {
  const setToDos = useSetRecoilState(toDoState);
  const Categories = useRecoilValue(CategoriesState);
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;
    if (name === "delete") {
      setToDos((oldToDos) => {
        return oldToDos.filter((toDo) => toDo.id !== id);
      });
    } else {
      setToDos((oldToDos) => {
        const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
        const newToDo = { text, id, category: name as any };
        return [
          ...oldToDos.slice(0, targetIndex),
          newToDo,
          ...oldToDos.slice(targetIndex + 1),
        ];
      });
    }
  };
  return (
    <li>
      <span>{text}</span>
      {Categories.map((categori) => {
        if (category !== categori)
          return (
            <button name={categori} onClick={onClick}>
              {categori}
            </button>
          );
      })}
      <button name="delete" onClick={onClick}>
        Delete
      </button>
    </li>
  );
}

export default ToDo;

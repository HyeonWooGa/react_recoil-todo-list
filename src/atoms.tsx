import { atom, selector } from "recoil";

interface IKey {
  setSelf: Function;
  onSet: Function;
}

const localStorageEffect =
  (key: string) =>
  ({ setSelf, onSet }: IKey) => {
    const savedValue = localStorage.getItem(key);
    if (savedValue !== null) {
      setSelf(JSON.parse(savedValue));
    }

    onSet((newValue: IToDo, _: any, isReset: any) => {
      isReset
        ? localStorage.removeItem(key)
        : localStorage.setItem(key, JSON.stringify(newValue));
    });
  };

/* export enum Categories {
  "TO_DO" = "TO_DO",
  "DOING" = "DOING",
  "DONE" = "DONE",
} */

export const CategoriesState = atom({
  key: "categories",
  default: ["TO_DO", "DOING", "DONE"],
  effects: [localStorageEffect("categories")],
});

export interface IToDo {
  text: string;
  id: number;
  category: string;
}

export const categoryState = atom({
  key: "category",
  default: "TO_DO",
});

export const toDoState = atom<IToDo[]>({
  key: "toDo",
  default: [],
  effects: [localStorageEffect("toDo")],
});

export const toDoSelector = selector({
  key: "toDoSelector",
  get: ({ get }) => {
    const toDos = get(toDoState);
    const category = get(categoryState);
    return toDos.filter((toDo) => toDo.category === category);
  },
});

export const newCategoryState = atom({
  key: "newCategory",
  default: "",
});

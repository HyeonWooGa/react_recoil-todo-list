import { useForm } from "react-hook-form";
import { atom, useRecoilState } from "recoil";

interface IForm {
  toDo: string;
}

interface IToDo {
  text: string;
  id: number;
  category: "TO_DO" | "DOING" | "DONE";
}

const toDoState = atom<IToDo[]>({
  key: "toDo",
  default: [],
});

function ToDoList() {
  const [toDos, setToDos] = useRecoilState(toDoState); // const [x, setX] = useState(); 와 거의 비슷
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    setValue,
  } = useForm<IForm>();
  const onValid = ({ toDo }: IForm) => {
    if (toDo.includes("게임")) {
      setError(
        "toDo",
        { message: "게임을 하면 안됩니다." },
        { shouldFocus: true }
      );
    }
    setToDos((oldToDos) => [
      { text: toDo, id: Date.now(), category: "TO_DO" },
      ...oldToDos,
    ]);
    setValue("toDo", "");
  };
  return (
    <div>
      <h1>To Dos</h1>
      <hr />
      <form onSubmit={handleSubmit(onValid)}>
        <input
          {...register("toDo", {
            minLength: {
              value: 10,
              message: "too short",
            },
            pattern: {
              value: /^[ㄱ-ㅎㅏ-ㅣ가-힣0-9]/,
              message: "only korean & numbers",
            },
            validate: {
              noYoutube: (value) =>
                value.includes("유튜브") ? "유튜브를 보면 안됩니다." : true,
            },
          })}
          placeholder="Write a to do"
        />
        <button>Add</button>
        <span>{errors?.toDo?.message}</span>
      </form>
      <ul>
        {toDos.map((toDo) => (
          <li key={toDo.id}>{toDo.text}</li>
        ))}
      </ul>
    </div>
  );
}

/* function ToDoList() {
  const [toDo, setToDo] = useState("");
  const [toDoError, setToDoError] = useState("");
  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = event;
    setToDoError("");
    setToDo(value);
  };
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (toDo.length < 10) {
      return setToDoError("To-Do should be longer");
    }
    console.log("submit");
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input onChange={onChange} value={toDo} placeholder="Write a to do" />
        <button>Add</button>
        {toDoError !== "" ? toDoError : null}
      </form>
    </div>
  );
} */

export default ToDoList;

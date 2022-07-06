import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { categoryState, toDoState } from "../atoms";

interface IForm {
  toDo: string;
}

function CreateToDo() {
  const setToDos = useSetRecoilState(toDoState);
  const category = useRecoilValue(categoryState);
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
      { text: toDo, id: Date.now(), category },
      ...oldToDos,
    ]);
    setValue("toDo", "");
  };
  return (
    <form onSubmit={handleSubmit(onValid)}>
      <input
        {...register("toDo", {
          minLength: {
            value: 5,
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
  );
}

export default CreateToDo;

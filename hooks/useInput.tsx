import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";

function useInput(
  initialInput: string
): [
  string,
  Dispatch<SetStateAction<string>>,
  (event: ChangeEvent<HTMLInputElement>) => void
] {
  const [input, setInput] = useState<string>(initialInput);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };
  return [input, setInput, handleChange];
}

export default useInput;

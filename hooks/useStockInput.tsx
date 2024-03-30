import { ChangeEvent, useState } from "react";
import { Inputs } from "types/formTypes";

const useStockInput = (initialInputs: Inputs) => {
  const [inputs, setInputs] = useState(initialInputs);
  const [output, setOutput] = useState({ investmentAmount: "" });

  const updateOutput = () => {
    let price = Number(inputs.price);
    let quantity = Number(inputs.quantity);

    setOutput({ investmentAmount: (price * quantity).toString() });
  };

  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setInputs((prevInputs) => ({
      ...prevInputs,
      [name]: value.replaceAll(",", ""),
    }));
  };

  return { inputs, output, handleInput, updateOutput };
};

export default useStockInput;

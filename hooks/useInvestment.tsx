import { ChangeEvent, useEffect, useState } from "react";
type InputsType = {
  price: number | "";
  quantity: number | "";
};

const useInvestment = () => {
  const [inputs, setInputs] = useState<InputsType>({
    price: "",
    quantity: "",
  });

  const [total, setInvestment] = useState<number>(0);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const formattedValue = value === "" ? "" : Number(value);
    setInputs({ ...inputs, [name]: formattedValue });
  };

  useEffect(() => {
    setInvestment(Number(inputs.price) * Number(inputs.quantity));
  }, [inputs.price, inputs.quantity]);

  return { inputs, total, handleChange };
};
export default useInvestment;

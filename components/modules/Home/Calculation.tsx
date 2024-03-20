import styled from "@emotion/styled";
import { Box } from "@mui/material";
import NumberInput from "./NumberInput";
import { GrayColors } from "styles/colors";
import { H2 } from "@/components/typographies";
import { useEffect, useState, ChangeEvent, useRef } from "react";

type InputsType = {
  averagePrice: number | "";
  quantity: number | "";
};

const Calculation = () => {
  const [inputs, setInputs] = useState<InputsType>({
    averagePrice: "",
    quantity: "",
  });

  const [investment, setInvestment] = useState<number | "">("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setInputs({ ...inputs, [name]: Number(value) === 0 ? "" : value });
  };

  useEffect(() => {
    if (inputs.averagePrice && inputs.quantity)
      setInvestment(inputs.averagePrice * inputs.quantity);
    else setInvestment("");
  }, [inputs.averagePrice, inputs.quantity]);

  return (
    <Wrapper>
      <H2>보유 주식 정보</H2>
      <Box
        component="form"
        display="flex"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <NumberInput
          name="averagePrice"
          label="보유 평단"
          value={inputs.averagePrice}
          onChange={handleChange}
        />
        <NumberInput
          name="quantity"
          label="보유 수량"
          value={inputs.quantity}
          onChange={handleChange}
        />
        <NumberInput label="기존 투자액" value={investment} aria-readonly />
      </Box>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background-color: ${GrayColors.gray100};
  padding: 5px;
  margin: 5px;
`;

export default Calculation;

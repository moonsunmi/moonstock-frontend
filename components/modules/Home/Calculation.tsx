import styled from "@emotion/styled";
import { Box } from "@mui/material";
import NumberInput from "./NumberInput";
import { GrayColors } from "styles/colors";
import { Span1 } from "@/components/typographies";
import { useEffect, useState, ChangeEvent } from "react";

type InputsType = {
  price: number | "";
  quantity: number | "";
};

const Calculation = () => {
  const [inputs, setInputs] = useState<InputsType>({
    price: "",
    quantity: "",
  });

  const [investment, setInvestment] = useState<number>(0);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const formattedValue = value === "" ? "" : Number(value);
    setInputs({ ...inputs, [name]: formattedValue });
  };

  useEffect(() => {
    setInvestment(Number(inputs.price) * Number(inputs.quantity));
  }, [inputs.price, inputs.quantity]);

  return (
    <Wrapper>
      <Span1>보유 주식 정보</Span1>
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
          id="price"
          name="price"
          label="보유 평단"
          value={inputs.price}
          onChange={handleChange}
        />
        <NumberInput
          id="quantity"
          name="quantity"
          label="보유 수량"
          value={inputs.quantity}
          onChange={handleChange}
        />
        <NumberInput
          id="investment"
          name="investment"
          label="기존 투자액"
          value={investment}
          aria-readonly
        />
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

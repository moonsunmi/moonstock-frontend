import styled from "@emotion/styled";
import { Box } from "@mui/material";
import NumberInput from "./NumberInput";
import { ColorTypes, GrayColors } from "styles/colors";
import { Span1 } from "@/components/typographies";
import useInvestment from "hooks/useInvestment";

type Props = {
  title: string;
  bgColor?: ColorTypes;
};

const Calculation = ({ title, bgColor = GrayColors.gray100 }: Props) => {
  const { inputs, total, handleChange } = useInvestment();
  return (
    <Wrapper bgColor={bgColor}>
      <Span1>{title}</Span1>
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
          label="가격"
          value={inputs.price}
          onChange={handleChange}
        />
        <NumberInput
          id="quantity"
          name="quantity"
          label="수량"
          value={inputs.quantity}
          onChange={handleChange}
        />
        <NumberInput
          id="total"
          name="total"
          label="총합"
          value={total}
          aria-readonly
        />
      </Box>
    </Wrapper>
  );
};

const Wrapper = styled.div<{ bgColor: ColorTypes }>`
  background-color: ${(props) => props.bgColor};
  padding: 5px;
  margin: 5px;
`;

export default Calculation;

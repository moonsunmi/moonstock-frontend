import styled from "@emotion/styled";
import { HTMLAttributes } from "react";

type Props = {} & HTMLAttributes<HTMLInputElement>;

const InputBox = ({ ...rest }: Props) => {
  return <StyledBox></StyledBox>;
};

const StyledBox = styled.input``;

export default InputBox;

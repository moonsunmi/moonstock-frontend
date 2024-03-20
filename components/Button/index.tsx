import { PropsWithChildren } from "react";
import styled from "@emotion/styled";
import { FontWeights } from "styles/fonts";
import { GrayColors } from "styles/colors";

type Props = {
  isSelected?: boolean;
};

const StyledButton = styled.button`
  border: none;
  outline: none;
  border-radius: 12px;
  padding: 8px 12px;

  font-weight: ${FontWeights.medium};
  font-size: 16px;
  line-height: 24px;
  letter-spacing: -0.01em;
  color: #ffffff;
  background: ${GrayColors.gray800};

  :disabled {
    color: ${GrayColors.gray400};
    background: ${GrayColors.gray300};
  }

  :not(:disabled) {
    :active,
    :hover {
      background: ${GrayColors.gray700};
    }
  }
`;

const Button = ({ isSelected, children }: PropsWithChildren<Props>) => {
  return <StyledButton>{children}</StyledButton>;
};

export default Button;

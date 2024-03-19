import styled from "@emotion/styled";
import { HTMLAttributes, ReactNode } from "react";
import { ColorTypes, GrayColors } from "styles/colors";
import { FontWeights } from "styles/fonts";

type Props = {
  children: ReactNode;
  fontWeight?: FontWeights;
  fontColor?: ColorTypes;
} & HTMLAttributes<HTMLSpanElement>;

const Span1 = ({
  children,
  fontWeight = FontWeights.regular,
  fontColor = GrayColors.gray900,
  ...rest
}: Props) => {
  return (
    <Span1Style fontWeight={fontWeight} fontColor={fontColor} {...rest}>
      {children}
    </Span1Style>
  );
};

const Span1Style = styled.span<{
  fontWeight: FontWeights;
  fontColor: ColorTypes;
}>`
  font-weight: ${(props) => props.fontWeight};
  font-size: 16px;
  line-height: 24px;
  letter-spacing: -0.01em;
  color: ${(props) => props.fontColor};
`;

export default Span1;

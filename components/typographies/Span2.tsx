import styled from "@emotion/styled";
import { HTMLAttributes, ReactNode } from "react";
import { ColorTypes, GrayColors } from "styles/colors";
import { FontWeights } from "styles/fonts";

type Props = {
  children: ReactNode;
  fontColor?: ColorTypes;
  fontWeight?: FontWeights;
} & HTMLAttributes<HTMLSpanElement>;

const Span2 = ({
  children,
  fontColor = GrayColors.gray900,
  fontWeight = FontWeights.regular,
  ...rest
}: Props) => {
  return (
    <Span2Style fontColor={fontColor} fontWeight={fontWeight} {...rest}>
      {children}
    </Span2Style>
  );
};

const Span2Style = styled.span<{
  fontColor: ColorTypes;
  fontWeight: FontWeights;
}>`
  font-weight: ${(props) => props.fontWeight};
  font-size: 14px;
  line-height: 20px;
  letter-spacing: -0.01em;
  color: ${(props) => props.fontColor};
`;

export default Span2;

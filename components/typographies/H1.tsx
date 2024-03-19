import styled from "@emotion/styled";
import { HTMLAttributes, ReactNode } from "react";
import { ColorTypes, GrayColors } from "styles/colors";
import { FontWeights } from "styles/fonts";

type Props = {
  children: ReactNode;
  fontWeight?: FontWeights;
  fontColor?: ColorTypes;
} & HTMLAttributes<HTMLHeadingElement>;

const H1 = ({
  children,
  fontWeight = FontWeights.bold,
  fontColor = GrayColors.gray900,
  ...rest
}: Props) => {
  return (
    <H1Style fontWeight={fontWeight} fontColor={fontColor} {...rest}>
      {children}
    </H1Style>
  );
};

const H1Style = styled.h1<{ fontWeight: FontWeights; fontColor: ColorTypes }>`
  font-weight: ${(props) => props.fontWeight};
  font-size: 24px;
  line-height: 32px;
  letter-spacing: -0.02em;
  color: ${(props) => props.fontColor};
`;

export default H1;

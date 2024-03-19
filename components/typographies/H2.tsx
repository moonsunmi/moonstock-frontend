import styled from "@emotion/styled";
import { HTMLAttributes, ReactNode } from "react";
import { ColorTypes, GrayColors } from "styles/colors";
import { FontWeights } from "styles/fonts";

type Props = {
  children: ReactNode;
  fontWeight?: FontWeights;
  fontColor?: ColorTypes;
} & HTMLAttributes<HTMLHeadingElement>;

const H2 = ({
  children,
  fontWeight = FontWeights.medium,
  fontColor = GrayColors.gray900,
  ...rest
}: Props) => {
  return (
    <H2Style fontColor={fontColor} fontWeight={fontWeight} {...rest}>
      {children}
    </H2Style>
  );
};

const H2Style = styled.h2<{ fontColor: ColorTypes; fontWeight: FontWeights }>`
  color: ${(props) => props.fontColor};
  font-weight: ${(props) => props.fontWeight};
  font-size: 20px;
  line-height: 28px;
  letter-spacing: -0.02em;
`;

export default H2;

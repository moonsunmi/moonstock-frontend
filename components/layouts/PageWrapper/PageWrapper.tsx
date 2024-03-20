import { PropsWithChildren } from "react";
import styled from "styled-components";
import { GrayColors } from "styles/colors";
import { Device, ViewportBoundary } from "styles/viewport";

const PageWrapper = ({ children }: PropsWithChildren) => {
  return (
    <Wrapper>
      <ChildrenWrapper>{children}</ChildrenWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background-color: ${GrayColors.gray200};
  min-height: calc(var(--vh, 1vh) * 100);
  height: 100%;
`;

const ChildrenWrapper = styled.div`
  background-color: #ffffff;
  min-height: calc(var(--vh, 1vh) * 100);
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding: 10px;

  @media screen and ${Device.desktop} {
    max-width: ${ViewportBoundary.mobile - 1}px;
    margin: 0 auto;
  }
`;

export default PageWrapper;

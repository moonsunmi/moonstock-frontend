import styled from "@emotion/styled";
import { H1, H2 } from "@/components/typographies";

const NavBar = () => {
  return (
    <Wrapper>
      <H1>MoonStock</H1> <H1>물타기 계산기</H1>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;
export default NavBar;

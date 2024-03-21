import NavBar from "@/components/layouts/Gnb/NavBar";
import PageWrapper from "@/components/layouts/PageWrapper/PageWrapper";
import Calculation from "@/components/modules/Home/Calculation";
import StockList from "@/components/modules/Home/StockList";
import styled from "@emotion/styled";
// import Button from "@/components/Button";

export default function Home() {
  return (
    <PageWrapper>
      <NavBar />
      <Calculation />
      {/* <ButtonWrapper>
        <Button>코스피</Button>
        <Button>코스닥</Button>
        <Button>나스닥</Button>
      </ButtonWrapper> */}
      <StockList />
    </PageWrapper>
  );
}

const ButtonWrapper = styled.div`
  display: flex;
  :not(:last-child) {
    margin-right: 12px;
  }
`;

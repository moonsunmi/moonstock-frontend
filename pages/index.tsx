import NavBar from "@/components/layouts/Gnb/NavBar";
import AverageDownInPrice from "@/components/modules/Home/AverageDownInPrice";
import { Box, Container } from "@mui/material";

export default function Home() {
  return (
    <>
      <Container sx={{ display: "flex", justifyContent: "center" }}>
        <NavBar />
        <Box
          minWidth="280px"
          component="main"
          height="100vh"
          paddingBottom="20px"
        >
          <AverageDownInPrice />
        </Box>
      </Container>
    </>
  );
}

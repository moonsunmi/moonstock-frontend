import NavBar from "@/components/layouts/Gnb/NavBar";
import AverageDownInPrice from "@/components/modules/Home/AverageDownInPrice";
import { Box, Container } from "@mui/material";

export default function Home() {
  return (
    <>
      <Container sx={{ display: "flex", justifyContent: "center" }}>
        <NavBar />
        <Box component="main" sx={{ height: "100vh", mt: 10, mb: 10 }}>
          <AverageDownInPrice />
        </Box>
      </Container>
    </>
  );
}

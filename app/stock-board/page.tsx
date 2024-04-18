import RegisterStocksButton from "@/components/stockBoard/RegisterStocksButton";
import { Box, Container } from "@mui/material";
import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";

const rows: GridRowsProp = [
  {
    id: 1,
    name: "한일시멘트",
    price: "10,000",
    quantity: "20",
    investmentAmount: "200,000",
  },
  {
    id: 2,
    name: "삼성전자",
    price: "20,000",
    quantity: "50",
    investmentAmount: "1,000,000",
  },
];

const columns: GridColDef[] = [
  { field: "name", headerName: "종목 이름", width: 100 },
  { field: "price", headerName: "평균 단가", width: 100, align: "right" },
  { field: "quantity", headerName: "보유 수량", width: 50, align: "right" },
  {
    field: "investmentAmount",
    headerName: "투자금액",
    width: 150,
    align: "right",
  },
];

export default function Page() {
  return (
    <Container component="main">
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        pageSizeOptions={[10]}
      />

      <Box display="flex" justifyContent="center" margin={5}>
        <RegisterStocksButton sx={{ width: { xs: "234px", sm: "50%" } }} />
      </Box>
    </Container>
  );
}

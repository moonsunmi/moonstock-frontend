"use client";
import {
  DataGrid,
  GridColDef,
  GridColumnMenu,
  GridColumnMenuProps,
  GridRowsProp,
} from "@mui/x-data-grid";

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
  {
    field: "name",
    headerName: "종목 이름",
    flex: 1,
  },
  {
    field: "price",
    headerName: "평균 단가",
    flex: 0.9,
    align: "right",
  },
  {
    field: "quantity",
    headerName: "수량",
    flex: 0.5,
    align: "right",
  },
  {
    field: "investmentAmount",
    headerName: "투자금액",
    flex: 1,
    align: "right",
  },
];

function CustomColumnMenu(props: GridColumnMenuProps) {
  return <GridColumnMenu {...props} slots={{ columnMenuColumnsItem: null }} />;
}

export default function StockList() {
  return (
    <div style={{ width: "100%" }}>
      <DataGrid
        columnHeaderHeight={45}
        rowHeight={45}
        className="myDataGrid"
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        slots={{ columnMenu: CustomColumnMenu }}
        pageSizeOptions={[10]}
      />
    </div>
  );
}

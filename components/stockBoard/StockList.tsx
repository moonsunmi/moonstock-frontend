"use client";

import { formatNumToKR } from "@/utils/formatNumber";
import {
  DataGrid,
  GridColDef,
  GridColumnMenu,
  GridColumnMenuProps,
} from "@mui/x-data-grid";

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
    valueFormatter: (value) => formatNumToKR(value),
  },
  {
    field: "quantity",
    headerName: "수량",
    flex: 0.5,
    align: "right",
    valueFormatter: (value) => formatNumToKR(value),
  },
  {
    field: "investmentAmount",
    headerName: "투자금액",
    flex: 1,
    align: "right",
    valueFormatter: (value) => formatNumToKR(value),
  },
];

function CustomColumnMenu(props: GridColumnMenuProps) {
  return <GridColumnMenu {...props} slots={{ columnMenuColumnsItem: null }} />;
}

type DataRow = {
  ticker: string;
  price: number;
  quantity: number;
  investmentAmount: number;
};

export default function StockList({
  dataRows,
}: {
  dataRows: DataRow[] | undefined;
  // session: Session | null;
}) {
  const rows = dataRows
    ? dataRows.map((dataRow, index) => ({ ...dataRow, id: index }))
    : [];

  return (
    <>
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
    </>
  );
}

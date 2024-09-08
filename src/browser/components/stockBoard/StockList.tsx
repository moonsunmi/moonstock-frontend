'use client'

import {useRouter} from 'next/navigation'
// Components
import {
  DataGrid,
  GridColDef,
  GridColumnMenu,
  GridColumnMenuProps
} from '@mui/x-data-grid'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import {Button} from '../UI'
import {formatNumber} from '@/common/utils'
// Libs

const columns: GridColDef[] = [
  {
    field: 'name',
    headerName: '종목 이름',
    flex: 1
  },
  {
    field: 'price',
    headerName: '평균 단가',
    flex: 0.9,
    align: 'right',
    valueFormatter: value => formatNumber(value)
  },
  {
    field: 'quantity',
    headerName: '수량',
    flex: 0.5,
    align: 'right',
    valueFormatter: value => formatNumber(value)
  },
  {
    field: 'investmentAmount',
    headerName: '투자금액',
    flex: 1,
    align: 'right',
    valueFormatter: value => formatNumber(value)
  }
]

function CustomColumnMenu(props: GridColumnMenuProps) {
  return <GridColumnMenu {...props} slots={{columnMenuColumnsItem: null}} />
}

type DataRow = {
  ticker: string
  price: number
  quantity: number
  investmentAmount: number
}

export default function StockList({
  dataRows
}: {
  dataRows: DataRow[] | undefined
  // session: Session | null;
}) {
  const router = useRouter()

  const rows = dataRows
    ? dataRows.map((dataRow, index) => ({...dataRow, id: index}))
    : []

  const handleClick = () => {
    router.push('/register-holding')
  }

  return (
    <>
      <div style={{width: '100%'}}>
        <DataGrid
          columnHeaderHeight={45}
          rowHeight={45}
          className="myDataGrid"
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10
              }
            }
          }}
          slots={{columnMenu: CustomColumnMenu}}
          pageSizeOptions={[10]}
        />
      </div>
      <div className="flex justify-center ">
        <Button variant="outlined" onClick={handleClick} className="w-1/2">
          <div>
            <AddCircleOutlineIcon />
            <div>보유 종목 등록하기</div>
          </div>
        </Button>
      </div>
    </>
  )
}

import DeleteDialog from './DeleteDialog'
import TradeDialog from './TradeDialog'

export const getStockList = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/stocks`)

  if (!res.ok) throw new Error('Failed to fetch stock list')
  return res.json()
}

const GlobalDialog = async () => {
  const {stockList} = await getStockList()

  return (
    <>
      <TradeDialog stockList={stockList} />
      <DeleteDialog />
    </>
  )
}

export default GlobalDialog

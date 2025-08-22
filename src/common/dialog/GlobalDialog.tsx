import DeleteDialog from '../../features/trade/dialogs/DeleteDialog'
import TradeDialog from '@/features/trade/dialogs/TradeDialog'

export const getStockList = async () => {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL

  if (!backendUrl) {
    throw new Error('NEXT_PUBLIC_BACKEND_URL is not defined')
  }

  const res = await fetch(`${backendUrl}/stocks`)

  if (!res.ok) throw new Error('Failed to fetch stock list')
  const json = await res.json()

  return json
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

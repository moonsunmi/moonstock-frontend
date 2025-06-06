import DeleteDialog from './DeleteDialog'
import TradeDialog from './TradeDialog'

export const getStockList = async () => {
  const backendUrl = process.env.BACKEND_URL
  console.log('✅ BACKEND_URL:', backendUrl)

  if (!backendUrl) {
    throw new Error('BACKEND_URL is not defined')
  }

  const res = await fetch(`${backendUrl}/stocks`)

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

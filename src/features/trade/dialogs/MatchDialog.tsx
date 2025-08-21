'use client'

import {Dialog, DialogContent, DialogAction, Button} from '@/shared/ui'
import {DialogTitle} from '@/shared/ui/Dialog'
import usePostMatchTrade from '../hooks/usePostMatchTrade'

interface MatchingDialogProps {
  open: boolean
  transactions: ITrade[]
  onClose: () => void
  onConfirm: () => void
}

const MatchDialog = ({
  open,
  transactions,
  onClose,
  onConfirm
}: MatchingDialogProps) => {
  const {trigger} = usePostMatchTrade()

  const buyTrade = transactions.find(t => t.type === 'BUY')
  const sellTrade = transactions.find(t => t.type === 'SELL')

  const handleConfirm = async () => {
    if (!buyTrade || !sellTrade) return
    await trigger({buyTradeId: buyTrade.id, sellTradeId: sellTrade.id})
    onConfirm?.()
  }

  const renderTrade = (tx: ITrade, type: 'BUY' | 'SELL') => {
    const label = type === 'BUY' ? '매수' : '매도'
    const color =
      type === 'BUY'
        ? 'bg-red-100 border-red-300'
        : 'bg-blue-100 border-blue-300'

    return (
      <div
        key={tx.id}
        className={`p-3 border rounded ${color} text-sm space-y-1`}>
        <div className="font-semibold">{label} 거래</div>
        <div>종목: {tx.stockTicker}</div>
        <div>수량: {tx.quantity}주</div>
        <div>가격: {tx.price.toLocaleString()}원</div>
        <div>날짜: {new Date(tx.tradeAt).toLocaleDateString('ko-KR')}</div>
      </div>
    )
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>거래 매칭</DialogTitle>
      <DialogContent>
        <div className="flex flex-col gap-3">
          {buyTrade && renderTrade(buyTrade, 'BUY')}
          {sellTrade && renderTrade(sellTrade, 'SELL')}
          <div className="mt-4 font-semibold text-center">
            위 두 거래를 매칭하시겠습니까?
          </div>
        </div>
      </DialogContent>
      <DialogAction>
        <Button variant="outlined" onClick={onClose}>
          취소
        </Button>
        <Button onClick={handleConfirm} disabled={!buyTrade || !sellTrade}>
          매칭
        </Button>
      </DialogAction>
    </Dialog>
  )
}

export default MatchDialog

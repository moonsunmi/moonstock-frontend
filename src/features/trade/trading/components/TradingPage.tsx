'use client'

import {useEffect, useMemo, useState} from 'react'
import {Button} from '@/components/ui'
import useTrading from '@/features/trade/trading/hooks/useTrading'
import useTradeDialog from '@/stores/useTradeDialogStore'
import MatchingDialog from '@/features/trade/dialogs/MatchDialog'
import {initTransaction} from '@/utils/initData'
import Header from './Header'
import ListContainer from './ListContainer'

const TradingPage = ({ticker}: {ticker: string}) => {
  const {tradings, stock, error} = useTrading(ticker)
  const {openDialog} = useTradeDialog()

  const [sortBy, setSortBy] = useState<'price' | 'date'>('price')
  const [matchTransactions, setMatchTransactions] = useState<ITrade[]>([])

  const [pendingType, setPendingType] = useState<TradeType>(null)

  const [mode, setMode] = useState<'edit' | 'match'>('match')
  const [openMatching, setOpenMatching] = useState<boolean>(false)

  const sortedTradings = useMemo(() => {
    const sorted = [...tradings]
    return sortBy === 'price'
      ? sorted.sort((a, b) => Number(b.price) - Number(a.price))
      : sorted.sort(
          (a, b) =>
            new Date(b.tradeAt).getTime() - new Date(a.tradeAt).getTime()
        )
  }, [tradings, sortBy])

  const handleCreate = (type: TradeType) => {
    openDialog('create', {...initTransaction, stockTicker: ticker})
  }

  const handleCloseMatching = () => {
    setMatchTransactions([])
    setOpenMatching(false)
  }

  useEffect(() => {
    if (matchTransactions?.length === 2) setOpenMatching(true)
  }, [matchTransactions])

  if (error) {
    return <div>오류가 발생했습니다. 나중에 다시 시도해 주세요.</div>
  }

  return (
    <>
      <div className="w-full p-4 space-y-4">
        <Header
          stock={stock}
          sortBy={sortBy}
          setSortBy={setSortBy}
          mode={mode}
          setMode={setMode}
        />
        <ListContainer
          mode={mode}
          sortedTradings={sortedTradings}
          setMatchTransactions={setMatchTransactions}
        />

        <div className="flex justify-center gap-4">
          <Button onClick={() => handleCreate('BUY')} color="error">
            매매 기록 추가
          </Button>
        </div>
      </div>

      <MatchingDialog
        open={openMatching}
        transactions={matchTransactions}
        onClose={handleCloseMatching}
        onConfirm={() => {
          setOpenMatching(false)
          setMatchTransactions([])
        }}
      />
    </>
  )
}

export default TradingPage

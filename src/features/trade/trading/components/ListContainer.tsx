'use client'

import useTradeDialog from '@/features/trade/store/useTradeDialogStore'
import {formatNumber, getDateFormat} from '@/utils'
import classNames from 'classnames'
import {Dispatch, SetStateAction} from 'react'

type ListContainerProps = {
  sortedTradings: ITrade[]
  mode: 'edit' | 'match'
  setMatchTransactions: Dispatch<SetStateAction<ITrade[]>>
}

const ListContainer = ({
  sortedTradings,
  mode,
  setMatchTransactions
}: ListContainerProps) => {
  const {openDialog} = useTradeDialog()

  const handleRowClick = (transaction: ITrade) => {
    if (mode === 'edit') {
      openDialog('update', transaction)
    } else {
      setMatchTransactions(prev =>
        prev.find(t => t.id === transaction.id)
          ? prev.filter(t => t.id !== transaction.id)
          : [...prev, transaction]
      )
    }
  }

  return (
    <div className="w-full text-sm border">
      <div className="grid grid-cols-3 font-semibold text-center bg-gray-300">
        <div>매수</div>
        <div>가격</div>
        <div>매도</div>
      </div>
      {sortedTradings.map(tx => {
        const isBuy = tx.type === 'BUY'
        return (
          <div
            key={tx.id}
            className="px-4 py-1 cursor-pointer"
            onClick={() => handleRowClick(tx)}>
            <div className="grid grid-cols-3 items-center min-w-[60%] md:min-w-[40%] mx-auto gap-3">
              <div
                className={classNames(
                  'px-2 py-1 text-lg font-semibold text-center rounded-lg',
                  isBuy ? 'bg-red-200 hover:bg-red-300' : ''
                )}>
                <div className="mt-1 text-xs text-center text-gray-500">
                  {isBuy ? getDateFormat(tx.tradeAt, 'yy.MM.dd') : ''}
                </div>
                {isBuy ? formatNumber(tx.quantity) : ''}
              </div>

              <div className="w-full text-right justify-self-center">
                <span className="text-lg">{formatNumber(tx.price)}</span>
              </div>

              <div
                className={classNames(
                  'px-2 py-1 text-lg font-semibold text-center rounded-lg',
                  !isBuy ? 'bg-blue-200 hover:bg-blue-300' : ''
                )}>
                <div className="mt-1 text-xs text-center text-gray-500">
                  {!isBuy ? getDateFormat(tx.tradeAt, 'yy.MM.dd') : ''}
                </div>
                {!isBuy ? formatNumber(tx.quantity) : ''}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default ListContainer

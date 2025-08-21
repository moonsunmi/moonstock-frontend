import {formatNumber, getDateFormat} from '@/utils'
import classNames from 'classnames'

const MatchedRow = ({
  row,
  onClick
}: {
  row: any
  onClick: (id: string) => void
}) => {
  return (
    <div
      onClick={() => onClick(row.id)}
      className={classNames(
        'grid grid-cols-8 items-center py-2 px-4 text-sm border-b hover:bg-gray-50', // cursor-pointer',
        row.totalProfit >= 0 ? 'text-red-600' : 'text-blue-600'
      )}>
      <div className="text-right">{getDateFormat(row.buyDate, 'yy.MM.dd')}</div>
      <div className="text-right">{formatNumber(row.buyPrice)}</div>
      <div className="text-right">
        {getDateFormat(row.sellDate, 'yy.MM.dd')}
      </div>
      <div className="text-right">{formatNumber(row.sellPrice)}</div>
      <div className="text-right">{formatNumber(row.quantity)}</div>
      <div className="text-right">{formatNumber(row.totalProfit)}원</div>
      <div className="text-right">{formatNumber(row.rateOfProfit)}%</div>
    </div>
  )
}
export default MatchedRow

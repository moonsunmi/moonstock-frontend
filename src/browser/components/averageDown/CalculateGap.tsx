import {memo} from 'react'
import {formatNumToKR} from '@/common/utils/formatNumber'
import {Box} from '@mui/material'
import {valueChangeIndicator} from '@/common/lib/constant'

type CalculateGapProps = {
  before: FieldValue
  after: FieldValue
}

const getChangeType = (gap: number) =>
  gap === 0
    ? valueChangeIndicator.even
    : gap > 0
    ? valueChangeIndicator.decrease
    : valueChangeIndicator.increase

const CalculateGap = memo(({before, after}: CalculateGapProps) => {
  const gap = Number(before) - Number(after)
  const symbolStyle = getChangeType(gap)

  const amount = gap === 0 ? '변화 없음' : `${formatNumToKR(Math.abs(gap))} `

  return (
    <Box component="span" color={symbolStyle.color} sx={{ml: 1}}>
      ({amount}
      {symbolStyle.symbol})
    </Box>
  )
})

CalculateGap.displayName = 'CalculateGap'

export default CalculateGap

'use client'

import {useRouter} from 'next/navigation'
import {Button, Card, Paragraph} from '@/components/ui'
import useGetHoldings from '@/features/trade/hooks/useHoldings'
import useTradeDialog from '@/stores/useTradeDialogStore'

const BoardPage = () => {
  const router = useRouter()

  const {openDialog} = useTradeDialog()
  const {holdings, error, isLoading} = useGetHoldings()

  return (
    <div className="flex flex-col gap-8">
      <div className="grid w-full grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {holdings.map((holding, index) => (
          <Card key={index} className="flex flex-col justify-between h-40">
            <Paragraph variant="title">{holding['name']}</Paragraph>
            <div>
              <Button
                variant="text"
                onClick={() => {
                  router.push(`/board/${holding['ticker']}/trading`)
                }}>
                진행중인 거래
              </Button>
              <Button
                variant="text"
                onClick={() => {
                  router.push(`/board/${holding['ticker']}/matched`)
                }}>
                진행완료 기록
              </Button>
            </div>
            {/* <Paragraph>{`진행중인 투자금: ${holding['totalInvestment']}`}</Paragraph>
            <Paragraph>{`수익률: `}</Paragraph> */}
          </Card>
        ))}
      </div>
      <Button
        variant="outlined"
        className="w-full"
        onClick={() => {
          openDialog('create')
        }}>
        새 종목으로 거래 시작하기
      </Button>
    </div>
  )
}

export default BoardPage

'use client'

import {useRouter} from 'next/navigation'
// Components
import {Button, Card, Paragraph} from '@/browser/components/UI'
// Hooks
import useGetHoldings from '@/common/hooks/api/useHoldings'
import useBuyDialog from '@/stores/useBuyDialogStore'

const BoardPage = () => {
  const router = useRouter()

  const {openDialog} = useBuyDialog()
  const {holdings, error, isLoading} = useGetHoldings()

  return (
    <>
      <div className="grid w-full gap-8 grid-cols-auto-fill-minmax">
        {holdings.map((holding, index) => (
          <Card key={index} className="flex flex-col justify-between h-48">
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
                  router.push(`/board/${holding['ticker']}/recording`)
                }}>
                진행완료 기록
              </Button>
            </div>
            {/* <Paragraph>{`진행중인 투자금: ${holding['totalInvestment']}`}</Paragraph>
            <Paragraph>{`수익률: `}</Paragraph> */}
          </Card>
        ))}
        <Card
          className="h-48"
          onClick={() => {
            openDialog()
          }}>
          <Paragraph>새 종목으로 거래 시작하기</Paragraph>
        </Card>
      </div>
    </>
  )
}

export default BoardPage

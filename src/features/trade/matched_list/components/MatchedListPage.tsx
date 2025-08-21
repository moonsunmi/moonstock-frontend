'use client'

import Header from '@/features/trade/matched_list/components/Header'
import MatchedList from '@/features/trade/matched_list/components/MatchedList'
import {Paragraph} from '@/components/ui'
import {useMatchedListPage} from '../hooks/useMatchedListPage'

const MatchedListClient = ({ticker}: {ticker: string}) => {
  const vm = useMatchedListPage(ticker)

  if (vm.isLoading) return <p>Loading…</p>
  if (vm.error) return <p>오류가 발생했습니다.</p>

  return (
    <div className="w-full">
      <Paragraph variant="title" className="pb-4">
        {`${vm.stock?.name} (${vm.stock?.ticker})`}
      </Paragraph>

      <Header />
      <MatchedList rows={vm.rows} onRowClick={vm.goDetail} />
    </div>
  )
}

export default MatchedListClient

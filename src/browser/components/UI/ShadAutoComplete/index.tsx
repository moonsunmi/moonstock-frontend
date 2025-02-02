'use client'

import {useState, useMemo} from 'react'
import {useUserStore} from '@/stores/useUserStore'
import useSWR from 'swr'
import {
  Command,
  CommandInput,
  CommandItem,
  CommandList,
  CommandGroup,
  CommandEmpty
} from '@/components/ui/command'
import {Popover, PopoverContent, PopoverTrigger} from '@/components/ui/popover'
import {Button} from '@/components/ui/button'
import {cn} from '@/lib/utils'

const StockAutocomplete3 = ({onSelect}: {onSelect: (stock: any) => void}) => {
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false) // Popover 열림/닫힘 상태

  const {userInfo} = useUserStore()

  const {data} = useSWR<{ok: boolean; stockList: IStock[]}>(
    ['/api/stocks', userInfo.id],
    {fallbackData: {ok: false, stockList: []}}
  )
  const {stockList} = data

  // ✅ 클라이언트에서 검색 필터링 (한글, 영어, 숫자 지원)
  const filteredStocks = useMemo(() => {
    if (!query) return stockList
    return stockList.filter(stock =>
      `${stock.ticker} ${stock.name}`
        .toLowerCase()
        .includes(query.toLowerCase())
    )
  }, [query, stockList])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="justify-start w-full">
          {query || '종목 검색'}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-2">
        <Command>
          <CommandInput
            placeholder="티커 또는 이름 입력..."
            onValueChange={val => setQuery(val)}
          />
          <CommandList>
            <CommandEmpty>검색 결과 없음</CommandEmpty>
            <CommandGroup>
              {filteredStocks.map(stock => (
                <CommandItem
                  key={stock.ticker}
                  value={stock.ticker}
                  onSelect={() => {
                    onSelect(stock)
                    setQuery(`${stock.ticker} - ${stock.name}`)
                    setOpen(false) // 선택 후 닫기
                  }}>
                  {stock.ticker} - {stock.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export default StockAutocomplete3

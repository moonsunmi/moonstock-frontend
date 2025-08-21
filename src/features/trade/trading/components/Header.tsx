'use client'

import {Paragraph} from '@/shared/ui'
import {ToggleButton, ToggleButtonGroup} from '@mui/material'

type HeaderProps = {
  stock: IStock
  sortBy: 'price' | 'date'
  setSortBy: (v: 'price' | 'date') => void
  mode: 'edit' | 'match'
  setMode: (v: 'edit' | 'match') => void
}

const Header = ({stock, sortBy, setSortBy, mode, setMode}: HeaderProps) => {
  return (
    <>
      <Paragraph variant="title">
        {stock.name} ({stock.ticker})
      </Paragraph>

      <div className="flex items-center justify-between">
        <select
          value={sortBy}
          onChange={e => setSortBy(e.target.value as 'price' | 'date')}
          className="px-2 py-1 text-sm border rounded">
          <option value="price">가격순</option>
          <option value="date">날짜순</option>
        </select>

        <ToggleButtonGroup
          value={mode}
          exclusive
          onChange={(_, val) => val && setMode(val)}
          size="small"
          color="primary">
          <ToggleButton value="match">매칭모드</ToggleButton>
          <ToggleButton value="edit">수정모드</ToggleButton>
        </ToggleButtonGroup>
      </div>
    </>
  )
}

export default Header

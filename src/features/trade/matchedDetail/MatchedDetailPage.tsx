'use client'

import {Button, Paragraph} from '@/shared/ui'
import {TableHeader, TableRow} from '@/shared/ui/Table'
import {Menu, MenuItem} from '@mui/material'
import {useMatchedDetailPage} from './useMatchedDetailPage'

const MatchedDetailPage = ({id}: {id: string}) => {
  const vm = useMatchedDetailPage(id)

  if (vm.isLoading) return <p>Loading...</p>
  if (vm.error) return <p>Error loading transaction.</p>
  if (!vm.trade) return <p>거래 정보가 없습니다.</p>

  return (
    <div className="w-full">
      <Paragraph variant="title">거래 상세</Paragraph>

      <table className="w-full mb-4">
        <TableHeader columns={vm.buyColumns} />
        <tbody>
          <TableRow row={vm.trade} columns={vm.buyColumns} />
        </tbody>
      </table>

      <div className="flex gap-2 mb-4">
        <Button
          onClick={() => {
            // openDialog('buy', transaction)
          }}>
          매수 거래 수정
        </Button>
      </div>

      <Menu
        anchorEl={vm.anchorEl}
        open={Boolean(vm.anchorEl)}
        onClose={vm.closeMenu}>
        {vm.selectedSell && (
          <>
            <MenuItem
              onClick={() => vm.openUpdateDialog('sell', vm.selectedSell)}>
              매도 수정
            </MenuItem>
            <MenuItem onClick={() => vm.openDeleteDialog(vm.selectedSell)}>
              매도 삭제
            </MenuItem>
          </>
        )}
      </Menu>
    </div>
  )
}

export default MatchedDetailPage

'use client'
import {useSWRConfig} from 'swr'
import axiosInstance from '@/lib/axios'
import useSWRMutation from 'swr/mutation'
import {initTransaction} from '@/utils/initData'
import {Button, DialogAction, DialogContent} from '@/components/ui'
import useTradeDialog from '@/stores/useTradeDialogStore'
import StockAutocomplete from '@/components/ui/StockAutocomplete'
import {Dialog, DialogTitle} from '@/components/ui/Dialog'
import DialogTransaction from '@/components/ui/Dialog/DialogTransaction'
import {useSnackbar} from 'notistack'
import {useUserStore} from '@/stores/useUserStore'
import {useEffect, useState} from 'react'
import {getTradingKey} from '@/utils/swrKeys'

interface TradeDialogProps {
  stockList: IStock[]
}

const TradeDialog = ({stockList}: TradeDialogProps) => {
  const {mutate} = useSWRConfig()
  const {enqueueSnackbar} = useSnackbar()

  const {userInfo} = useUserStore()
  const {
    isOpen,
    mode,
    data: defaultValue,
    setData,
    closeDialog
  } = useTradeDialog()

  const transaction = defaultValue ?? initTransaction
  const isCreate = mode === 'create'
  const url = isCreate
    ? `/api/trade/create`
    : `/api/trade/${transaction?.id}/update`

  const [selectedAccountId, setSelectedAccountId] = useState<
    string | undefined
  >(undefined)

  const {data, trigger, error, isMutating} = useSWRMutation(
    url,
    (url, {arg}: {arg: ITrade & {accountId: string}}) => {
      console.log(arg)
      return axiosInstance(url, {
        method: isCreate ? 'post' : 'put',
        data: arg,
        headers: {'Content-Type': 'application/json'},
        withCredentials: false
      }).then(res => res.data)
    }
  )

  const handleChangeStock = (stock: IStock | null) => {
    setData(prevState => ({
      ...prevState,
      stockTicker: stock ? stock.ticker : ''
    }))
  }
  const handleTransaction = async () => {
    try {
      const {trade: newTrade} = await trigger({
        ...transaction,
        accountId: selectedAccountId
      })
      if (!newTrade) return

      mutate(
        getTradingKey(newTrade.stockTicker, userInfo.defaultAccount?.id),
        cached => {
          if (!cached) return cached

          return {
            ...cached,
            tradings: isCreate
              ? [...cached.tradings, newTrade]
              : cached.tradings.map(item =>
                  item.id === newTrade.id ? newTrade : item
                )
          }
        },
        false
      )

      closeDialog()
    } catch (err) {
      console.error('에러 발생:', err)
      enqueueSnackbar('기록에 실패했습니다.')
    }
  }
  const handleDelete = () => {
    // todo. delete
    closeDialog()
  }

  useEffect(() => {
    if (userInfo?.defaultAccount?.id) {
      setSelectedAccountId(userInfo.defaultAccount.id)
    }
  }, [userInfo?.defaultAccount?.id])

  if (!isOpen) return null

  return (
    <Dialog open={true} onClose={closeDialog}>
      <DialogTitle>매매 기록</DialogTitle>
      <DialogContent className="flex flex-col gap-4">
        <StockAutocomplete
          defaultTicker={transaction.stockTicker}
          stockList={stockList}
          onSelect={stock => handleChangeStock(stock)}
        />
        <DialogTransaction transaction={transaction} setTransaction={setData} />
      </DialogContent>
      <DialogAction>
        <Button variant="outlined" onClick={closeDialog}>
          취소
        </Button>
        <Button onClick={handleTransaction}>
          {isCreate ? '기록' : '수정'}
        </Button>
        {!isCreate && <Button onClick={handleDelete}>삭제</Button>}
      </DialogAction>
    </Dialog>
  )
}
export default TradeDialog

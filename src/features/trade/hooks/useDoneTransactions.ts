// import {useUserStore} from '@/stores/useUserStore'
// import useSWR from 'swr'

// const useDoneTransactions = ticker => {
//   const {userInfo} = useUserStore()

//   const shouldFetch = !!ticker && !!userInfo.id

//   const {data, error, isLoading, mutate} = useSWR<{
//     stock: IStock
//     total: {profit: number; quantity: number}
//     transactions: IRecording[]
//   }>(shouldFetch ? [`/api/trade/${ticker}/closed`, userInfo.id] : null, {
//     fallbackData: {
//       stock: null,
//       total: {profit: 0, quantity: 0},
//       transactions: []
//     }
//   })

//   // const transactions = data.transactions
//   const stock = data.stock
//   // const total = data.total

//   const transformToIRecording = (rawData: any): IRecording => {
//     // `sellTransactions`가 배열이라면, 첫 번째 항목을 기준으로 처리
//     const firstSell = rawData.sellTransactions?.[0] || {}

//     return {
//       id: rawData.id,
//       quantity: rawData.quantity,
//       buyCreatedAt: new Date(rawData.createdAt),
//       sellCreatedAt: firstSell.createdAt ? new Date(firstSell.createdAt) : null,
//       buyPrice: rawData.price,
//       sellPrice: firstSell.price || 0,
//       profit: 0,
//       duration: 0,
//       rateOfProfit: 0
//     }
//   }

//   const transactions = data.transactions
//     ? data.transactions.map(transformToIRecording)
//     : []

//   return {
//     transactions,
//     stock,
//     // total,
//     error,
//     isLoading,
//     mutate
//   }
// }

// export default useDoneTransactions

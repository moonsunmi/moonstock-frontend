import {HttpStatusCode} from 'axios'
import {getServerSession} from 'next-auth'
// Libs
import {authOptions} from '@/common/lib/auth'
import {postHolding} from '@/common/lib/data'

export async function POST(request: Request, response: Response) {
  const {searchParams} = new URL(request.url)
  const session = await getServerSession(authOptions)

  const userId = session?.user?.id || ''
  const stockTicker = searchParams.get('stockTicker') || ''
  const quantity = Number(searchParams.get('quantity'))
  const price = Number(searchParams.get('price'))

  try {
    const holding = await postHolding({userId, stockTicker, quantity, price})
    console.log('보유 주식 등록이 성공했습니다.')
    return Response.json(
      {
        data: JSON.stringify(holding)
      },
      {status: HttpStatusCode.Ok}
    )
  } catch (error: any) {
    console.log(error.message)
    return Response.json(
      {
        error: error.message
      },
      {status: HttpStatusCode.BadRequest}
    )
  }
}

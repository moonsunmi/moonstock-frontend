import prisma from './db'

export async function getHoldings(userId: string) {
  try {
    const holdings = await prisma.holding.findMany({
      where: {userId: userId},
      include: {stock: true}
    })

    const results = holdings.map(holding => ({
      ticker: holding.stockTicker,
      name: holding.stock.name,
      price: holding.price,
      quantity: holding.quantity,
      investmentAmount: holding.price * holding.quantity
    }))
    return results
  } catch (error) {
    console.error('보유 주식을 가져오는 데 실패했습니다.', error)
  }
}

type postHoldingProps = {
  userId: string
  stockTicker: string
  quantity: number
  price: number
  transactAt?: Date
}

export async function postHolding({
  userId,
  stockTicker,
  quantity,
  price,
  transactAt
}: postHoldingProps) {
  async function createHolding() {
    const stock = await prisma.stock.findUnique({
      where: {ticker: stockTicker}
    })

    if (!stock) {
      console.log('존재하지 않는 주식입니다.')
      throw new Error('존재하지 않는 주식입니다.')
    }

    const existingHolding = await prisma.holding.findFirst({
      where: {userId: userId, stockTicker: stockTicker}
    })

    if (existingHolding) {
      console.log('보유 주식으로 이미 등록되어 있습니다.')
      throw new Error('보유 주식으로 이미 등록되어 있습니다.')
    }

    const newHolding = await prisma.holding.create({
      data: {
        user: {connect: {id: userId}},
        stock: {connect: {ticker: stockTicker}},
        quantity,
        price,
        transactAt
      }
    })

    return newHolding
  }
  await createHolding().catch(error => {
    throw new Error(error)
  })
}

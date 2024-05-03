import { PrismaClient, Transaction, TransactionType } from "@prisma/client";

const prisma = new PrismaClient();

export async function getHoldings(userId: string) {
  try {
    const transactions = await prisma.transaction.findMany({
      where: { userId: userId },
      include: { stock: true },
    });
    const holdings = transactions.map((transaction) => ({
      name: transaction.stock.name,
      price: transaction.price,
      quantity: transaction.quantity,
      investmentAmount: transaction.price * transaction.quantity,
    }));
    return holdings;
  } catch (error) {
    console.log(error);
  }
}

type postHoldingProps = {
  userId: string;
  stockTicker: string;
  quantity: number;
  price: number;
};

export async function postHolding({
  userId,
  stockTicker,
  quantity,
  price,
}: postHoldingProps) {
  try {
    // TODO. 추매 기록 기능 추가시, 중복 등록 허용 예정
    const isExistingHolding = await prisma.transaction.findFirst({
      where: { userId: userId, stockTicker: stockTicker },
    });

    if (isExistingHolding) {
      throw new Error("이미 보유 종목으로 등록된 주식입니다.");
    }
    ///////

    const stock = await prisma.stock.findUnique({
      where: { ticker: stockTicker },
    });

    if (!stock) {
      throw new Error("존재하지 않는 주식입니다.");
    }

    const type = "BUY";
    const newHolding = await prisma.transaction.create({
      data: { userId, stockTicker, type, quantity, price },
    });
    return newHolding;
  } catch (error) {
    return {
      errorMessage:
        error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
}

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getHoldings(userId: number) {
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

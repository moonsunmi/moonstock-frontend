/*
  Warnings:

  - The primary key for the `stocks` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `ticker` on the `stocks` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(6)`.
  - You are about to drop the `transactions` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "transactions" DROP CONSTRAINT "transactions_stock_ticker_fkey";

-- DropForeignKey
ALTER TABLE "transactions" DROP CONSTRAINT "transactions_user_id_fkey";

-- AlterTable
ALTER TABLE "stocks" DROP CONSTRAINT "stocks_pkey",
ALTER COLUMN "ticker" SET DATA TYPE VARCHAR(6),
ADD CONSTRAINT "stocks_pkey" PRIMARY KEY ("ticker");

-- DropTable
DROP TABLE "transactions";

-- DropEnum
DROP TYPE "TransactionType";

-- CreateTable
CREATE TABLE "holdings" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "stock_ticker" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,
    "transactAt" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "holdings_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "holdings" ADD CONSTRAINT "holdings_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "holdings" ADD CONSTRAINT "holdings_stock_ticker_fkey" FOREIGN KEY ("stock_ticker") REFERENCES "stocks"("ticker") ON DELETE CASCADE ON UPDATE CASCADE;

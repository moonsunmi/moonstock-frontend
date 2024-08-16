-- CreateTable
CREATE TABLE "Stock" (
    "ticker" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "market" TEXT NOT NULL,

    CONSTRAINT "Stock_pkey" PRIMARY KEY ("ticker")
);

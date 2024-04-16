import { PrismaClient } from "@prisma/client";
import { parse } from "csv-parse";
import fs from "fs";

const prisma = new PrismaClient();
const results = [];

fs.createReadStream("stock_list.csv", { encoding: "utf-8" })
  .pipe(parse({ delimiter: ",", from_line: 2, bom: true }))
  .on("data", (data) => {
    const stockData = {
      ticker: data[0],
      name: data[1],
      market: data[2],
    };
    results.push(stockData);
  })
  .on("end", async () => {
    console.log(results);

    for (const item of results) {
      await prisma.stock.upsert({
        where: {
          ticker: item.ticker,
        },
        update: {
          name: item.name,
          market: item.market,
        },
        create: {
          ticker: item.ticker,
          name: item.name,
          market: item.market,
        },
      });
    }

    console.log("Data insertion complete");
  });

import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

const instance = axios.create({
  baseURL:
    "https://apis.data.go.kr/1160100/service/GetStockSecuritiesInfoService/getStockPriceInfo",
  timeout: 10000,
  params: {
    serviceKey: process.env.STOCK_API_KEY,
    resultType: "json",
    numOfRows: 1,
  },
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let stockName = req.query.stockName;
  if (Array.isArray(stockName)) {
    stockName = stockName[0];
  } else {
    stockName = stockName || "";
  }

  if (req.method === "GET") {
    try {
      const response = await instance.get("", {
        params: { itmsNm: stockName },
      });
      return res.status(200).json(response.data.response.body);
    } catch (error) {
      return res.status(500).json({ message: "서버 응답 에러" });
    }
  } else {
    return res.status(405).json({ message: "허용되지 않는 메서드입니다." });
  }
}

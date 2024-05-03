import axios from "axios";
import { NextRequest } from "next/server";

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

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const stockName = searchParams.get("stock-name"); // not cached.

  const response = await instance.get("", {
    params: { itmsNm: stockName },
  });
  return new Response(JSON.stringify(response.data.response.body), {
    status: 200,
    headers: {
      "content-type": "application/json",
    },
  });
}

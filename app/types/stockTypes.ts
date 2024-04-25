import { FieldValue } from "./formTypes";

export type Purchase = {
  id: string;
  price: FieldValue;
  quantity: FieldValue;
};

export enum PurchaseType {
  HOLDING = "holding",
  ADDITIONS = "additions",
}

export type StockPurchaseInfo = {
  [PurchaseType.HOLDING]: Purchase;
  [PurchaseType.ADDITIONS]: Purchase[];
};

export type StockInfo = {
  numOfRows: number;
  pageNo: number;
  totalCount: number;
  items: {
    item: [
      {
        basDt: string;
        srtnCd: string;
        isinCd: string;
        itmsNm: string;
        mrktCtg: string;
        clpr: string;
        vs: string;
        fltRt: string;
        mkp: string;
        hipr: string;
        lopr: string;
        trqu: string;
        trPrc: string;
        lstgStCnt: string;
        mrktTotAmt: string;
      }
    ];
  };
};

export type Stock = {
  ticker: string;
  name: string;
  market: string;
};

export type CalculationResult = {
  totalQuantity: number;
  investmentAmount: number;
  averagePrice: number;
};

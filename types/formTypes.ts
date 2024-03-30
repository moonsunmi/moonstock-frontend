export enum InputFieldName {
  price = "price",
  quantity = "quantity",
}

export enum OutputFieldName {
  investmentAmount = "investmentAmount",
}

export type Inputs = {
  [InputFieldName.price]: string;
  [InputFieldName.quantity]: string;
};

export type Output = {
  [OutputFieldName.investmentAmount]: string;
};

export type FieldNumberValue = "" | number;

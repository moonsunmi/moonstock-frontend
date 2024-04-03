export enum InputField {
  price = "price",
  quantity = "quantity",
}

export enum OutputField {
  investmentAmount = "investmentAmount",
}

export type Inputs = {
  [InputField.price]: string;
  [InputField.quantity]: string;
};

export type Output = {
  [OutputField.investmentAmount]: string;
};

export type FieldValue = "" | number;

export enum InputFieldName {
  price = "price",
  quantity = "quantity",
}

export enum OutputFieldName {
  investmentAmount = "investmentAmount",
}

export enum FieldWidth {
  small = 100,
  medium = 115,
  big = 180,
}

export type Inputs = {
  [InputFieldName.price]: string;
  [InputFieldName.quantity]: string;
};

export type Output = {
  [OutputFieldName.investmentAmount]: string;
};

export interface InputField {
  name: InputFieldName;
  label: string;
  width: number;
}

export interface OutputField {
  name: OutputFieldName;
  label: string;
  width: number;
}

export type NumberInput = "" | number;

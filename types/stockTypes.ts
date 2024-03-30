import { FieldNumberValue } from "./formTypes";

export type Purchase = {
  id: string;
  label: string;
  price: FieldNumberValue;
  quantity: FieldNumberValue;
};

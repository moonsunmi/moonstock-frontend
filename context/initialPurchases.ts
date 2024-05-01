import { FieldValue } from "@/types/formTypes";
import { IPurchase } from "@/types/stockTypes";
import { v4 as uuidv4 } from "uuid";

export const createInitialPurchase = ({
  price = "",
  quantity = "",
}: {
  price?: FieldValue;
  quantity?: FieldValue;
} = {}): IPurchase => ({
  id: uuidv4(),
  price: price,
  quantity: quantity,
});

export const initialPurchase: IPurchase = {
  id: "holding",
  price: "",
  quantity: "",
};

import { FieldValue } from "@/app/types/formTypes";
import { Purchase } from "@/app/types/stockTypes";
import { v4 as uuidv4 } from "uuid";

export const createInitialPurchase = ({
  price = "",
  quantity = "",
}: {
  price?: FieldValue;
  quantity?: FieldValue;
} = {}): Purchase => ({
  id: uuidv4(),
  price: price,
  quantity: quantity,
});

export const initialPurchase: Purchase = {
  id: "holding",
  price: "",
  quantity: "",
};

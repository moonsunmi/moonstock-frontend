import {v4 as uuidv4} from 'uuid'

export const createInitialPurchase = ({
  price = '',
  quantity = ''
}: {
  price?: number | ''
  quantity?: number | ''
} = {}): ITransaction => ({
  id: uuidv4(),
  price,
  quantity
})

export const initialPurchase: ITransaction = {
  id: 'holding',
  price: '',
  quantity: ''
}

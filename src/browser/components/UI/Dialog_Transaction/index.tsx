// Components
import {Dialog, DialogActions, DialogContent} from '@mui/material'
import {
  Button,
  Dialog as CustomDialog,
  Input,
  Paragraph
} from '@/browser/components/UI'

const Dialog_Transaction = ({open, onClose, defaultPrice, defaultQuantity}) => {
  return (
    <Dialog open={open} onClose={() => onClose(false)}>
      <DialogContent>
        <div>
          <Input
            type="number"
            className="w-full"
            name="price"
            label="가격"
            value={defaultPrice}
            // onChange={e => handleOnChange_Holding('price', e.target.value)}
          />
          <Input
            type="number"
            className="w-1/3"
            name="quantity"
            label="수량"
            value={defaultQuantity}
            // onChange={e => handleOnChange_Holding('quantity', e.target.value)}
          />
        </div>
        <Paragraph>매수하시겠습니까?</Paragraph>
      </DialogContent>
      <DialogActions>
        <Button>매수</Button>
        <Button>취소</Button>
      </DialogActions>
    </Dialog>
  )
}

export default Dialog_Transaction

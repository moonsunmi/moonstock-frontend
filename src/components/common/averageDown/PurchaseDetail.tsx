'use client'

import {ChangeEvent, Dispatch, useCallback, useMemo, useState} from 'react'

import RemoveCircleIcon from '@mui/icons-material/RemoveCircle'
import {FormGroup, Grid} from '@mui/material'
import {ContainerBox, Input} from '../ui'

type PurchaseDetailProps = {
  purchase: ITrade
  dispatch: Dispatch<PurchaseAction>
  label: string
  isDeletable?: boolean
}

const PurchaseDetail = ({
  purchase,
  dispatch,
  label,
  isDeletable = true
}: PurchaseDetailProps) => {
  const [user, setUser] = useState({email: '', password: ''})

  const handleRemove = useCallback(() => {
    dispatch({
      type: 'remove',
      payload: {id: purchase.id, price: '', quantity: ''}
    })
  }, [dispatch, purchase.id])

  const dispatchValue = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      dispatch({
        type: 'update',
        payload: {
          ...purchase,
          [event.target.name]: Number(event.target.value.replaceAll(',', ''))
        }
      })
    },
    [dispatch, purchase]
  )

  const investmentAmount = useMemo(() => {
    if (purchase.price !== '' && purchase.quantity !== '')
      return Number(purchase.price) * Number(purchase.quantity)
  }, [purchase.price, purchase.quantity])

  return (
    <ContainerBox
      title={user ? `${user.email} 님의 ${label}` : label}
      aria-label="Purchase Detail">
      <FormGroup
        sx={{
          mt: 1.5,
          maxWidth: 'md'
        }}>
        <Grid container spacing={1} sx={{alignItems: 'center'}}>
          <Grid item xs={7} sm={4}>
            <Input
              type="number"
              name="price"
              value={purchase.price}
              placeholder="가격"
              onBlur={dispatchValue}
            />
          </Grid>
          <Grid item xs={5} sm={2}>
            <Input
              type="number"
              name="quantity"
              value={purchase.quantity}
              placeholder="수량"
              onBlur={dispatchValue}
            />
          </Grid>
          <Grid item xs={isDeletable ? 11 : 12} sm={5.5}>
            <Input
              type="number"
              name="investmentAmount"
              value={investmentAmount || ''}
              placeholder="총합"
            />
          </Grid>
          <Grid item xs={1} sm={0.5}>
            {isDeletable ? (
              <RemoveCircleIcon
                color="warning"
                aria-label="Icon To Remove Additional Purchase Field"
                onClick={handleRemove}
                fontSize="small"
              />
            ) : (
              <div style={{width: 20}}></div>
            )}
          </Grid>
        </Grid>
      </FormGroup>
    </ContainerBox>
  )
}

export default PurchaseDetail

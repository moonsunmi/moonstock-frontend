'use client'

import {FormEvent, useState} from 'react'

import {HttpStatusCode} from 'axios'
import {useRouter} from 'next/navigation'
// Components
import {Box, FormControl, FormGroup, Modal, Typography} from '@mui/material'
import {
  Button,
  ContainerBox,
  Input,
  SearchStockInput
} from '@/browser/components/UI'
import {useStockListContext} from '@/common/context/StockListContext'
import useInput from '@/common/hooks/useInput'
import {formatNumber} from '@/common/utils'
// import {Stock} from '@prisma/client'

const modalStyle = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 5
}

function RegisterHoldingPage() {
  const router = useRouter()
  const stockList = useStockListContext()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const [errorMessage, setErrorMessage] = useState('')

  const [stockName, , handleName] = useInput('')
  const [price, , handlePrice] = useInput('')
  const [quantity, , handleQuantity] = useInput('')

  async function handlePost(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsSubmitting(true)

    const stockTicker =
      stockList.find(stock => stock.name === stockName)?.ticker ?? ''
    const params = new URLSearchParams({
      price: formatNumber(price),
      quantity: formatNumber(quantity),
      stockTicker: stockTicker
    })

    try {
      const response = await fetch(
        `/api/register-holding?${params.toString()}`,
        {
          method: 'POST'
        }
      )

      console.log(response)
      if (response.status === HttpStatusCode.Ok) {
        console.log('보유 종목 등록 API에 대한 응답을 받았습니다.')
        router.push('/stock-board')
      } else {
        const errorResponse = await response.json()
        setErrorMessage(errorResponse.error)
        handleOpen()
      }
    } catch {
      console.log('보유 종목 등록 API 요청이 실패하였습니다.')
      handleOpen()
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <ContainerBox
      title="보유 종목 등록하기"
      aria-label="Register holding stocks">
      <form onSubmit={handlePost}>
        <FormGroup>
          <FormControl>
            <SearchStockInput
              name="stockName"
              value={stockName}
              onChange={handleName}
              required
            />
          </FormControl>

          <FormControl>
            <Input
              name="price"
              placeholder="가격"
              value={price}
              onChange={handlePrice}
              required
            />
          </FormControl>

          <FormControl>
            <Input
              name="quantity"
              placeholder="수량"
              value={quantity}
              onChange={handleQuantity}
              required
            />
          </FormControl>
        </FormGroup>
        <Button disabled={isSubmitting}>등록하기</Button>

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description">
          <Box sx={modalStyle}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Error
            </Typography>
            <Typography id="modal-modal-description" sx={{mt: 2}}>
              {errorMessage}
            </Typography>
          </Box>
        </Modal>
      </form>
    </ContainerBox>
  )
}

export default RegisterHoldingPage

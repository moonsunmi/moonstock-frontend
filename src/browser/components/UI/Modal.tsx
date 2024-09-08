// 'use client'
// import {useState, useEffect} from 'react'
// import {createPortal} from 'react-dom'
// import {uiAtom} from '@/common/lib/state'
// import {useAtom} from 'jotai'

// export type ModalProps = {
//   open: boolean
//   onClose: () => void
// }

// export const Modal = ({open, onClose}: ModalProps) => {
//   const [ui] = useAtom(uiAtom)
//   const [mountEl, setMountEl] = useState<HTMLElement | null>(null)

//   useEffect(() => {
//     setMountEl(document.getElementById('overlays'))
//   }, [])

//   if (!mountEl) return null

//   return createPortal(<>{ui.modal && <Modal />}</>, mountEl)
// }

// 'use client'

// import {useEffect, useState} from 'react'
// import {createPortal} from 'react-dom'
// import {useAtom} from 'jotai'
// import {Modal} from './Modal'
// import {uiAtom} from '@/common/lib/state'

// export const Overlays = () => {
//   const [ui] = useAtom(uiAtom)
//   const [mountEl, setMountEl] = useState<HTMLElement | null>(null)

//   useEffect(() => {
//     setMountEl(document.getElementById('overlays'))
//   }, [])

//   if (!mountEl) return null

//   return createPortal(<>{ui.modal && <Modal />}</>, mountEl)
//   // return {isOpen? <Modal />}
// }

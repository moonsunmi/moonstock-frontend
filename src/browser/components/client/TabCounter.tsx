'use client'

import {signOut} from 'next-auth/react'
import {useEffect} from 'react'

const TabCounter = () => {
  useEffect(() => {
    window.onbeforeprint = function (e) {
      // define increment counter part
      const tabsOpen = localStorage.getItem('tabsOpen')
      if (tabsOpen == null) {
        localStorage.setItem('tabsOpen', '1')
      } else {
        localStorage.setItem('tabsOpen', (parseInt(tabsOpen) + 1).toString())
      }
    }

    // define decrement counter part
    window.onbeforeunload = function (e) {
      const newTabCount = localStorage.getItem('tabsOpen')
      console.log(parseInt(newTabCount || '0'))
      if (newTabCount !== null) {
        localStorage.setItem('tabsOpen', (parseInt(newTabCount) - 1).toString())
        if (parseInt(newTabCount) <= 0) {
          console.log('log out')
          signOut()
        }
      }
    }
  }, [])

  return null
}

export default TabCounter

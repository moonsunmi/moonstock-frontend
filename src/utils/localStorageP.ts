'use client'

export const readItemFromStorage = (key: string): string | null => {
  if (typeof window === 'undefined') return null
  return window.localStorage.getItem(key)
}
export const writeItemFromStorage = (key: string, value: string): void => {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(key, value)
}

export const readString = readItemFromStorage
export const writeString = writeItemFromStorage

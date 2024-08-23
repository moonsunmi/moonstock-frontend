export const readItemFromStorageP = (key: string) =>
  new Promise<string | null>((resolve, reject) => {
    try {
      const item = window.localStorage.getItem(key)
      resolve(item)
    } catch (e) {
      reject(e)
    }
  })

export const writeItemFromStorageP = (key: string, value: string) =>
  new Promise<string>((resolve, reject) => {
    try {
      window.localStorage.setItem(key, value)
      resolve(value)
    } catch (e) {
      reject(e)
    }
  })

export const readStringP = readItemFromStorageP
export const writeStringP = writeItemFromStorageP

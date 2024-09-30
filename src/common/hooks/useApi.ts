// reactonly (next.js uses swr)

import {useEffect, useState} from 'react'
import axios, {AxiosRequestConfig, isAxiosError} from 'axios'

type UseApiReturn<T> = ApiState<T> & {
  execute: (config: AxiosRequestConfig) => Promise<void>
}

const useApi = <T = any>(
  initialConfig?: AxiosRequestConfig
): UseApiReturn<T> => {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [errMsg, setErrMsg] = useState<string | null>(null)

  const execute = async config => {
    setLoading(true)
    setErrMsg(null)
    try {
      const response = await axios.request<T>(config)
      setData(response.data)
    } catch (err) {
      if (isAxiosError(err)) {
        setErrMsg(err.message)
      } else {
        setErrMsg('unexpected error occurred')
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (initialConfig) {
      execute(initialConfig)
    }
  }, [initialConfig])

  return {data, errMsg, loading, execute}
}

export default useApi

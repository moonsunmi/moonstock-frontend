'use client'

import {SWRConfig} from 'swr'
import axiosInstance from '../lib/axios'

export const SWRProvider = ({children}) => {
  return (
    <SWRConfig
      value={{
        // fetcher의 key 지우면 안 됨. 다중인자로 전달하기 위해서
        fetcher: ([url, key]) => axiosInstance.get(url).then(res => res.data),
        // refreshInterval: 3000
        //   revalidateOnMount: true, // 컴포넌트가 마운트되었을 때 자동 갱신 여부
        revalidateOnFocus: false, // 창이 포커싱되었을 때 자동 갱신 여부
        //   revalidateOnReconnect: false, // 브라우저가 네트워크 연결을 다시 얻었을 때 자동 갱신 여부
        dedupingInterval: 3000 // 이 시간 범위내에 동일 키를 사용하는 요청 중복 제거(ms)
        //   loadingTimeout: 30000, // 최대 로딩 시간(ms)
        //   errorRetryCount: 3, // 에러 재시도 최대 횟수
        //   errorRetryInterval: 5000, // 에러 재시도 인터벌
      }}>
      {children}
    </SWRConfig>
  )
}

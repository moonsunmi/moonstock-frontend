'use client'
import {SWRConfig} from 'swr'
export const SWRProvider = ({children}) => {
  return (
    <SWRConfig
      value={{
        refreshInterval: 3000
        //   revalidateOnMount: true, // 컴포넌트가 마운트되었을 때 자동 갱신 여부
        //   revalidateOnFocus: false, // 창이 포커싱되었을 때 자동 갱신 여부
        //   revalidateOnReconnect: false, // 브라우저가 네트워크 연결을 다시 얻었을 때 자동 갱신 여부
        //   dedupingInterval: 3000, // 이 시간 범위내에 동일 키를 사용하는 요청 중복 제거(ms)
        //   loadingTimeout: 30000, // 최대 로딩 시간(ms)
        //   errorRetryCount: 3, // 에러 재시도 최대 횟수
        //   errorRetryInterval: 5000, // 에러 재시도 인터벌
      }}>
      {children}
    </SWRConfig>
  )
}

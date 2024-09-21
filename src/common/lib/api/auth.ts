import axios from 'axios'
import * as U from '@/common/utils'

export const signUpAPI = (name: string, email: string, password: string) => {
  const formData = new FormData()
  formData.append('name', name)
  formData.append('email', email)
  formData.append('password', password)

  const result = axios.post('http://localhost:4000/auth/sign-up', formData, {
    headers: {
      'Content-Type': undefined //(for 'multipart/form-data')
    }
  })

  return result
}

export const loginAPI = (email: string, password: string) => {
  const formData = new FormData()
  formData.append('email', email)
  formData.append('password', password)

  const result = axios.post('http://localhost:4000/auth/login', formData, {
    withCredentials: true // cookie 안에 있는 token을 위해
  })
  return result
}

// // todo. store token in a http-only cookie
// // document.cookie = `token=${data.token}; Secure; HttpOnly`;
// U.writeStringP('jwt', data['body'] ?? '').finally(() => {
//   setToken(data['body'] ?? '')
// })
// // setLoggedUser(user)
// U.writeStringP('user', JSON.stringify(formData)).finally(
//   () => callback && callback()
// )

// const login = (email: string, password: string, callback?: Callback) => {
//   const formData = new FormData()
//   formData.append('email', email)
//   formData.append('password', password)

//   axios
//     .post('http://localhost:4000/auth/login', formData, {
//       withCredentials: true // cookie 안에 있는 token을 위해
//     })
//     .then(res => {
//       const {status, data} = res

//       if (data.ok) {
//         setUserInfo(data.userInfo)
//         callback && callback()
//       } else {
//         console.error(data.errorMessage)
//       }
//     })
//     .catch(error => {
//       if (axios.isAxiosError(error)) {
//         setErrorMessage(error.message)
//       }
//     })
// }

// useEffect(() => {
//   U.readStringP('jwt')
//     .then(jwt => jwt ?? '')
//     .catch(() => {})
// })

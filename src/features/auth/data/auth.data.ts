import axiosInstance from '@/lib/axios'

// dto
export interface AccountDto {
  // todo.
}
export interface UserDto {
  // todo.
}
export interface LoginRequestDto {
  // todo.
}
export interface LoginResponseDto {
  // todo.
}

// adapter
// const toAccount = (d: AccountDto): Account => ({
//   id: d.id,
//   name: d.name ?? '',
//   isDefault: !!d.isDefault,
//   feeRate: d.feeRate ?? 0,
//   userId: d.userId ?? ''
// })
// const toUser = (u: UserDto): User => ({
//   id: u.id,
//   name: u.name,
//   email: u.email,
//   accounts: (u.accounts ?? []).map(toAccount)
// })

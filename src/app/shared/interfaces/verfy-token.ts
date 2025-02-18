export interface VerfyToken {
  message: string
  decoded: Decoded
}

export interface Decoded {
  id: string
  name: string
  role: string
  iat: number
  exp: number
}

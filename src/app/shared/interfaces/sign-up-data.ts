export interface SignUpData {
  userId: number
  id: number
  title: string
  completed: boolean
}

export interface RightSignUp {
  [x: string]: string
  name: string
  email: string
  role: string
}


export interface WrongSignUp{
  statusMsg: string
  message: string
}

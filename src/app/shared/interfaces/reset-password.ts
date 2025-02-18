export interface ResetPassword {
  email: string
}

export interface ResetCode {
  resetCode: string
}


export interface ResResetPassword {
  statusMsg: string,
  message: string
}

export interface ResResetCode {
  status: string
}

export interface NewPassword {
  email: string,
  newPassword: string
}

/**
 * {
{
    "statusMsg": "success",
    "message": "Reset code sent to your email"
}

{
    "status": "Success"
}
}

{
    "email":"ahmedmutti@gmail.com",
    "newPassword": "Ahmed@123"
}
*/

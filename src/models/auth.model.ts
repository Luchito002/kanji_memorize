export interface RegisterResponse {
  message: string,
}

export interface RegisterPayload {
  username: string,
  password: string,
  birthdate: string
}


export interface LoginPayload {
  username: string
  password: string
}

export interface LoginResponse {
  access_token: string
  token_type: string
}

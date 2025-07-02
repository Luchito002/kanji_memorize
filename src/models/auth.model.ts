export interface TokenResponse {
  access_token: string
  token_type: string
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

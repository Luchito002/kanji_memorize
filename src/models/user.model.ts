export interface User {
  id: string;
  username: string;
  birthdate: string;
  created_at: string;
}

export interface UserResponse {
  username: string;
  birthdate: string;
  created_at: string;
  rol: string;
}

export interface UserEditRequest {
  username: string;
  birthdate: string;
}

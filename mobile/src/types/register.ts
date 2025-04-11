export interface RegisterCredentials {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

export interface RegisterResponse {
  token: string;
  expiresIn: number;
}

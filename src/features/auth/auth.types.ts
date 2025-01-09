export type AuthForm = {
  username: string;
  password: string;
};

export type LoginResponse = {
  access_token: string;
  // refreshToken: string;
};
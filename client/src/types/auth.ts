export type UserAuthData = {
  id: string;
  email: string;
  username: string;
};

export type RegisterPayload = {
  email: string;
  username: string;
  password: string;
};

export type LoginPayload = {
  username: string;
  password: string;
};

export type GetMeResponse = {
  message: string;
  user: UserAuthData;
};

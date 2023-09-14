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
  user: {
    userId: string;
  };
};

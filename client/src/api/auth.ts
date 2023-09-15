import { GetMeResponse, LoginPayload, RegisterPayload } from "../types/auth.ts";
import axios from "axios";
import { privateAxios } from "../utils/axios.ts";

export const registerApi = async (data: RegisterPayload) => {
  await axios.post("/api/auth/register", data);
};

export const loginApi = async (data: LoginPayload) => {
  await axios.post("/api/auth/login", data);
};

export const getMeApi = async () => {
  const response = await axios.get<GetMeResponse>("/api/auth/me");
  return response.data.user;
};

export const logoutApi = async () => {
  await privateAxios.post("/api/auth/logout");
};

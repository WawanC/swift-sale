import { LoginPayload, RegisterPayload } from "../types/auth.ts";
import axios from "axios";

export const registerApi = async (data: RegisterPayload) => {
  await axios.post("/api/auth/register", data);
};

export const loginApi = async (data: LoginPayload) => {
  await axios.post("/api/auth/login", data);
};

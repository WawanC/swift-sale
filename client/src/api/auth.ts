import { RegisterPayload } from "../types/auth.ts";
import axios from "axios";

export const registerApi = async (data: RegisterPayload) => {
  await axios.post("/api/auth/register", data);
};

import { privateAxios } from "../utils/axios.ts";

export const createTransactionApi = async () => {
  return await privateAxios.post("/api/transactions");
};

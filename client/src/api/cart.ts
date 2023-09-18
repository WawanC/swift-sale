import { privateAxios } from "../utils/axios.ts";
import axios from "axios";
import { GetCartsResponse } from "../types/cart.ts";

export const createCartApi = async (data: {
  productId: string;
  count: number;
}) => {
  await privateAxios.post(`/api/carts/${data.productId}`, {
    count: data.count,
  });
};

export const getCartsApi = async () => {
  const response = await axios.get<GetCartsResponse>("/api/carts");
  return response.data.carts;
};

import { privateAxios } from "../utils/axios.ts";

export const createCartApi = async (data: {
  productId: string;
  count: number;
}) => {
  await privateAxios.post(`/api/carts/${data.productId}`, {
    count: data.count,
  });
};

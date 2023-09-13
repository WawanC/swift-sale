import { useState } from "react";
import { CreateProductPayload } from "../types/product.ts";
import { createProductApi } from "../api/product.ts";
import { ApiErrorResponse } from "../types/error.ts";

export const useCreateProduct = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const mutate = async (data: CreateProductPayload) => {
    try {
      setError(null);
      setIsLoading(true);

      await createProductApi(data);
    } catch (e) {
      const err = e as ApiErrorResponse;

      if (err.response?.data) setError(err.response.data.message[0]);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { mutate, isLoading, error };
};

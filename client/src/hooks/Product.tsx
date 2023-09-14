import { useEffect, useState } from "react";
import { CreateProductPayload, Product } from "../types/product.ts";
import {
  createProductApi,
  deleteProductApi,
  getProductApi,
  getProductsApi,
  updateProductApi,
} from "../api/product.ts";
import { ApiErrorResponse } from "../types/error.ts";

export const useCreateProduct = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<{ message: string; code: number } | null>(
    null,
  );
  const mutate = async (data: CreateProductPayload) => {
    try {
      setError(null);
      setIsLoading(true);

      await createProductApi(data);
    } catch (e) {
      const err = e as ApiErrorResponse;

      if (err.response?.data) {
        setError({
          message: Array.isArray(err.response.data.message)
            ? err.response.data.message[0]
            : err.response.data.message,
          code: err.response.data.statusCode,
        });
      }
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { mutate, isLoading, error };
};

export const useGetProducts = () => {
  const [data, setData] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<{
    message: string;
    code: number;
  } | null>(null);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const products = await getProductsApi();
      setData(products);
    } catch (e) {
      const err = e as ApiErrorResponse;

      if (err.response?.data) {
        setError({
          message: Array.isArray(err.response.data.message)
            ? err.response.data.message[0]
            : err.response.data.message,
          code: err.response.data.statusCode,
        });
      }
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { data, isLoading, error, fetchData };
};

export const useGetProduct = (productId: string) => {
  const [data, setData] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<{
    message: string;
    code: number;
  } | null>(null);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const product = await getProductApi(productId);
      setData(product);
    } catch (e) {
      const err = e as ApiErrorResponse;

      if (err.response?.data) {
        setError({
          message: Array.isArray(err.response.data.message)
            ? err.response.data.message[0]
            : err.response.data.message,
          code: err.response.data.statusCode,
        });
      }

      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { data, isLoading, error, fetchData };
};

export const useUpdateProduct = (productId: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<{ message: string; code: number } | null>(
    null,
  );
  const mutate = async (data: CreateProductPayload) => {
    try {
      setError(null);
      setIsLoading(true);

      await updateProductApi(productId, data);
    } catch (e) {
      const err = e as ApiErrorResponse;

      if (err.response?.data) {
        setError({
          message: Array.isArray(err.response.data.message)
            ? err.response.data.message[0]
            : err.response.data.message,
          code: err.response.data.statusCode,
        });
      }
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { mutate, isLoading, error };
};

export const useDeleteProduct = (productId: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<{
    message: string;
    code: number;
  } | null>(null);

  const mutate = async () => {
    try {
      setError(null);
      setIsLoading(true);

      await deleteProductApi(productId);
    } catch (e) {
      const err = e as ApiErrorResponse;

      if (err.response?.data) {
        setError({
          message: Array.isArray(err.response.data.message)
            ? err.response.data.message[0]
            : err.response.data.message,
          code: err.response.data.statusCode,
        });
      }
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { mutate, isLoading, error };
};

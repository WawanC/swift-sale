import { useEffect, useState } from "react";
import { CreateProductPayload, Product } from "../types/product.ts";
import {
  createProductApi,
  getProductApi,
  getProductsApi,
} from "../api/product.ts";
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

export const useGetProducts = () => {
  const [data, setData] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const products = await getProductsApi();
      setData(products);
    } catch (e) {
      const err = e as ApiErrorResponse;

      if (err.response?.data) setError(err.response.data.message[0]);
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
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const product = await getProductApi(productId);
      setData(product);
    } catch (e) {
      const err = e as ApiErrorResponse;

      if (err.response?.data) setError(err.response.data.message[0]);
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

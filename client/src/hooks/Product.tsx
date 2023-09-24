import { useEffect, useState } from "react";
import { CreateProductPayload, Product } from "../types/product.ts";
import {
  createProductApi,
  deleteProductApi,
  getProductApi,
  updateProductApi,
} from "../api/product.ts";
import { useAppDispatch, useAppSelector } from "../store/store.ts";
import { fetchProductsThunk } from "../store/products.ts";
import { checkError } from "../utils/error.ts";

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
      checkError(e, setError);
      throw e;
    } finally {
      setIsLoading(false);
    }
  };

  return { mutate, isLoading, error };
};

export const useGetProducts = (filter?: { search?: string }) => {
  const data = useAppSelector((state) => state.product.products);
  const isFetching = useAppSelector((state) => state.product.isFetching);
  const dispatch = useAppDispatch();

  const refetch = (filters?: { search?: string }) => {
    dispatch(fetchProductsThunk({ search: filters?.search }));
  };

  useEffect(() => {
    refetch({ search: filter?.search });
  }, []);

  return { data, isFetching, refetch };
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
      checkError(e, setError);
      throw e;
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
      checkError(e, setError);
      throw e;
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
  const dispatch = useAppDispatch();

  const mutate = async () => {
    try {
      setError(null);
      setIsLoading(true);

      await deleteProductApi(productId);
    } catch (e) {
      checkError(e, setError);
      throw e;
    } finally {
      dispatch(fetchProductsThunk());
      setIsLoading(false);
    }
  };

  return { mutate, isLoading, error };
};

export const useSearchProducts = () => {
  const dispatch = useAppDispatch();

  const mutate = async (searchKeyword: string) => {
    await dispatch(fetchProductsThunk({ search: searchKeyword }));
  };

  return { mutate };
};

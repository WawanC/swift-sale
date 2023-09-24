import {
  CreateProductPayload,
  DeleteProductResponse,
  GetProductResponse,
  GetProductsResponse,
  UpdateProductPayload,
} from "../types/product.ts";
import axios from "axios";
import { privateAxios } from "../utils/axios.ts";

export const createProductApi = async (data: CreateProductPayload) => {
  const formData = new FormData();

  formData.append("title", data.title.trim());
  formData.append("price", `${data.price}`);
  formData.append("description", data.description.trim());

  if (data.pictures && data.pictures.length > 0)
    for (const picture of data.pictures) {
      formData.append("pictures", picture);
    }

  await privateAxios.post("/api/products", formData);
};

export const getProductsApi = async (filter?: { search?: string }) => {
  let url = "/api/products";

  if (filter?.search) url += `?search=${filter.search}`;

  const response = await axios.get<GetProductsResponse>(url);
  return response.data.products;
};

export const getProductApi = async (productId: string) => {
  const response = await axios.get<GetProductResponse>(
    `/api/products/${productId}`,
  );
  return response.data.product;
};

export const updateProductApi = async (
  productId: string,
  data: UpdateProductPayload,
) => {
  const formData = new FormData();

  data.title && formData.append("title", data.title.trim());
  data.price && formData.append("price", `${data.price}`);
  data.description && formData.append("description", data.description.trim());

  if (data.pictures && data.pictures.length > 0)
    for (const picture of data.pictures) {
      formData.append("pictures", picture);
    }

  await privateAxios.put(`/api/products/${productId}`, formData);
};

export const deleteProductApi = async (productId: string) => {
  await privateAxios.delete<DeleteProductResponse>(
    `/api/products/${productId}`,
  );
};

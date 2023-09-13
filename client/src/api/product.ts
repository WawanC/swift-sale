import { CreateProductPayload } from "../types/product.ts";
import axios from "axios";

export const createProductApi = async (data: CreateProductPayload) => {
  const formData = new FormData();

  formData.append("title", data.title.trim());
  formData.append("price", `${data.price}`);
  formData.append("description", data.description.trim());

  if (data.pictures && data.pictures.length > 0)
    for (const picture of data.pictures) {
      formData.append("pictures", picture);
    }

  await axios.post("/api/products", formData);
};

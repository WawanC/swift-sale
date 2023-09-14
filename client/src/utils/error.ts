import { SetStateAction } from "react";
import { ApiErrorResponse } from "../types/error.ts";

export const checkError = (e: unknown, setErrorState: SetStateAction<any>) => {
  const err = e as ApiErrorResponse;

  if (err.response?.data) {
    setErrorState({
      message: Array.isArray(err.response.data.message)
        ? err.response.data.message[0]
        : err.response.data.message,
      code: err.response.data.statusCode,
    });
  }
};

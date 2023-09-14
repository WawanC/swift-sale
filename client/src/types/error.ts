import { AxiosError } from "axios";

export type ApiErrorResponse = AxiosError<{
  message: string[] | string;
  error: string;
  statusCode: number;
}>;

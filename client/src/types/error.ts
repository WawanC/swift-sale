import { AxiosError } from "axios";

export type ApiErrorResponse = AxiosError<{
  message: string[];
  error: string;
  statusCode: number;
}>;

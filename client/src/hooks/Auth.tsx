import { useState } from "react";
import { checkError } from "../utils/error.ts";
import { RegisterPayload } from "../types/auth.ts";
import { registerApi } from "../api/auth.ts";

export const useRegister = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<{ message: string; code: number } | null>(
    null,
  );

  const mutate = async (data: RegisterPayload) => {
    try {
      setError(null);
      setIsLoading(true);

      await registerApi(data);
    } catch (e) {
      checkError(e, setError);
      throw e;
    } finally {
      setIsLoading(false);
    }
  };

  return { mutate, isLoading, error };
};

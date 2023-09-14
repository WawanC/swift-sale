import { useEffect, useState } from "react";
import { checkError } from "../utils/error.ts";
import { LoginPayload, RegisterPayload } from "../types/auth.ts";
import { getMeApi, loginApi, registerApi } from "../api/auth.ts";

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

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<{ message: string; code: number } | null>(
    null,
  );

  const mutate = async (data: LoginPayload) => {
    try {
      setError(null);
      setIsLoading(true);

      await loginApi(data);
    } catch (e) {
      checkError(e, setError);
      throw e;
    } finally {
      setIsLoading(false);
    }
  };

  return { mutate, isLoading, error };
};

export const useGetMe = () => {
  const [data, setData] = useState<{
    userId: string;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<{ message: string; code: number } | null>(
    null,
  );

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const product = await getMeApi();
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

  return { data, isLoading, error };
};

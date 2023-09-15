import { useEffect, useState } from "react";
import { checkError } from "../utils/error.ts";
import { LoginPayload, RegisterPayload } from "../types/auth.ts";
import { loginApi, registerApi } from "../api/auth.ts";
import { fetchAuthThunk } from "../store/auth.ts";
import { useAppDispatch, useAppSelector } from "../store/store.ts";

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
  const data = useAppSelector((state) => state.auth.data);
  const isFetching = useAppSelector((state) => state.auth.isFetching);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAuthThunk());
  }, []);

  return { data, isFetching };
};
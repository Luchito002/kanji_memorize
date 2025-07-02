import { useCallback, useEffect, useRef, useState } from "react";
import { UseApiCall } from "../models";

type UseApiOptions<P> = {
  autoFetch?: boolean;
  params: P;
};

type Data<T> = T | null;
type CustomError = Error | null;

interface UseApiResult<T, P> {
  loading: boolean;
  data: Data<T>;
  error: CustomError;
  fetch: (param: P) => Promise<T>;
}

export const useApi = <T, P>(
  apiCall: (param: P) => UseApiCall<T>,
  options?: UseApiOptions<P>
): UseApiResult<T, P> => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<Data<T>>(null);
  const [error, setError] = useState<CustomError>(null);

  // Guardamos la referencia del controlador actual
  const controllerRef = useRef<AbortController | null>(null);

  const fetch = useCallback((param: P): Promise<T> => {
    // Cancelar la solicitud anterior si existía
    controllerRef.current?.abort();

    const { call, controller } = apiCall(param);
    controllerRef.current = controller;

    setLoading(true);

    return new Promise((resolve, reject) => {
      call
        .then((response) => {
          setData(response.data);
          setError(null);
          resolve(response.data);
        })
        .catch((err) => {
          // Si fue cancelada, no hacer nada
          if (err.name === "CanceledError" || err.name === "AbortError") {
            return;
          }
          setError(err);
          reject(err);
        })
        .finally(() => {
          setLoading(false);
        });
    });
  }, [apiCall]);

  useEffect(() => {
    if (options?.autoFetch) {
      fetch(options.params);
    }

    // Cancelar si el componente se desmonta
    return () => {
      controllerRef.current?.abort();
    };
  }, [fetch, options?.autoFetch, options?.params]);

  return { loading, data, error, fetch };
};

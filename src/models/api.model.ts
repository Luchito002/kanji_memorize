import { AxiosPromise } from "axios"

export interface UseApiCall<T> {
  call: AxiosPromise<T>,
  controller: AbortController
}



import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../axios";
import { AxiosRequestConfig } from "axios";
import { ApiPayload } from "../../types/api-payload";

export default function useDeleteApi<T, V = {}>({
  endpoint,
  key,
  withCredentials = false,
}: ApiPayload<T, V>) {
  return useMutation({
    mutationKey: [key],
    mutationFn: async (variables: V & AxiosRequestConfig) => {
      const url =
        typeof endpoint === "function" ? endpoint(variables) : endpoint;
      const config = { ...variables, withCredentials };
      delete config.params;

      console.log(config);

      const { data } = await axiosInstance.delete<T>(url, config);
      return data;
    },
  });
}

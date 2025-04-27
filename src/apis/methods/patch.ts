import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { axiosInstance } from "../axios";
import { ApiPayload } from "../../types/api-payload";
import { AxiosError, AxiosRequestConfig } from "axios";

export default function usePatchApi<T, V extends Record<string, any> = {}>({
  endpoint,
  key,
  isFormData = false,
  withCredentials,
  ...options
}: ApiPayload<T, V> &
  Omit<UseMutationOptions<T, AxiosError, V>, "mutationKey" | "mutationFn">) {
  return useMutation<T, AxiosError, V>({
    mutationKey: [key],
    mutationFn: async (payload: V) => {
      const url = typeof endpoint === "function" ? endpoint(payload) : endpoint;

      let requestData = payload;
      let config: AxiosRequestConfig = {};

      if (isFormData) {
        const formData = new FormData();

        for (const [key, value] of Object.entries(payload as object)) {
          if (value !== undefined && value !== null) {
            if (value instanceof File) {
              formData.append(key, value);
            } else if (Array.isArray(value)) {
              value.forEach((item, index) => {
                if (typeof item === "object" && item !== null) {
                  Object.entries(item).forEach(([subKey, subValue]) => {
                    formData.append(
                      `${key}[${index}][${subKey}]`,
                      String(subValue)
                    );
                  });
                } else {
                  formData.append(`${key}[${index}]`, String(item));
                }
              });
            } else if (typeof value === "object") {
              console.log(value);
              Object.entries(value).forEach(([subKey, subValue]) => {
                formData.append(`${key}[${subKey}]`, String(subValue));
              });
            } else {
              formData.append(key, String(value));
            }
          }
        }

        requestData = formData as unknown as V;
        config.headers = {
          "Content-Type": "multipart/form-data",
        };
      }

      const response = await axiosInstance.patch<T>(url, requestData, {
        ...config,
        withCredentials,
      });
      return response.data;
    },
    ...options,
  });
}

import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../axios";
import { ApiPayload } from "../../types/api-payload";

export default function useGetApi<T = {}>({
  endpoint,
  key,
  withCredentials = false,
}: ApiPayload<T>) {
  return useQuery({
    queryKey: key,
    queryFn: async () => {
      const url = endpoint as string;

      const { data } = await axiosInstance.get<T>(url, {
        withCredentials,
      });
      return data;
    },
  });
}

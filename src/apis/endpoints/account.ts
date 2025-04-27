import useDeleteApi from "../methods/delete";
import useGetApi from "../methods/get";
import { UserModel } from "../models/user";

export default function AccountEndpoint() {
  const index = useGetApi<UserModel>({
    endpoint: "/account",
    key: ["ACCOUNT"],
    withCredentials: true,
  });

  const logout = useDeleteApi({
    endpoint: "/account",
    key: ["LOGOUT"],
    withCredentials: true,
  });

  return {
    index,
    logout,
  };
}

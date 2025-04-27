import { io } from "socket.io-client";

const baseURL = `${import.meta.env.VITE_BASE_URL}`.replace("/api", "");
const socket = io(baseURL, {
  transports: ["websocket"],
});
export default socket;

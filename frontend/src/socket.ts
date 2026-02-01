import { io } from "socket.io-client";
import {baseUrl} from "./config"
export const socket = io(baseUrl, {
  transports: ["websocket"]
});

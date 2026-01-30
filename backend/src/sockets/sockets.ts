import { Server } from "socket.io";
import { Server as HttpServer } from "http";
import { IActivity } from "../models/ActivityModel";

let io: Server;

export function initSocket(server: HttpServer) {
  io = new Server(server, {
    cors: { origin: "*" }
  });

  io.on("connection", () => {
    console.log("Client connected");
  });
}

export function emitNewActivity(activity: IActivity) {
  if (io) {
    io.emit("new-activity", activity);
  }
}

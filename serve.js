import express from "express";
import { WebSocketServer } from "ws";
import { Readable } from "node:stream";

const app = new express();
const wss = new WebSocketServer({
  port: 8080,
});

wss.on("connection", (ws) => {
  console.log("conection");
  ws.on("message", async (data) => {
    console.log(data)
    const audioStream = new Readable();
    audioStream.push(Buffer.from(data));
    audioStream.push(null);
  });
});

//const wss = new WebSocket('ws://localhost:3001')

const port = 3000;
app.use(express.static("./public"));

app.get("/", (req, res) => {
  res.senfile("index.html");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

import express from "express";
import WebSocket from "ws";

const app = new express();


//const wss = new WebSocket('ws://localhost:3001')


const port = 3000;
app.use(express.static('./public'))

app.get("/", (req, res) => {
  res.senfile("index.html")
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

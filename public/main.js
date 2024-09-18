import { startContext, closeContext } from "./context.js";
const start = document.getElementById("start");
const stop = document.getElementById("stop");
let localStream;
start.addEventListener("click", () => {
  start.setAttribute("disabled", "");
  stop.removeAttribute("disabled");
  captureUserMedia();
});

stop.addEventListener("click", async () => {
  await closeContext();
  
  start.removeAttribute("disabled");
  stop.setAttribute("disabled", "");
    
  
  localStream.getTracks().forEach(function (track) {
    track.stop();
  });
  localStream= null;
});

async function captureUserMedia() {
  localStream = await navigator.mediaDevices.getUserMedia({ audio: true });
  startContext(localStream);
}

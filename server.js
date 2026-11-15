const express = require("express");
const http = require("http");
const { ExpressPeerServer } = require("peer");

const app = express();
app.disable("x-powered-by");
app.set("trust proxy", 1);

app.get("/health", (_req, res) => {
  res.status(200).json({
    ok: true,
    service: "BEAT BLOOM PeerServer",
    peerPath: "/peerjs"
  });
});

const server = http.createServer(app);
const peerServer = ExpressPeerServer(server, {
  // The browser PeerJS client uses path: "/peerjs".
  path: "/peerjs",
  // Render terminates HTTPS before forwarding traffic to this service.
  proxied: true,
  allow_discovery: false,
  alive_timeout: 60000,
  expire_timeout: 5000
});

// Mount on the same HTTP server so both HTTP signaling and WebSocket upgrades work.
app.use("/", peerServer);

peerServer.on("connection", (client) => {
  console.log("Peer connected:", client.getId());
});

peerServer.on("disconnect", (client) => {
  console.log("Peer disconnected:", client.getId());
});

const port = Number(process.env.PORT) || 10000;
server.listen(port, "0.0.0.0", () => {
  console.log(`BEAT BLOOM PeerServer listening on port ${port}`);
  console.log("PeerJS path: /peerjs");
});

server.on("error", (error) => {
  console.error("Server error:", error);
  process.exitCode = 1;
});

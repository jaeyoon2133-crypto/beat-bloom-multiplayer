const express = require("express");
const http = require("http");
const { ExpressPeerServer } = require("peer");

const app = express();
app.disable("x-powered-by");
app.set("trust proxy", 1);

// The HTML5 game is hosted on itch.io, so allow its browser origin to request
// short-lived TURN server details. The Metered API key remains on Render.
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Cache-Control", "no-store");
  if (req.method === "OPTIONS") return res.sendStatus(204);
  next();
});

app.get("/health", (_req, res) => {
  res.status(200).json({
    ok: true,
    service: "BEAT BLOOM PeerServer",
    peerPath: "/peerjs",
    turnRelayConfigured: Boolean(process.env.METERED_TURN_DOMAIN && process.env.METERED_TURN_API_KEY)
  });
});

// Optional mobile-friendly TURN relay configuration (TCP/TLS port 443).
// Set both variables in Render > Environment to enable it.
app.get("/ice-config", async (_req, res) => {
  const domain = String(process.env.METERED_TURN_DOMAIN || "").trim();
  const apiKey = String(process.env.METERED_TURN_API_KEY || "").trim();
  if (!domain || !apiKey) {
    return res.status(200).json({ ok: true, configured: false, iceServers: [] });
  }
  if (!/^[a-z0-9-]+\.metered\.live$/i.test(domain)) {
    return res.status(400).json({ ok: false, error: "Invalid METERED_TURN_DOMAIN" });
  }
  const url = new URL(`https://${domain}/api/v1/turn/credentials`);
  url.searchParams.set("apiKey", apiKey);
  url.searchParams.set("region", "asia");
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 7000);
  try {
    const upstream = await fetch(url, { signal: controller.signal, headers: { Accept: "application/json" } });
    if (!upstream.ok) {
      console.error("Metered TURN credential request failed:", upstream.status);
      return res.status(502).json({ ok: false, error: "TURN credential provider unavailable" });
    }
    const iceServers = await upstream.json();
    if (!Array.isArray(iceServers) || !iceServers.some((item) => String(item?.urls || "").startsWith("turn"))) {
      return res.status(502).json({ ok: false, error: "TURN provider returned an invalid ICE configuration" });
    }
    return res.status(200).json({ ok: true, configured: true, iceServers });
  } catch (error) {
    console.error("Metered TURN proxy error:", error?.message || error);
    return res.status(502).json({ ok: false, error: "TURN credential request failed" });
  } finally {
    clearTimeout(timeout);
  }
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

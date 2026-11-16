# BEAT BLOOM Multiplayer Server

PeerJS signaling server and Metered TURN ICE configuration endpoint for BEAT BLOOM.

## Render deployment

This repository contains `package.json` and `server.js` at its root. In Render, set:

- **Root Directory:** leave blank (repository root)
- **Build Command:** `npm install`
- **Start Command:** `npm start`

Use Node.js 20 or newer.

### Environment variables

Set these in Render → your service → Environment:

- `METERED_DOMAIN` — your Metered domain, such as `your-app-name.metered.live`
- `METERED_TURN_API_KEY` — the Metered TURN credential API key (not the account-wide Secret Key)
- `METERED_REGION` — optional; defaults to `asia`
- `PEER_ALLOW_DISCOVERY` — optional; defaults to `true` for BeatBloom's in-game room list. Set to `false` to disable room discovery.
- `PEER_DEBUG` — optional; set to `true` for PeerJS diagnostics

Do not commit Metered API keys or other secrets to GitHub.

## Room discovery

The server enables PeerJS `GET /peerjs/peers` by default. BeatBloom uses this endpoint to find connected PeerJS IDs matching `beatbloom-<5-digit-room-code>`, then asks each room host for its public room metadata. This is required for the in-game **OPEN ROOMS** list.

Enabling discovery makes currently connected PeerJS IDs enumerable to clients that can reach this endpoint. BeatBloom only displays room metadata returned by the room host. Disable it with `PEER_ALLOW_DISCOVERY=false` if you no longer want public room browsing.

## Endpoints

- `GET /health` — service status, room discovery status, TURN environment status
- `GET /ice-config` — Metered TURN ICE servers
- `GET /peerjs` — PeerJS signaling service
- `GET /peerjs/peers` — connected peer ID list (when discovery is enabled)

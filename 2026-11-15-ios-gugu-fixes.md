# BEAT BLOOM — 2026-11-15 iPhone / Gugu update

- Replaced the in-game Gugu portrait with a transparent cutout made from the supplied Gugu artwork.
- Fixed the Gugu character path so Gugu is a high-risk/high-return passive, not an ICE/RAGE opponent attack.
- Practice bots selected as Gugu now show their Golden Rhythm feedback instead of applying the ICE attack to the player.
- Added a Render `/health` wake-up check before PeerJS setup (up to 70 seconds).
- Increased PeerServer signaling wait to 90 seconds and WebRTC negotiation wait to 75 seconds.
- Added two retries for transient PeerJS signaling `network` / `server-error` during room join and room creation.
- Added optional Metered TURN credential proxy endpoint to the Render server. This requires `METERED_TURN_DOMAIN` and `METERED_TURN_API_KEY` in Render Environment; no credentials are committed to GitHub.

## Important

Actual iPhone-to-PC WebRTC connectivity has not been verified on the user's live Render service. Configure Metered TURN in Render and test from iPhone Safari. The client falls back to PeerJS default ICE servers if Metered credentials are not configured.

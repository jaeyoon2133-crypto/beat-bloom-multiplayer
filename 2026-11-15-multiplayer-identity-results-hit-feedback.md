# BEAT BLOOM update — player identity, multiplayer results and hit feedback

- Lobby player slots now display the user's entered nickname, with the selected character and ready state as secondary metadata.
- Multiplayer result UI now builds a ranked card for each actual participant (2–4), not a fixed one-opponent duel. Final guest scores are relayed to the host and refreshed for the room.
- A short snare-like sound is synthesized with local Web Audio on every touch/keyboard lane press. It is local-only and not synchronized over the network or used as the music clock.
- Added independent HIT sound volume control; the general SOUND toggle still controls all audio.
- D/F/J/K lane keys (1–4 aliases retained) have desktop key hints and tactile visual press feedback matching touch presses.
- Gugu remains passive-only; AI Gugu never causes ICE/RAGE debuffs and unknown skill identifiers are ignored.
- Existing iPhone PeerJS + optional Metered TURN support and transparent Gugu cutout are retained.

Testing performed for this package: script syntax checks, file/asset path checks and ZIP structure checks. Real iPhone-to-PC WebRTC behavior still requires a live-device test; for restrictive mobile networks configure Metered TURN credentials in Render as documented in README.md.

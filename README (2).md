# BEAT BLOOM Peer Server

이 폴더를 Render Web Service의 Root Directory로 지정합니다.

- Runtime: Node
- Build Command: `npm install`
- Start Command: `npm start`
- Health Check Path: `/health`

서버는 Render가 제공하는 `PORT` 환경변수와 `0.0.0.0`에 바인딩합니다.
PeerJS 경로는 `/peerjs`입니다.

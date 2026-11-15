# BEAT BLOOM — GitHub 멀티플레이 프로젝트

이 저장소는 최신 **제갱 · 프란 · 구구** 캐릭터 버전을 바탕으로, 게임과 전용 PeerJS 신호 서버를 함께 보관합니다.

## 폴더 구성

- `index.html` — itch.io에서 실행할 게임
- `assets/` — 게임 이미지, 음악, 효과음
- `peer-server-config.js` — Render에서 발급받은 서버 주소를 입력하는 설정 파일
- `server/` — Render에서 실행할 PeerJS 서버 (`server.js`, `package.json`)

## 1. GitHub에 올리기

1. GitHub에서 새 Public 저장소를 만듭니다. 예: `beat-bloom-multiplayer`
2. 이 ZIP을 PC에서 압축 해제합니다.
3. 압축 해제한 폴더 안의 **파일과 폴더 전체**를 GitHub 저장소에 업로드합니다. ZIP 파일 자체를 GitHub에 올리는 것이 아닙니다.
4. 저장소 첫 화면에 `index.html`, `assets`, `peer-server-config.js`, `server`, `README.md`가 보이면 맞습니다.

## 2. Render에서 멀티 서버 배포하기

1. https://render.com/ 에 로그인하고 GitHub 계정을 연결합니다.
2. Dashboard에서 **New + → Web Service**를 선택합니다.
3. 방금 만든 `beat-bloom-multiplayer` 저장소를 연결합니다.
4. 아래처럼 설정합니다.

| 항목 | 값 |
|---|---|
| Name | `beat-bloom-peer-server` (사용 가능한 다른 이름도 가능) |
| Language / Runtime | `Node` |
| Root Directory | `server` |
| Build Command | `npm install` |
| Start Command | `npm start` |
| Health Check Path | `/health` |
| Instance Type | 테스트는 Free로 시작 가능 |

5. **Create Web Service**를 누르고 Deploy가 성공할 때까지 확인합니다.
6. Render가 발급한 주소를 확인합니다. 예: `https://beat-bloom-peer-server.onrender.com`
7. 주소의 `https://`와 뒤의 `/`를 뺀 호스트만 복사합니다. 예: `beat-bloom-peer-server.onrender.com`

## 3. 게임을 서버 주소에 연결하기

GitHub 저장소의 `peer-server-config.js` 파일을 열고 Edit 버튼을 누릅니다. 아래 줄의 값만 Render 호스트로 바꿉니다.

```js
host: 'YOUR-RENDER-SERVICE.onrender.com',
```

예를 들어 Render 주소가 `https://beat-bloom-peer-server.onrender.com`이면 다음처럼 적습니다.

```js
host: 'beat-bloom-peer-server.onrender.com',
```

`https://`, 포트 번호, 마지막 `/`는 입력하지 않습니다. 저장(Commit changes)합니다.

## 4. itch.io에 게임 올리기

itch.io에 올릴 ZIP은 저장소 전체가 아니라 게임 파일만 포함해야 합니다. 즉 ZIP을 열었을 때 최상위에 아래 항목이 있어야 합니다.

- `index.html`
- `peer-server-config.js`
- `assets/`

`server/` 폴더를 itch.io 게임 ZIP 안에 넣지 않습니다. Render 서버는 별도로 실행됩니다. Render 주소를 `peer-server-config.js`에 넣은 뒤, `index.html`, `peer-server-config.js`, `assets/`를 ZIP으로 묶어 itch.io의 HTML 게임으로 업로드합니다.

## 멀티 연결 구조와 참고사항

- 방장과 참가자 모두 동일한 Render PeerServer에 접속합니다.
- 방 코드는 기존 게임 로직대로 5자리 숫자이며, 호스트 ID는 `beatbloom-방코드` 형식입니다.
- PeerServer는 연결을 성립시키는 **시그널링 서버**입니다. 실제 플레이 데이터는 PeerJS/WebRTC 연결을 통해 플레이어 브라우저끼리 전달됩니다.
- 일부 공유기/NAT 환경에서는 STUN만으로 직접 연결이 되지 않을 수 있어 TURN 서버가 추가로 필요할 수 있습니다.
- Render Free 서비스는 유휴 시간 이후 잠들 수 있어, 첫 접속 때 서버가 깨어나는 시간이 발생할 수 있습니다.

## 문제 해결

- Render 배포가 실패하면 Render의 Logs를 확인합니다.
- 브라우저에서 `https://발급주소/health`를 열어 `ok: true`가 표시되는지 확인합니다.
- 주소가 정상이어도 게임에서 연결이 안 되면 `peer-server-config.js`의 host, Render 로그, 브라우저 콘솔을 확인합니다.

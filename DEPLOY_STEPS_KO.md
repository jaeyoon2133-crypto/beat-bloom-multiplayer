# BeatBloom 방 목록 활성화 배포 순서

1. 이 ZIP의 파일을 GitHub 멀티플레이 서버 저장소 루트에 업로드하거나 기존 파일을 교체합니다.
2. Render 서비스의 Root Directory가 `server`로 지정되어 있다면 비웁니다. 이 소스 ZIP에서는 `package.json`과 `server.js`가 저장소 최상위에 있습니다.
3. Build Command는 `npm install`, Start Command는 `npm start`로 둡니다.
4. Render 환경 변수에서 `PEER_ALLOW_DISCOVERY=true`를 추가합니다. 코드 기본값도 `true`지만, 설정을 명시하면 확인하기 쉽습니다.
5. 저장 후 Render가 재배포될 때까지 기다립니다.
6. 배포 후 `https://<Render-서비스-주소>/health`를 열어 JSON의 `roomDiscoveryEnabled`가 `true`인지 확인합니다.
7. 게임에서 멀티플레이 방을 하나 만든 다음, 다른 브라우저/기기에서 방 목록 새로고침을 눌러 목록이 나타나는지 테스트합니다.

`METERED_DOMAIN`과 `METERED_TURN_API_KEY` 기존 값은 그대로 유지하세요. 이 작업에서 새 TURN 키를 만들거나 GitHub에 커밋할 필요는 없습니다.

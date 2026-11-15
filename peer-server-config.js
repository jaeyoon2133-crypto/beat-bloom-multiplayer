// BEAT BLOOM 멀티 서버 설정
// Render 배포가 끝나면 host 값만 발급받은 주소로 바꿔 주세요.
// 예: host: 'beat-bloom-peer-server.onrender.com'
// https:// 와 마지막 / 는 넣지 않습니다.
window.BEAT_BLOOM_PEER_SERVER_CONFIG = Object.freeze({
  host: 'YOUR-RENDER-SERVICE.onrender.com',
  port: 443,
  path: '/peerjs',
  secure: true
});

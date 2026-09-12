// PreCompact: 압축(compaction)으로 세부 내용이 사라지기 전에 원본 transcript(.jsonl)를 백업한다.
// 주의: 이 시점에는 아직 "압축 요약"이 생성되지 않았다 (요약은 PostCompact에서 확보).
const { readStdinJson, historyDir, timestamp, fs, path } = require("./_lib");

try {
  const input = readStdinJson();
  const src = input.transcript_path;
  if (src && fs.existsSync(src)) {
    const rawDir = path.join(historyDir(input), "raw");
    fs.mkdirSync(rawDir, { recursive: true });
    const sessionId = input.session_id || "unknown-session";
    const dest = path.join(rawDir, `${timestamp()}_${sessionId}.jsonl`);
    fs.copyFileSync(src, dest);
  }
} catch (e) {
  // 백업 실패가 작업 흐름을 막아서는 안 됨
}

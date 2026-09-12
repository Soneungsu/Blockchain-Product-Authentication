// SessionEnd: 세션 종료 시점의 체크포인트를 backup/ 에 남긴다.
// compact-summaries.md의 마지막 항목(있다면)과 transcript 경로를 함께 기록해
// 다음 세션(SessionStart)이 참고할 수 있는 앵커를 만든다.
const { readStdinJson, historyDir, timestamp, fs, path } = require("./_lib");

function lastSummaryEntry(logPath) {
  if (!fs.existsSync(logPath)) return null;
  const content = fs.readFileSync(logPath, "utf8");
  const entries = content.split(/\n---\n/).filter((e) => e.trim());
  return entries.length ? entries[entries.length - 1].trim() : null;
}

try {
  const input = readStdinJson();
  const dir = historyDir(input);
  const backupDir = path.join(dir, "backup");
  fs.mkdirSync(backupDir, { recursive: true });

  const last = lastSummaryEntry(path.join(dir, "compact-summaries.md"));
  const sessionId = input.session_id || "unknown-session";
  const lines = [
    `# Session Checkpoint`,
    ``,
    `- 종료 시각: ${new Date().toISOString()}`,
    `- session_id: ${sessionId}`,
    `- 종료 사유(reason): ${input.reason || "unknown"}`,
    `- transcript 경로: ${input.transcript_path || "N/A"}`,
    ``,
    `## 마지막 압축 요약`,
    ``,
    last || "_이번 세션에서는 compact 요약이 기록되지 않았습니다. /handoff 로 수동 인계 문서 작성을 권장합니다._",
  ];

  const dest = path.join(backupDir, `${timestamp()}_${sessionId}.md`);
  fs.writeFileSync(dest, lines.join("\n") + "\n", "utf8");
} catch (e) {
  // 저장 실패가 세션 종료를 막아서는 안 됨
}

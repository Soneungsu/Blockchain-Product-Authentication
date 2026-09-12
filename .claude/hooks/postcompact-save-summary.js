// PostCompact: 압축 직후 생성된 요약을 세션 히스토리 로그에 누적 저장한다.
// 주의: 요약 필드의 정확한 키 이름은 Claude Code 버전마다 다를 수 있어 후보 키를 순서대로 탐색한다.
// 매번 원본 payload를 _debug/postcompact-last-payload.json 에 덮어써서, 실제 필드명을 확인/보정할 수 있게 한다.
const { readStdinJson, historyDir, timestamp, fs, path } = require("./_lib");

try {
  const input = readStdinJson();
  const dir = historyDir(input);

  const debugDir = path.join(dir, "_debug");
  fs.mkdirSync(debugDir, { recursive: true });
  fs.writeFileSync(
    path.join(debugDir, "postcompact-last-payload.json"),
    JSON.stringify(input, null, 2),
    "utf8"
  );

  const candidateKeys = ["summary", "compact_summary", "compactSummary", "message", "content", "text"];
  let summaryText = null;
  for (const key of candidateKeys) {
    if (typeof input[key] === "string" && input[key].trim()) {
      summaryText = input[key];
      break;
    }
  }

  const logPath = path.join(dir, "compact-summaries.md");
  const header = `\n---\n## ${timestamp()} (session: ${input.session_id || "unknown"}, trigger: ${input.trigger || "unknown"})\n\n`;
  const body = summaryText
    ? summaryText
    : `> [경고] 요약 필드를 찾지 못했습니다. _debug/postcompact-last-payload.json 에서 실제 payload 구조를 확인 후 candidateKeys를 보정하세요.`;

  fs.appendFileSync(logPath, header + body + "\n", "utf8");
} catch (e) {
  // 저장 실패가 작업 흐름을 막아서는 안 됨
}

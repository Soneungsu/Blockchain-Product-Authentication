// Status line: 터미널 하단에 컨텍스트 사용량을 퍼센트로 상시 표시 (비용 정보 없음)
// 원리: 세션 transcript(.jsonl)의 가장 최근 assistant 메시지 usage 필드에서
//   input_tokens + cache_creation_input_tokens + cache_read_input_tokens
// 를 합산 = 현재 컨텍스트에 실려있는 실제 토큰 수 (API 응답 실측치, 추정치 아님).
const fs = require("fs");
const path = require("path");

// 모델별 컨텍스트 윈도우 크기. 확실하지 않은 모델은 200k로 보수적 기본값 처리.
const CONTEXT_WINDOWS = {
  "claude-sonnet-5": 1000000,
  "claude-opus-5": 1000000,
  "claude-fable-5-1": 1000000,
};
const DEFAULT_WINDOW = 200000;

function readStdinJson() {
  try {
    const raw = fs.readFileSync(0, "utf8");
    return raw && raw.trim() ? JSON.parse(raw) : {};
  } catch (e) {
    return {};
  }
}

function findLatestUsage(transcriptPath) {
  if (!transcriptPath || !fs.existsSync(transcriptPath)) return null;
  const content = fs.readFileSync(transcriptPath, "utf8");
  const lines = content.split("\n");
  for (let i = lines.length - 1; i >= 0; i--) {
    const line = lines[i].trim();
    if (!line) continue;
    try {
      const obj = JSON.parse(line);
      const usage = obj.message && obj.message.usage;
      if (usage) return usage;
    } catch (e) {
      // 한 줄 파싱 실패는 무시하고 이전 줄 계속 탐색
    }
  }
  return null;
}

function fmtK(n) {
  return (n / 1000).toFixed(0) + "k";
}

try {
  const input = readStdinJson();

  // 디버그: 실제 payload를 남겨 필드명 불일치 시 조정할 수 있게 함
  try {
    const debugDir = path.join(process.cwd(), ".claude", "session-history", "_debug");
    fs.mkdirSync(debugDir, { recursive: true });
    fs.writeFileSync(path.join(debugDir, "statusline-last-payload.json"), JSON.stringify(input, null, 2), "utf8");
  } catch (e) {}

  const modelId = (input.model && (input.model.id || input.model.display_name)) || "claude";
  const modelLabel = (input.model && input.model.display_name) || modelId;
  const transcriptPath = input.transcript_path || input.transcriptPath;

  const usage = findLatestUsage(transcriptPath);
  if (!usage) {
    process.stdout.write(modelLabel);
    process.exit(0);
  }

  const used =
    (usage.input_tokens || 0) +
    (usage.cache_creation_input_tokens || 0) +
    (usage.cache_read_input_tokens || 0);

  const windowSize = CONTEXT_WINDOWS[modelId] || DEFAULT_WINDOW;
  const pct = Math.min(100, (used / windowSize) * 100).toFixed(0);

  process.stdout.write(`${modelLabel} | Context ${fmtK(used)}/${fmtK(windowSize)} (${pct}%)`);
} catch (e) {
  // 실패 시 상태줄을 비워 세션 진행을 막지 않음
  process.stdout.write("");
}

// Session Continuity 훅 공용 유틸리티
const fs = require("fs");
const path = require("path");

function readStdinJson() {
  try {
    const raw = fs.readFileSync(0, "utf8");
    if (!raw || !raw.trim()) return {};
    return JSON.parse(raw);
  } catch (e) {
    return {};
  }
}

function projectRoot(input) {
  // process.cwd()가 OS 고유 경로 형식(Windows 드라이브 문자 포함)을 정확히 반환하므로
  // JSON payload의 cwd 문자열(다른 셸/경로 표기 가능성)보다 우선한다.
  return process.cwd() || input.cwd;
}

function historyDir(input) {
  const dir = path.join(projectRoot(input), ".claude", "session-history");
  fs.mkdirSync(dir, { recursive: true });
  return dir;
}

function timestamp() {
  return new Date().toISOString().replace(/[:.]/g, "-");
}

function emitAdditionalContext(hookEventName, text) {
  if (!text) return;
  process.stdout.write(
    JSON.stringify({
      hookSpecificOutput: {
        hookEventName,
        additionalContext: text,
      },
    })
  );
}

module.exports = { readStdinJson, projectRoot, historyDir, timestamp, emitAdditionalContext, fs, path };

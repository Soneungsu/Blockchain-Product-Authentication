// SessionStart: handoff-*.md(수동, 고품질) 와 backup/*.md(자동 체크포인트) 중
// 가장 최근에 생성된 파일을 찾아 이전 세션 컨텍스트로 자동 주입한다.
const { readStdinJson, historyDir, emitAdditionalContext, fs, path } = require("./_lib");

const MAX_CHARS = 6000;

function newestFile(dir, pattern) {
  if (!fs.existsSync(dir)) return null;
  const files = fs
    .readdirSync(dir)
    .filter((f) => pattern.test(f))
    .map((f) => {
      const full = path.join(dir, f);
      return { full, mtime: fs.statSync(full).mtimeMs };
    });
  if (!files.length) return null;
  files.sort((a, b) => b.mtime - a.mtime);
  return files[0];
}

try {
  const input = readStdinJson();
  const dir = historyDir(input);

  const candidates = [
    newestFile(dir, /^handoff-.*\.md$/),
    newestFile(path.join(dir, "backup"), /\.md$/),
  ].filter(Boolean);

  if (!candidates.length) process.exit(0);

  candidates.sort((a, b) => b.mtime - a.mtime);
  const chosen = candidates[0];

  let content = fs.readFileSync(chosen.full, "utf8");
  if (content.length > MAX_CHARS) {
    content = content.slice(0, MAX_CHARS) + "\n\n...(생략됨, 전체 내용은 " + chosen.full + " 참고)";
  }

  const context = [
    `[Session Continuity] 이전 세션 기록을 자동으로 불러왔습니다: ${chosen.full}`,
    ``,
    content,
  ].join("\n");

  emitAdditionalContext("SessionStart", context);
} catch (e) {
  // 실패 시 조용히 무시 (세션 시작을 막지 않음)
}

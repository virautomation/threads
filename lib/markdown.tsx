import React from "react";

/**
 * Minimal markdown renderer for LLM output.
 * Handles: headings (#, ##, ###), bold (**), italic (*), inline code (`),
 * unordered (- *) and ordered (1.) lists, and blank-line paragraphs.
 * Avoids pulling in a full markdown library.
 */
export function Markdown({ source }: { source: string }) {
  const blocks = source.replace(/\r\n/g, "\n").split(/\n{2,}/);
  return (
    <div className="prose-llm text-sm">
      {blocks.map((block, i) => renderBlock(block, i))}
    </div>
  );
}

function renderBlock(block: string, key: number): React.ReactNode {
  const trimmed = block.trim();
  if (!trimmed) return null;

  if (/^### /.test(trimmed)) return <h3 key={key}>{inline(trimmed.replace(/^###\s*/, ""))}</h3>;
  if (/^## /.test(trimmed)) return <h2 key={key}>{inline(trimmed.replace(/^##\s*/, ""))}</h2>;
  if (/^# /.test(trimmed)) return <h1 key={key}>{inline(trimmed.replace(/^#\s*/, ""))}</h1>;

  const lines = trimmed.split("\n");
  if (lines.every((l) => /^[-*]\s+/.test(l))) {
    return (
      <ul key={key}>
        {lines.map((l, j) => (
          <li key={j}>{inline(l.replace(/^[-*]\s+/, ""))}</li>
        ))}
      </ul>
    );
  }
  if (lines.every((l) => /^\d+\.\s+/.test(l))) {
    return (
      <ol key={key}>
        {lines.map((l, j) => (
          <li key={j}>{inline(l.replace(/^\d+\.\s+/, ""))}</li>
        ))}
      </ol>
    );
  }
  return <p key={key}>{inline(trimmed)}</p>;
}

function inline(text: string): React.ReactNode {
  // Order: code → bold → italic. Use placeholder split to avoid nested re-encoding bugs.
  const parts: Array<string | React.ReactNode> = [text];
  return parts
    .flatMap((p) =>
      typeof p === "string" ? splitByRegex(p, /`([^`]+)`/g, (m) => <code>{m}</code>) : [p],
    )
    .flatMap((p) =>
      typeof p === "string" ? splitByRegex(p, /\*\*([^*]+)\*\*/g, (m) => <strong>{m}</strong>) : [p],
    )
    .flatMap((p) =>
      typeof p === "string" ? splitByRegex(p, /\*([^*]+)\*/g, (m) => <em>{m}</em>) : [p],
    )
    .map((p, i) => (typeof p === "string" ? <React.Fragment key={i}>{p}</React.Fragment> : <React.Fragment key={i}>{p}</React.Fragment>));
}

function splitByRegex(
  text: string,
  re: RegExp,
  wrap: (match: string) => React.ReactNode,
): Array<string | React.ReactNode> {
  const out: Array<string | React.ReactNode> = [];
  let last = 0;
  for (const m of text.matchAll(re)) {
    if (m.index! > last) out.push(text.slice(last, m.index));
    out.push(wrap(m[1]));
    last = m.index! + m[0].length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}
